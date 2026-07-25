export default async function getGames(platformId: number) {
  const res = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": process.env.CLIENT_ID!,
      Authorization: `Bearer ${process.env.AUTHORIZATION!}`,
    },
    body: `fields name, rating, platforms, platforms.id, *; where platforms = ${platformId} & rating != null; sort rating desc; limit 100;`,
    next: {
      revalidate: 86400,
    },
  });

  return await res.json();
}
