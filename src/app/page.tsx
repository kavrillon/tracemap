import Map from "./components/map";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-[500px] overflow-hidden">
      <Map posix={[38.907132, -77.036546]} />
      </div>
    </main>
  );
}
