import Image from "next/image";
import getPlatforms from "@/app/lib/platforms-api";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    detailSlug: string;
  }>;
};

export default async function PlatformDetail({ params }: Props) {
  const { detailSlug } = await params;

  const platforms = await getPlatforms();

  const platformDetail = platforms.find((p) => p.slug === detailSlug);

  if (!platformDetail) {
    notFound();
  }

  console.log(platformDetail);

  // Windows 플랫폼 (slug: win)
  const windowDetail = platforms.find((p) => p.slug === "win");

  // 현재 플랫폼 첫 번째 버전
  const platformVersion = platformDetail.versions?.[0];

  // Windows 버전 (id: 513)
  const windowVersion = windowDetail?.versions.find((v) => v.id === 513);

  // 사용할 로고
  const logo = detailSlug === "win" ? (windowVersion?.platform_logo ?? platformDetail.platform_logo) : (platformVersion?.platform_logo ?? platformDetail.platform_logo);

  // 사용할 설명
  const summary = detailSlug === "win" ? windowVersion?.summary : platformVersion?.summary;

  // 출시일
  const releaseDate = platformVersion.platform_version_release_dates.map((d) => {
    const newDate = new Date(d.date * 1000);
    const getYear = newDate.getFullYear();
    const getMonth = String(newDate.getMonth() + 1).padStart(2, "0");
    const getDate = String(newDate.getDate()).padStart(2, "0");
    const region = d.release_region.region;

    return `${getYear}. ${getMonth}. ${getDate} (${region})`;
  });

  return (
    <main>
      <h1 className="mb-10 text-4xl font-bold">{platformDetail.name}</h1>
      <div className="flex gap-10">
        <figure className="relative h-0 pt-[20%] w-1/3">
          {logo && <Image className="absolute inset-0 max-h-full m-auto object-contain" src={`https://images.igdb.com/igdb/image/upload/t_original/${logo.image_id}.png`} alt={`${platformDetail.name} 로고`} width={logo.width} height={logo.height} />}
        </figure>
        <div className="w-2/3">
          <p className="mb-10">{summary ? summary : "There is no registered summary."}</p>
          <div>
            <ul>
              {releaseDate.map((date) => (
                <li key={date}>{date}</li>
              ))}
            </ul>
            <ul>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
