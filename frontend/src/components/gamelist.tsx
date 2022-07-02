import { Game } from '@/types';
import filter from './filter.png';

const GameList = (
  games: Game[]
) => { 
  return(
    <aside className="w-64" aria-label="Sidebar">
      <img src={filter} alt="filter" />;
    </aside>
  )
}