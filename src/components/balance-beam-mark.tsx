/**
 * Balance-beam mark — the Phase 0 signature silhouette (a beam on a
 * fulcrum with ruler ticks). Doubles as the logo. The full 3D version
 * is the R3F risk visualiser built in Phase 5; this is the static
 * 2D distillation used in chrome.
 */
export function BalanceBeamMark({
  className,
  title = "Anas Ali",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
    >
      {/* fulcrum */}
      <path d="M12 15 L8.5 21 h7 Z" />
      {/* beam (slight tilt — weight to the right) */}
      <line x1="3.5" y1="7.5" x2="20.5" y2="9.5" />
      {/* pivot */}
      <line x1="12" y1="8.5" x2="12" y2="15" />
      {/* ruler ticks along the beam */}
      <line x1="6.7" y1="7" x2="6.4" y2="5.4" />
      <line x1="12" y1="8" x2="12" y2="6.4" />
      <line x1="17.3" y1="9" x2="17" y2="7.4" />
    </svg>
  );
}
