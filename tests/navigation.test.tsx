import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

describe("site navigation and contact paths", () => {
  it("opens an accessible mobile navigation and exposes all homepage anchors", async () => {
    render(<Header />);
    const button = screen.getByRole("button", { name: /open navigation/i });
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("link", { name: "Solutions" }).some((link) => link.getAttribute("href") === "/#solutions")).toBe(true);
    expect(screen.getAllByRole("link", { name: "Contact" }).some((link) => link.getAttribute("href") === "/#contact")).toBe(true);
  });

  it("includes both phones, email, Facebook, and privacy in the footer", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "+63 947 312 6639" })).toHaveAttribute("href", "tel:+639473126639");
    expect(screen.getByRole("link", { name: "+63 927 737 4892" })).toHaveAttribute("href", "tel:+639277374892");
    expect(screen.getByRole("link", { name: "solara.energy26@gmail.com" })).toHaveAttribute("href", "mailto:solara.energy26@gmail.com");
    expect(screen.getByRole("link", { name: "Message on Facebook" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Privacy notice" })).toHaveAttribute("href", "/privacy");
  });
});
