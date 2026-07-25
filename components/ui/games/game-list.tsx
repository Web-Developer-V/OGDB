import type { GameListType } from "@/lib/types";

export default function GameList({ games }: { games: GameListType[] }) {
  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>{game.name}</li>
      ))}
    </ul>
  );
}
