import { collection, query, where, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { sampleGames } from '@/sampleData';
import { Game } from '@/types';
import { firebaseApp, firebaseAuth, firebaseFirestore } from '@/utils/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // サンプルデータ用
      // if (!Array.isArray(sampleGames)) {
      // throw new Error('Cannot find sample data.');
      // }

      const q = query(collection(firebaseFirestore, 'games'));
      const querySnapshot = await getDocs(q);

      console.log(querySnapshot);

      var fetchedGames: Game[] = [];
      var count: number = 0;
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        const game = doc.data() as Game;

        const gameWithId: Game = {
          id: doc.id,
          name: game.name,
          description: game.description,
          imageUrl: game.imageUrl,
          contractAddress: '',
        };

        fetchedGames.push(gameWithId);
        count = count + 1;
        if (count == fetchedGames.length) {
          console.log('fetchedGames', fetchedGames);
          res.status(200).json({ fetchedGames });
        }
      });

      // TODO: Firestoreからデータ取得
      // const games: Game[] = sampleGames;
      // res.status(200).json({ games });
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.status(400).json({ statusCode: 400, message: '/api/games failed to handle request' });
  }
}
