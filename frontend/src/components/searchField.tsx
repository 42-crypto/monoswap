const SearchField = () => {
  return (
    <div className='searchField'>
      <div className="filter">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="white"/>
				</svg>
      </div>
      <div className='searchBar flex flex-row gap-3 px-4 py-2 items-center flex-grow border-2 border-darkGray rounded-xl'>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M19.023 16.977C18.5546 16.5284 18.0988 16.0669 17.656 15.593C17.284 15.215 17.06 14.94 17.06 14.94L14.26 13.603C15.381 12.3316 15.9997 10.695 16 9C16 5.141 12.86 2 9 2C5.14 2 2 5.141 2 9C2 12.859 5.14 16 9 16C10.763 16 12.37 15.34 13.603 14.261L14.94 17.061C14.94 17.061 15.215 17.285 15.593 17.657C15.98 18.02 16.489 18.511 16.977 19.024L18.335 20.416L18.939 21.062L21.06 18.941L20.414 18.337C20.035 17.965 19.529 17.471 19.023 16.977ZM9 14C6.243 14 4 11.757 4 9C4 6.243 6.243 4 9 4C11.757 4 14 6.243 14 9C14 11.757 11.757 14 9 14Z" fill="#8E849E"/>
				</svg>
				<p className='text-darkGray text-base'>Search</p>
      </div>
      <div className="switchUser flex flex-row">
				<div className='switchItem flex px-4 py-2 items-center flex-row bg-white/50 rounded-l-xl'>
					<p className='text-white font-semibold'>Give</p>
				</div>
				<div className='switchItem flex px-4 py-2 items-center flex-row bg-background rounded-r-xl'>
					<p className='text-lightGray font-semibold'>Take</p>
				</div>
      </div>
      <div className="showOnlySwappable flex flex-row gap-1">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#24D6DD"/>
				</svg>
				<p className='text-white'>Show only swappable</p>
      </div>
      <style jsx>
        {`
          .searchField {
            display: flex;
            max-width: 96vw;
            margin: 0 auto;
            align-items: center;
						gap: 16px;
          }
					.switchItem{
						box-shadow : 0 0 0 2px darkGray;
					}
        `}
      </style>
    </div>
  );
};

export default SearchField;