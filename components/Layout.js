import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

import { useSelector } from 'react-redux';
function Layout({ children, title }) {
  const urunler = useSelector((state) => state.products.basket);

  console.log(urunler);
  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center justify-between shadow-md">
            <Link href={'/'}>
              <a className="text-lg font-bold p-2">amazona</a>
            </Link>
            <div>
              <Link href={'/cart'}>
                <a className="p-2">
                  Cart
                  {urunler.length > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {urunler.reduce((a, c) => a + c.count, 1)}
                    </span>
                  )}
                </a>
              </Link>
              <Link href={'/login'}>
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="flex justify-center items-center h-10 shadow-inner">
          Copyright © {new Date().getFullYear()} Amazona
        </footer>
      </div>
    </>
  );
}

export default Layout;
