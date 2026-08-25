import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AssessmentForm } from "@/components/assessment-form";

async function fillRequiredFields() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Full name/), "Ana Santos");
  await user.type(screen.getByLabelText(/Mobile number/), "+63 917 123 4567");
  await user.type(screen.getByLabelText(/Cebu city or municipality/), "Cebu City");
  await user.selectOptions(screen.getByLabelText(/Property type/), "Residential");
  await user.selectOptions(screen.getByLabelText(/Average monthly electricity bill/), "₱5,000–₱15,000");
  await user.selectOptions(screen.getByLabelText(/Preferred contact method/), "Call");
  await user.click(screen.getByLabelText(/I agree that Solara/));
  return user;
}

describe("AssessmentForm", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("shows accessible validation errors without making a request", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<AssessmentForm />);
    await userEvent.click(screen.getByRole("button", { name: /request my free assessment/i }));
    expect(await screen.findByText(/check the highlighted fields/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/)).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("requires email when it is selected as the contact method", async () => {
    render(<AssessmentForm />);
    const user = await fillRequiredFields();
    await user.selectOptions(screen.getByLabelText(/Preferred contact method/), "Email");
    await user.click(screen.getByRole("button", { name: /request my free assessment/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it("shows a success state only after a successful server response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, message: "Your request was sent. Solara's team will review it." }),
    }));
    render(<AssessmentForm />);
    const user = await fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /request my free assessment/i }));
    expect(await screen.findByText("Request sent")).toBeInTheDocument();
    expect(screen.getByText(/team will review/i)).toBeInTheDocument();
  });

  it("preserves entered data when delivery fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false, message: "We could not send your request right now." }),
    }));
    render(<AssessmentForm />);
    const user = await fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /request my free assessment/i }));
    expect(await screen.findByText("Request not sent")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText(/Full name/)).toHaveValue("Ana Santos"));
    expect(screen.getByText(/call, email, or message Solara/i)).toBeInTheDocument();
  });
});
