import getGames from "../lib/games-api";
import getPlatforms from "../lib/platforms-api";
import GameList from "../../components/ui/games/game-list";

import type { FilteredGameListType, PlatformType, PlatformsPcVersionType } from "../lib/types";

type Props = {
  params: {
    platformSlug: string;
  };
};

export default async function Page({ params }: Props) {
  const { platformSlug } = await params;

  const platforms = await getPlatforms();
  const platform = platforms.find((p: PlatformType) => p.slug === platformSlug);

  let platformId: number | undefined;

  if (platform) {
    platformId = platform.id;
  } else {
    const pc = platforms.find((p: PlatformsPcVersionType) => p.id === 6);

    platformId = pc?.id;
  }

  if (platformId === undefined) {
    throw new Error("게임을 찾을 수 없습니다.");
  }

  const games = await getGames(platformId);

  const filteredGames = games.filter((game: FilteredGameListType) => game.platforms.some((g) => g.id === platformId));

  return <GameList games={filteredGames} />;
}
