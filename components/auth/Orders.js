import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import spacetime from 'spacetime';
import { formatter } from '@/utils/helpers';

export default function Orders() {
  const { orders, customer } = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (customer.token) {
      orders(customer.token).then((result) => {
        console.log(result);
        if (result.customer.orders && result.customer.orders.edges) {
          setMyOrders(result.customer.orders.edges);
        }
        return null;
      });
    }
  }, []);

  return (
    <div className='grow shrink-0'>
      <h3 className='text-xl'>Order History</h3>

      {myOrders.length > 0 ? (
        <div className='flex items-center justify-center'>
          <div className='container'>
            <table className='w-full flex flex-row flex-no-wrap overflow-hidden my-5 border-slate-200 border-[1px]'>
              <thead className='md:border-b font-medium '>
                <tr className='flex flex-col flex-no wrap sm:table-row  mb-2 sm:mb-0'>
                  <th scope='col' className='px-6 py-4'>
                    Order
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Date
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Total
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='flex-1 sm:flex-none'>
                {myOrders.map((order) => (
                  <tr className='md:border-b flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0'>
                    <td className='whitespace-nowrap px-6 py-4'>
                      #{order.node.orderNumber}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      {spacetime(order.node.processedAt).unixFmt('MM.dd.yyyy')}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      {formatter.format(order.node.totalPriceV2.amount)}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      <a
                        className='text-sky-700 underline underline-offset-4'
                        href={order.node.statusUrl}
                        target='_blank'
                        rel='noopener noreferrer'>
                        Order Status
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <p>Sorry you don't have any orders yet!</p>
        </div>
      )}
    </div>
  );
}
