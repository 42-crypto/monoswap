import { Game } from '@/types';

const GameList = (games: Game[]) => {
  return (
    <aside className='w-64' aria-label='Sidebar'>
      <img src='/filter.png' alt='filter' />;
    </aside>
  );
};
