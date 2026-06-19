"use client";

export default function InstallAppButton() {
  return (
    <a
      href="https://wa.me/966564911912"
      target="_blank"
      rel="noopener noreferrer"
      className="installAppFloatingBtn"
      style={{
        textDecoration: "none",
      }}
    >
      <span className="installAppIcon">💬</span>

      <span>
        تواصل واتساب
        <small>راسلنا مباشرة</small>
      </span>
    </a>
  );
}