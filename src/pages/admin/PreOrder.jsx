import React, { useEffect, useState } from 'react';
import DateInput from '../../components/admin/DateInput';
import OrderTable from '../../components/admin/OrderTable';
import useDateInput from '../../hooks/useDateInput';
import { apiBaseUrl } from '../../utils/index';

//! this is only used before the api call methods are implemented
async function getOrders(dateString) {
  console.log(`${apiBaseUrl}/orders_list_by_place_order_day/${dateString}`);
  const res = await fetch(
    `${apiBaseUrl}/orders_list_by_place_order_day/${dateString}`,
  );
  return await res.json();
}

const columnNames = [
  'Customer Name',
  'Order Status',
  'Delivery Status',
  'Paid',
  'Expected Date',
];

const PreOrders = () => {
  const [orders, setOrders] = useState([]);

  const { handleDateChange, inputDateString } = useDateInput({
    hook: fetchAndSetDataWith,
  });

  async function fetchAndSetDataWith(dateString) {
    const result = await getOrders(dateString);
    setOrders(result);
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getOrders(new Date().toISOString()).then((res) => setOrders(res));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-end items-center mb-3">
          <DateInput
            handleDateChange={handleDateChange}
            inputDateString={inputDateString}
          />
        </div>

        <OrderTable columnNames={columnNames} data={!!orders ? orders : []} />
      </div>
    </div>
  );
};

export default PreOrders;
