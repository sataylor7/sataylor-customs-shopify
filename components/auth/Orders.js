import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function Orders() {
  const { orders, customer } = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (customer.token) {
      orders(customer.token).then((result) => {
        console.log(result);
        if (result.customer.orders.edges) {
          setMyOrders(result.customer.orders.edges);
        }
        return null;
      });
    }
  }, []);

  return (
    <div className='wrapper'>
      <h3 className='text-xl'>Orders</h3>
      {myOrders.length > 0 ? (
        <div>
          <div className=''>
            {myOrders.map((order) => (
              <div key={order.node.orderNumber} className=''>
                <div className='al'>
                  <h3 className='m0 p0'>{order.node.orderNumber}</h3>
                  <span>
                    Processed:{' '}
                    {spacetime(order.node.processedAt).unixFmt('dd.MM.yyyy')}
                  </span>
                </div>
                <div className=''>
                  <h5 className=''>${order.node.totalPrice}</h5>
                  <a
                    href={order.node.statusUrl}
                    target='_blank'
                    rel='noopener noreferrer'>
                    Order Status
                  </a>
                </div>
              </div>
            ))}
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
