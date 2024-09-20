export function Logo() {
  return (
    <svg viewBox="0 0 500 125" fill="none" className="block fill-current">
      <path id="curve" d="M20,125 Q250,25 480,125" fill="transparent"></path>
      <text
        x="4"
        width="500"
        className="m-0 text-3xl font-bold uppercase tracking-[1.36rem]"
      >
        <textPath xlinkHref="#curve">Track my Map</textPath>
      </text>
    </svg>
  );
}
