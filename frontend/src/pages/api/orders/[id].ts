import type { NextApiRequest, NextApiResponse } from 'next';
import { sampleOrders } from '@/sampleData';
import { Order } from '@/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // サンプルデータ用
      if (!Array.isArray(sampleOrders)) {
        throw new Error('Cannot find sample data.');
      }

      // TODO: Firestoreからデータ取得
      const orders: Order[] = sampleOrders;
      const order: Order = orders[parseInt(id as string)];

      res.status(200).json({ order });
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.status(400).json({ statusCode: 400, message: '/api/games failed to handle request' });
  }
}
