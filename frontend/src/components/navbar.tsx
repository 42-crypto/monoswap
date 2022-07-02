import Link from 'next/link';
import { useState } from 'react';

const Navbar = (
  didTapOrderListButton: () => void,
  didTapCreateOrderButton: () => void,
  didTapConnectButton: () => void,
  connectButtonText: string,
) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <header>
      <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-background'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <Link href={`/`}>
              <img className='h-8 w-auto sm:h-10' src='/logo.png' alt='' />
            </Link>
            <button
              className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className='fas fa-bars'></i>
            </button>
          </div>
          <div
            className={'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')}
            id='example-navbar-danger'
          >
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto space-x-4'>
              <li className='nav-item'>
                <button
                  onClick={didTapOrderListButton}
                  type='button'
                  className='py-2 px-4  bg-background hover:bg-primary focus:bg-primary focus:ring-offset-bg-primary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
                >
                  My Order List
                </button>
              </li>
              <li className='nav-item'>
                <button
                  onClick={didTapCreateOrderButton}
                  type='button'
                  className='py-2 px-4  bg-primary hover:bg-purple-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
                >
                  Create Order
                </button>
              </li>
              <li className='nav-item'>
                <button
                  suppressHydrationWarning={true}
                  onClick={didTapConnectButton}
                  type='button'
                  className='py-2 px-4 border border-primary hover:bg-primary focus:bg-primary focus:ring-offset-bg-primary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
                >
                  {connectButtonText.length > 10
                    ? connectButtonText.slice(0, 6) + '…' + connectButtonText.slice(-4)
                    : connectButtonText}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
