import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { removeToCartItem } from '../redux/productsSlice';
import { XCircleIcon } from '@heroicons/react/outline';
function CartScreen() {
  const basket = useSelector((state) => state.products.basket);
  const dispatch = useDispatch();

  console.log(basket);
  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4  text-xl">Shopping Cart</h1>
      {basket.length == 0 ? (
        <div>
          Cart is empty <Link href={'/'}>Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-1 md:gap-5">
          <div className="overflow-x-auto md:cold-span-3">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left px-5">Item</th>
                  <th className="px-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p5">Action</th>
                </tr>
              </thead>

              <tbody>
                {basket.map((item) => (
                  <tr key={item.slug}>
                    <td className="border-b px-5" key={item.slug}>
                      <Link href={'/product/' + item.slug}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">{item.count}</td>
                    <td className="p-5 text-right">{item.price}</td>

                    <td className="p-5 text-center">
                      <XCircleIcon
                        className="h-5 w-5"
                        onClick={() => removeToCartItem(item)(dispatch)}
                      >
                        Gönder
                      </XCircleIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5 mt-5">
            <ul>
              <li>
                <div className="pb-3">
                  Subtotal ({basket.reduce((a, b) => a + b.count, 0)}) : ${' '}
                  {basket.reduce((a, b) => a + b.count * b.price, 0)}
                </div>
              </li>
              <li>
                <button className="primary-button w-full">Check Out</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default CartScreen;
