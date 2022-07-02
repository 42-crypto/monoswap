import { Order, Item } from '@/types';

const OrderCard = (
  offerItems: Item[] ,
  considerationItems: Item[] 
) => {

  const offerItemsToDisplay = (offerItems.length > 3) ? offerItems.slice(0, 3) : offerItems
  const considerationItemsToDisplay = (considerationItems.length > 3) ? considerationItems.slice(0, 3) : considerationItems

  return (

    <div className=''>
      <ul className= 'items'>
        <li className= 'item'>
          <ul className= 'justify-evenly gap-10'>
            {
             
             offerItemsToDisplay.map((item) => (
              <li key={item.name} className='nft'>
                <img className = 'height-auto'src= {item.imageUrl} />
              </li>
              ))
            }
          </ul>
        </li>
        <li className= ''>
          <img className="h-8 w-auto sm:h-10" src="/swap.svg" alt=""/>
        </li>
        <li className= ''>
          <ul className= 'justify-evenly gap-10'>
            {
              considerationItemsToDisplay.map((item) => (
              <li key={item.name} className='nft'>
                <img className = 'w-full height-auto'src= {item.imageUrl} />
              </li>
              ))
            }
          </ul>
        </li>
      </ul>
      <style jsx>
        {`
          .items {
            display: flex;
            flex-direction: row;
          }
          .item {
          }
          .nft{
            width: 84px;
            height: 84px;
          }
        `}
      </style>
    </div>
  )
}

export default OrderCard;
