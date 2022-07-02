import { Order, Item } from '@/types';

const OrderCard = (
  offerItems: Item[] ,
  considerationItems: Item[] 
) => {
  return (
    <div>
      <ul className= 'bg-primary grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-10'>
        <li className= ''>
          <ul className= 'bg-primary justify-evenly gap-10'>
            {
             offerItems.map((item) => (
              <li key={item.name} className=''>
                <img src= {item.imageUrl} />
              </li>
              ))
            }
          </ul>
        </li>
        <li className= ''>
          <img className="h-8 w-auto sm:h-10" src="/swap.svg" alt=""/>
        </li>
        <li className= ''>
          <ul className= 'bg-primary justify-evenly gap-10'>
            {
              considerationItems.map((item) => (
              <li key={item.name} className=''>
                <img src= {item.imageUrl} />
              </li>
              ))
            }
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default OrderCard;
