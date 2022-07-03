import { Order, Item } from '@/types';

const OrderCard = (
  offerItems: Item[] ,
  considerationItems: Item[] 
) => {

  const offerItemsToDisplay = (offerItems.length > 3) ? offerItems.slice(0, 3) : offerItems
  const considerationItemsToDisplay = (considerationItems.length > 3) ? considerationItems.slice(0, 3) : considerationItems

  return (

    <div className='item-wrapper'>
      <ul className= 'items'>
        <li className= 'item'>
          <ul className= 'justify-evenly gap-10 item-nft'>
            <li key={offerItemsToDisplay[0] ? offerItemsToDisplay[0].name : ""} className='nft mb-2 glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'>
              <img className = 'object-contain p-2'src= {offerItemsToDisplay[0] ? offerItemsToDisplay[0].imageUrl : ""} />
            </li>
            <li key={offerItemsToDisplay[1] ? offerItemsToDisplay[1].name : ""} className='nft mb-2 glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'>
              <img className = 'object-contain p-2'src= {offerItemsToDisplay[1] ? offerItemsToDisplay[1].imageUrl : ""} />
            </li>
            <li key={offerItemsToDisplay[2] ? offerItemsToDisplay[2].name : ""} className='nft mb-2 glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'>
              <img className = 'object-contain p-2'src= {offerItemsToDisplay[2] ? offerItemsToDisplay[2].imageUrl : ""} />
            </li>
          </ul>
        </li>
        <li className= 'flex items-center'>
          <img className="w-11 h-auto sm:h-10" src="/swap.svg" alt=""/>
        </li>
        <li className= 'item'>
          <ul className= 'justify-evenly gap-10 item-nft'>
          <li key={considerationItemsToDisplay[0] ? considerationItemsToDisplay[0].name : ""} className='nft mb-2 glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'>
              <img className = 'object-contain p-2'src= {considerationItemsToDisplay[0] ? considerationItemsToDisplay[0].imageUrl : ""} />
            </li>
            <li key={considerationItemsToDisplay[1] ? considerationItemsToDisplay[1].name : ""} className='nft mb-2 glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'>
              <img className = 'object-contain p-2'src= {considerationItemsToDisplay[1] ? considerationItemsToDisplay[1].imageUrl : ""} />
            </li>
            <li key={considerationItemsToDisplay[2] ? considerationItemsToDisplay[2].name : ""} className='nft mb-2 glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'>
              <img className = 'object-contain p-2'src= {considerationItemsToDisplay[2] ? considerationItemsToDisplay[2].imageUrl : ""} />
            </li>
          </ul>
        </li>
      </ul>
      <style jsx>
        {`
					.item-wrapper {
						display: flex;
					}
          .items {
            display: flex;
            flex-direction: row;
						gap: 28px;
          }
          .item {
						display: flex;
						justify-content: center;
						align-items: center;
						gap: 28px;
          }
					.item-nft {
          }
          .nft{
            width: 84px;
            height: 84px;
          }
					.item-mix{
						display: flex:
					}
        `}
      </style>
    </div>
  )
}

export default OrderCard;
