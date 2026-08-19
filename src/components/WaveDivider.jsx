export default function WaveDivider({ fill = '#111a11', animated = false }) {
  return (
    <svg
      className="wave-divider"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      style={{ display: 'block' }}
    >
      <path
        d="M0,30 C240,10 480,50 720,30 C960,10 1200,50 1440,30 L1440,60 L0,60 Z"
        fill={fill}
      />
    </svg>
  );
}
