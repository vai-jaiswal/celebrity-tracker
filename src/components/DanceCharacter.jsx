export default function DanceCharacter({ name, colors, dance, size = 70, emoji }) {
  const initials = name.split(' ').map((n) => n[0]).join('');
  const scale = size / 70;

  return (
    <div className={`relative ${dance}`} style={{ width: size * 1.1, height: size * 2 }}>
      {/* Emoji accessory */}
      <span
        className="absolute z-10 animate-[float_2s_ease-in-out_infinite]"
        style={{ fontSize: 14 * scale, top: -8 * scale, right: 2 * scale }}
      >
        {emoji}
      </span>

      {/* Head */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center text-white font-heading font-extrabold z-10 head-bob"
        style={{
          width: size * 0.55,
          height: size * 0.55,
          top: 0,
          background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
          boxShadow: `0 0 15px ${colors[0]}50`,
          fontSize: size * 0.2,
        }}
      >
        {initials}
      </div>

      {/* Neck */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          width: 4 * scale,
          height: 8 * scale,
          top: size * 0.5,
          background: colors[1],
        }}
      />

      {/* Body / Torso */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-t-lg rounded-b-2xl"
        style={{
          width: size * 0.5,
          height: size * 0.55,
          top: size * 0.55,
          background: `linear-gradient(180deg, ${colors[0]}dd, ${colors[1]}cc)`,
          boxShadow: `0 4px 15px ${colors[0]}30`,
        }}
      />

      {/* Left Arm */}
      <div
        className="absolute origin-top arm-left"
        style={{
          width: 6 * scale,
          height: size * 0.45,
          top: size * 0.6,
          left: `calc(50% - ${size * 0.28}px)`,
          background: colors[1],
          borderRadius: 4 * scale,
        }}
      />

      {/* Right Arm */}
      <div
        className="absolute origin-top arm-right"
        style={{
          width: 6 * scale,
          height: size * 0.45,
          top: size * 0.6,
          right: `calc(50% - ${size * 0.28}px)`,
          background: colors[1],
          borderRadius: 4 * scale,
        }}
      />

      {/* Left Leg */}
      <div
        className="absolute origin-top leg-left"
        style={{
          width: 7 * scale,
          height: size * 0.5,
          top: size * 1.05,
          left: `calc(50% - ${size * 0.14}px)`,
          background: `linear-gradient(180deg, ${colors[0]}bb, ${colors[1]}99)`,
          borderRadius: `${3 * scale}px ${3 * scale}px ${5 * scale}px ${5 * scale}px`,
        }}
      />

      {/* Right Leg */}
      <div
        className="absolute origin-top leg-right"
        style={{
          width: 7 * scale,
          height: size * 0.5,
          top: size * 1.05,
          right: `calc(50% - ${size * 0.14}px)`,
          background: `linear-gradient(180deg, ${colors[0]}bb, ${colors[1]}99)`,
          borderRadius: `${3 * scale}px ${3 * scale}px ${5 * scale}px ${5 * scale}px`,
        }}
      />

      {/* Shadow on floor */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full floor-shadow"
        style={{
          width: size * 0.6,
          height: size * 0.12,
          bottom: -6 * scale,
          background: `radial-gradient(ellipse, ${colors[0]}30, transparent)`,
        }}
      />
    </div>
  );
}
