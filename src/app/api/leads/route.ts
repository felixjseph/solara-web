import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { leadInputFromFormData, leadSchema } from "@/lib/lead-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  EmailConfigurationError,
  EmailDeliveryError,
  getLeadEmailAdapter,
} from "@/lib/email";

function errorResponse(message: string, status: number, fields?: Record<string, string[]>) {
  return NextResponse.json({ ok: false, message, fields }, { status });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data") && !contentType.includes("application/x-www-form-urlencoded")) {
    return errorResponse("Unsupported request format.", 415);
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientAddress = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const rateKey = createHash("sha256").update(clientAddress).digest("hex");
  const limit = checkRateLimit(rateKey);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many requests were submitted from this connection. Please use a direct contact option or try again later.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return errorResponse("We could not read this request. Please check the form and try again.", 400);
  }

  const result = leadSchema.safeParse(leadInputFromFormData(formData));
  if (!result.success) {
    return errorResponse(
      "Please check the highlighted fields.",
      400,
      result.error.flatten().fieldErrors,
    );
  }

  if (result.data.company) {
    return NextResponse.json({ ok: true, message: "Request received." });
  }

  try {
    await getLeadEmailAdapter().sendLead({
      lead: result.data,
      submittedAt: new Date().toISOString(),
    });
    return NextResponse.json({
      ok: true,
      message: "Your request was sent. Solara's team will review it and contact you using your preferred method.",
    });
  } catch (error) {
    if (error instanceof EmailConfigurationError || error instanceof EmailDeliveryError) {
      return errorResponse(
        "We could not send your request right now. Your details remain in the form; please try again or contact Solara directly.",
        503,
      );
    }

    return errorResponse(
      "Something went wrong while sending your request. Your details remain in the form; please try again or contact Solara directly.",
      500,
    );
  }
}
