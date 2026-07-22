import getPlatforms from "../lib/platforms-api";
import PlatformList from "../../components/ui/platforms/platform-list";

export default async function Home() {
  const platforms = await getPlatforms();

  console.log(platforms);

  const nintendo = platforms.filter((p) => p.platform_family?.name === "Nintendo");
  const xbox = platforms.filter((p) => p.platform_family?.name === "Xbox");
  const playstation = platforms.filter((p) => p.platform_family?.name === "PlayStation");
  const pc = platforms.filter((p) => p.id === 6);

  console.log(pc);

  return (
    <main className="flex flex-col gap-y-20 flex-1 items-center justify-center w-full h-full">
      <PlatformList platforms={nintendo} title="Nintendo" lengthColor="text-[#C62E23]" lengthBg="bg-[#F6E6E8]" />
      <PlatformList platforms={playstation} title="PlayStation" lengthColor="text-[#1A2592]" lengthBg="bg-[#EAF1FC]" />
      <PlatformList platforms={xbox} title="Xbox" lengthColor="text-[#3F8217]" lengthBg="bg-[#ECF5EC]" />
      <PlatformList platforms={pc} title="PC" lengthColor="text-sky-400" lengthBg="bg-[#e5f2f9]" />
    </main>
  );
}
