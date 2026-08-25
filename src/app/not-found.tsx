import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <div className="not-found-rays" aria-hidden="true" />
      <div className="container not-found-content">
        <span className="eyebrow">404 • Page not found</span>
        <h1>This path isn’t getting enough sunlight.</h1>
        <p>The page may have moved or never existed. Return to Solara’s homepage to explore solar solutions across Cebu.</p>
        <Link className="button" href="/">Return home <ArrowIconInline /></Link>
      </div>
    </main>
  );
}

function ArrowIconInline() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}
