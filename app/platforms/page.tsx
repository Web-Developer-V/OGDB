import getPlatforms from "../../lib/platforms-api";
import PlatformList from "../../components/ui/platforms/platform-list";

export default async function Home() {
  const platforms = await getPlatforms();

  console.log(platforms);

  return (
    <main className="flex flex-col gap-y-20 flex-1 items-center justify-center w-full h-full">
      <PlatformList platforms={platforms} title="Platforms" />
    </main>
  );
}
