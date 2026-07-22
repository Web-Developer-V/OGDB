import type { PlatformsListType } from "./types";

export default async function getPlatforms(): Promise<PlatformsListType[]> {
  const res = await fetch("https://api.igdb.com/v4/platforms", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": process.env.CLIENT_ID!,
      Authorization: `Bearer ${process.env.AUTHORIZATION!}`,
    },
    body: "fields platform_logo.image_id, platform_family.name, versions.name, versions.slug, versions.platform_logo.image_id, versions.platform_version_release_dates, versions.platform_version_release_dates.date, versions.platform_version_release_dates.release_region.region, versions.platform_version_release_dates.platform_version, versions.platform_logo.width, versions.platform_logo.height, versions.url, versions.summary, *; sort name asc; limit 500;",
    next: {
      revalidate: 86400,
    },
  });

  return await res.json();
}
