import type { PlatformsListType } from "./types";

export default async function getPlatforms(): Promise<PlatformsListType[]> {
  const fields = [
    "*",

    "platform_logo.image_id",
    "platform_family.name",

    "versions.*",
    "versions.companies.company.name",
    "versions.platform_logo.image_id",
    "versions.platform_logo.width",
    "versions.platform_logo.height",
    "versions.platform_version_release_dates.date",
    "versions.platform_version_release_dates.platform_version",
    "versions.platform_version_release_dates.release_region.region",
  ];

  const res = await fetch("https://api.igdb.com/v4/platforms", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": process.env.CLIENT_ID!,
      Authorization: `Bearer ${process.env.AUTHORIZATION!}`,
    },
    body: `fields ${fields.join(", ")}; sort name asc; limit 500;`,
    next: {
      revalidate: 86400,
    },
  });

  return await res.json();
}
