import Image from "next/image";
import getPlatforms from "@/lib/platforms-api";
import { Gamepad2, CalendarDays, Building2, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import SectionTitle from "@/components/ui/platforms/section-title";

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

  // 플랫폼 타입
  const platformType = platformDetail.platform_type;
  const PLATFORM_TYPES: Record<number, string> = {
    1: "Console",
    2: "Arcade",
    3: "Platform",
    4: "Operating System",
    5: "Portable Console",
    6: "Computer",
  };
  const formattedPlatformtype = PLATFORM_TYPES[platformType] ?? "There are no registered platforms.";

  // 개발사
  const developCompanys = [...new Set(platformDetail.versions.flatMap((v) => v.companies?.map((c) => c.company.name).filter((name) => !/^\d+$/.test(name)) ?? []))];

  //상세 이미지, 설명, 출시일
  let detailImage = null;
  let summary = null;
  let releaseDates = null;

  for (const v of platformDetail.versions) {
    if (!detailImage && v.platform_logo) detailImage = v.platform_logo;
    if (!summary && v.summary) summary = v.summary;
    if (!releaseDates && v.platform_version_release_dates?.length) releaseDates = v.platform_version_release_dates;
  }

  // 출시일 변환 후 반환
  const formattedReleaseDates = releaseDates?.map((d) => {
    const newDate = new Date(d.date * 1000);
    const getYear = newDate.getFullYear();
    const getMonth = String(newDate.getMonth() + 1).padStart(2, "0");
    const getDate = String(newDate.getDate()).padStart(2, "0");
    const region = d.release_region.region;

    return {
      id: d.id ?? `${d.date}-${d.release_region}`,
      text: `${getYear}. ${getMonth}. ${getDate} (${region})`,
    };
  });

  return (
    <main>
      <h1 className="mb-10 text-4xl font-bold">{platformDetail.name}</h1>
      <div className="flex gap-x-5 mb-5">
        <figure className="relative sticky top-[100px] h-0 pt-[32.382%] w-[32.8%] rounded-md bg-white">
          <Image
            className="absolute inset-0 max-h-full m-auto p-10 object-contain"
            src={detailImage ? `https://images.igdb.com/igdb/image/upload/t_original/${detailImage?.image_id}.png` : "/assets/logos/default-logo.png"}
            alt={`${platformDetail.name} 로고`}
            width={detailImage?.width ?? 350}
            height={detailImage?.height ?? 350}
          />
        </figure>
        <div className="flex flex-col w-[67.2%] bg-white p-6 rounded-md">
          <div className="flex-1">
            <SectionTitle title="Summary" icon={FileText} />
            <p className="mb-10 wrap-break-word">{summary ?? "There is no registered summary."}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-5">
        <div className="p-6 rounded-md bg-white">
          <SectionTitle title="Release Dates" icon={CalendarDays} />
          <ul>{formattedReleaseDates?.map((date) => <li key={date.id}>{date.text}</li>) ?? <li>There is no information on the release date.</li>}</ul>
        </div>
        <div className="p-6 rounded-md bg-white">
          <SectionTitle title="Platform Type" icon={Gamepad2} />
          <p>{formattedPlatformtype}</p>
        </div>
        <div className="p-6 rounded-md bg-white">
          <SectionTitle title="Develop Company" icon={Building2} />
          <p>{developCompanys.length > 0 ? developCompanys.join(", ") : "There is no information about the develop company."}</p>
        </div>
      </div>
    </main>
  );
}
