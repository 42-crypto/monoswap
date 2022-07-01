import type { NextApiRequest, NextApiResponse } from 'next';
import { sampleGames } from '@/sampleData';
import { Game } from '@/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // サンプルデータ用
      if (!Array.isArray(sampleGames)) {
        throw new Error('Cannot find sample data.');
      }

      // TODO: Firestoreからデータ取得
      const games: Game[] = sampleGames;

      res.status(200).json({ games });
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.status(400).json({ statusCode: 400, message: '/api/games failed to handle request' });
  }
}
