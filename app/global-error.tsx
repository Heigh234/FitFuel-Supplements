"use client";

// global-error.tsx replaces the root layout when it activates, so Tailwind
// CSS and fonts are NOT available here. Use inline styles that mirror brand
// tokens manually: orange #F97316, dark #111111, light-gray #F5F5F5.

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalRootError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          backgroundColor: "#F5F5F5",
          margin: 0,
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480, width: "100%" }}>
          {/* Accent bar */}
          <div
            style={{
              width: 64,
              height: 4,
              backgroundColor: "#F97316",
              borderRadius: 9999,
              margin: "0 auto 24px",
            }}
          />

          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#111111",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            ALGO SALIÓ MAL
          </h2>

          <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px" }}>
            Ha ocurrido un error crítico en la aplicación.
            {error.digest ? ` (ID: ${error.digest})` : ""}
          </p>

          <button
            onClick={reset}
            style={{
              backgroundColor: "#F97316",
              color: "#FFFFFF",
              border: "none",
              padding: "14px 32px",
              borderRadius: 8,
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 14,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            INTENTAR DE NUEVO
          </button>
        </div>
      </body>
    </html>
  );
}
