"use client";

import { useState } from "react";

const D = "var(--font-display)";
const M = "var(--font-mono)";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ borderBottom: "4px solid #111", background: "#f5f0e8" }}>
      <div
        style={{
          fontFamily: M,
          fontSize: "10px",
          letterSpacing: "0.12em",
          borderBottom: "1px solid #111",
          padding: "6px clamp(16px, 4vw, 32px)",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          position: "relative",
          color: "#555",
          gap: "12px",
        }}
      >
        <span
          className="hidden min-[480px]:inline"
          style={{ whiteSpace: "nowrap", justifySelf: "start" }}
        >
          UNC CHAPEL HILL, NC
        </span>
        <span style={{ justifySelf: "start" }}>FALL 2026</span>
        <span
          className="hidden min-[480px]:inline"
          style={{
            visibility: "hidden",
            whiteSpace: "nowrap",
            justifySelf: "end",
          }}
        >
          PLACEHOLDER
        </span>
      </div>
      <div
        style={{
          padding: "14px clamp(16px, 4vw, 32px)",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: D,
            fontSize: "26px",
            letterSpacing: "0.02em",
            color: "#111",
          }}
        >
          HACKNC
        </span>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-mobile-nav"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden"
          style={{
            minWidth: "44px",
            minHeight: "44px",
            border: "1px solid #111",
            background: "transparent",
            color: "#111",
            fontFamily: M,
            fontSize: "10px",
            letterSpacing: "0.12em",
            padding: "0 10px",
          }}
        >
          MENU
        </button>

        <nav
          className="hidden md:flex"
          style={{
            fontFamily: M,
            fontSize: "11px",
            letterSpacing: "0.12em",
            gap: "clamp(18px, 3vw, 40px)",
            alignItems: "center",
          }}
          aria-label="Primary"
        >
          <a
            href="#about"
            style={{ color: "#111", textDecoration: "none", padding: "8px 0" }}
          >
            ABOUT
          </a>
          <a
            href="#host-interest"
            style={{ color: "#111", textDecoration: "none", padding: "8px 0" }}
          >
            INTEREST FORM
          </a>
          <a
            style={{
              color: "#4B9CD3",
              textDecoration: "none",
              visibility: "hidden",
            }}
          >
            PLACEHOLDER
          </a>
        </nav>
      </div>

      {menuOpen && (
        <nav
          id="primary-mobile-nav"
          aria-label="Mobile"
          className="md:hidden"
          style={{
            borderTop: "1px solid #111",
            borderBottom: "1px solid #111",
            padding: "10px clamp(16px, 4vw, 32px)",
            fontFamily: M,
            fontSize: "11px",
            letterSpacing: "0.12em",
            display: "grid",
            gap: "8px",
          }}
        >
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            style={{
              color: "#111",
              textDecoration: "none",
              padding: "10px 0",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
          >
            ABOUT
          </a>
          <a
            href="#host-interest"
            onClick={() => setMenuOpen(false)}
            style={{
              color: "#111",
              textDecoration: "none",
              padding: "10px 0",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
          >
            INTEREST FORM
          </a>
        </nav>
      )}
    </header>
  );
}
