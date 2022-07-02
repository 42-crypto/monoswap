import OrderCard from './ordercard';
import { Order } from '@/types';


const OrderCardList = (
  orders: Order[]
) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Customers also purchased</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="group relative">
            {
              OrderCard()
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCardList;