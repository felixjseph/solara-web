import Image from "next/image";
import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="logo-link" aria-label="Solara home">
      <Image
        src="/brand/solara-wordmark.png"
        alt="Solara"
        width={774}
        height={274}
        priority
        className={inverted ? "logo-image logo-inverted" : "logo-image"}
      />
    </Link>
  );
}
