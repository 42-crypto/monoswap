import Head from 'next/head';
import React, { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

type Props = {
  children?: ReactNode;
  title?: string;
};

//  <div className='bg-white mx-auto px-10 pb-4'>

const Layout = ({ children, title = 'Monoswap' }: Props) => (
  <div className=''>
    <Head>
      <title>{title}</title>
      <link rel='icon' href='/favicon.ico' />
      <meta charSet='utf-8' />
      <meta name='description' content='' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='theme-color' content='#ffffff' />
      <meta property='og:url' content='' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content='Monoswap' />
      <meta property='og:description' content='' />
      <meta
        property='og:image'
        content='https://og-image.vercel.app/**ft**-next.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg'
      />
    </Head>
    {/* <style jsx global>{``}</style> */}
    <Header />
    <main>{children}</main>
    {/* <Footer /> */}
  </div>
);

export default Layout;
