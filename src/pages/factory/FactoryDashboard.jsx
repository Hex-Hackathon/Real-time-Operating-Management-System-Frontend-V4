import React, { useEffect, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Flex, Button, Grid, Select, Box, Container } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import './style.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetRequestedProducts } from '../../store/slices/Factory/requestedProductsSlice';
import { db } from '../../realtime/firebase_init';
//firebase
import { ref, onValue } from 'firebase/database';
const FactoryDashboard = () => {
  const [date, setDate] = useState(new Date().toISOString());

  const dispatch = useDispatch();
  const { requestedProducts } = useSelector((state) => state.requestedProducts);
  const [isEvent, setIsEvent] = useState();
  useEffect(() => {
    const newRawRequestEventRef = ref(db, '/NewRawRequestEvent/');
    onValue(newRawRequestEventRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setIsEvent(data);
      if (isEvent) alert('There is an stock request from sales');
    });

    dispatch(handleGetRequestedProducts(date));

    setIsEvent('');
  }, [date, isEvent]);

  return (
    <div>
      <div className="mb-5 w-full flex justify-end items-center">
        <input
          type="date"
          className="custom-input-date-2 rounded border-[1.5px] border-stroke bg-transparent px-5 mr-[20px] h-[40px] font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          defaultValue={new Date().toISOString().substring(0, 10)}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            setDate(selectedDate.toISOString());
          }}
        />
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Product Requests From Admin
          </h4>
        </div>

        <div className="grid grid-cols-9  justify-between border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-start-1 col-end-4 flex items-center">
            <p className="font-medium">Product Name</p>
          </div>
          <div className="col-start-5 col-end-6 flex justify-center">
            <p className="font-medium">Quantity</p>
          </div>
          <div className="col-start-7 col-end-9 flex items-center justify-center">
            <p className="font-medium">Status</p>
          </div>
        </div>

        {requestedProducts.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-3 justify-between border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          >
            <div className="col-start-1 col-end-4 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-black dark:text-white">
                  {product?.product?.product_name || 'Citrus Fusion Fizz'}
                </p>
              </div>
            </div>
            <div className="col-start-5 col-end-6 flex justify-center">
              <p className="text-sm text-black dark:text-white">
                {product.quantity}
              </p>
            </div>
            <div className="flex col-start-7 col-end-9 justify-center">
              {product.admin_status === 'processing' ? (
                <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                  Waiting
                </p>
              ) : (
                <Select.Root
                  defaultValue={product?.status}
                  disabled={product?.status == 'processed'}
                >
                  <Select.Trigger
                    className={
                      product?.status == 'processed' && `DialogTrigger`
                    }
                  />
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="processed">Processed</Select.Item>
                      <Select.Item value="processing">Processing</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactoryDashboard;
