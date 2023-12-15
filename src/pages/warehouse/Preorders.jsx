import React, { useEffect, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Flex, Button, Grid, Box, Container } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';

import './style.css';
import { NavLink } from 'react-router-dom';
import OrderTable from '../../components/warehouse/OrderTable';
import DateInput from '../../components/warehouse/DateInput';
import useDateInput from '../../hooks/useDateInput';
import { apiBaseUrl } from '../../utils/index';

async function getOrders(dateString) {
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
  'Expected Deli Date',
];

const Preorders = () => {
  const [orders, setOrders] = useState([]);

  const { handleDateChange, selectedDate, inputDateString } = useDateInput({
    hook: fetchAndSetDataWith,
  });

  async function fetchAndSetDataWith(dateString) {
    const result = await getOrders(dateString);
    setOrders(result);
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getOrders(new Date()).then((res) => setOrders(res));
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

export default Preorders;
