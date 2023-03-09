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
        <div class='flex flex-col'>
          <div class='overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div class='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div class='overflow-hidden'>
                <table class='min-w-full text-left text-sm font-light border border-slate-200'>
                  <thead class='border-b font-medium'>
                    <tr>
                      <th scope='col' class='px-6 py-4'>
                        Order
                      </th>
                      <th scope='col' class='px-6 py-4'>
                        Date
                      </th>
                      <th scope='col' class='px-6 py-4'>
                        Total
                      </th>
                      <th scope='col' class='px-6 py-4'>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myOrders.map((order) => (
                      <tr class='border-b'>
                        <td class='whitespace-nowrap px-6 py-4'>
                          #{order.node.orderNumber}
                        </td>
                        <td class='whitespace-nowrap px-6 py-4'>
                          {spacetime(order.node.processedAt).unixFmt(
                            'MM.dd.yyyy'
                          )}
                        </td>
                        <td class='whitespace-nowrap px-6 py-4'>
                          {formatter.format(order.node.totalPriceV2.amount)}
                        </td>
                        <td class='whitespace-nowrap px-6 py-4'>
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
