import { beforeEach, describe, expect, it } from "vitest";
import { checkRateLimit, clearRateLimitForTests } from "@/lib/rate-limit";

describe("lead rate limiting", () => {
  beforeEach(() => clearRateLimitForTests());

  it("allows five requests and throttles the sixth within a window", () => {
    for (let index = 0; index < 5; index += 1) {
      expect(checkRateLimit("test", 1000).allowed).toBe(true);
    }
    expect(checkRateLimit("test", 1000)).toMatchObject({ allowed: false });
  });

  it("starts a new window after the old one expires", () => {
    for (let index = 0; index < 5; index += 1) checkRateLimit("test", 1000);
    expect(checkRateLimit("test", 16 * 60 * 1000).allowed).toBe(true);
  });
});
