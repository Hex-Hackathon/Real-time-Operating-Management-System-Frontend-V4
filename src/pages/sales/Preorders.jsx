import React, { useState, useEffect } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Flex, Button, Grid, Box, Container } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import './style.css';
import AddProduct from '../../components/sales/AddProduct/AddProductModal';

import { handleCreateOrder } from '../../store/slices/Sale/createOrderSlice';
import { useDispatch, useSelector } from 'react-redux';

import { handleGetPendingOrdersList } from '../../store/slices/Sale/pendingOrdersListSlice';
import { handleGetInstocksList } from '../../store/slices/Sale/instocksListSlice';
import { db } from '../../realtime/firebase_init';
//firebase
import { ref, onValue } from 'firebase/database';
const Preorders = () => {
  const dispatch = useDispatch();

  const {
    pendingOrdersList,
    loading: load,
    error: err,
  } = useSelector((state) => state.pendingOrdersList);

  const [isEvent, setIsEvent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newDeliRouteRef = ref(db, '/NewDeliRouteEvent/');
        onValue(newDeliRouteRef, (snapshot) => {
          const data = snapshot.val();
          if (data) setIsEvent(data);
          if (isEvent) alert('There is an delivery going');
        });

        dispatch(handleGetPendingOrdersList());

        dispatch(handleGetInstocksList());

        setIsEvent('');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch, isEvent]);

  console.log(pendingOrdersList);

  const customStyles = {
    control: (provided, state) => {
      let borderColor = '#2e3743';
      let backgroundColor = '#1B222C';
      let cursor = 'default';
      let outline = 'none';
      if (state.isFocused) {
        borderColor = 'none';
        outline = 'none';
      }

      return {
        ...provided,
        '&:hover': null,
        '&:active': null,
        '&:focus': null,
      };
    },
  };

  const [customer, setCustomer] = useState('');
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const { newOrder, loading, error } = useSelector(
    (state) => state.createOrder,
  );

  const makeorder = () => {
    if (customer && selectedDate) {
      const order = {
        customer_id: customer,
        expected_date: selectedDate,
        // customer_name: name,
      };
      dispatch(handleCreateOrder(order)).then((result) => {
        if (result.payload) {
          location.reload();
        }
      });
    }
  };

  return (
    <div>
      <div className="w-full flex justify-end">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="mb-8 mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black">
              New Order
            </button>
          </Dialog.Trigger>
          <Dialog.Portal className="pointer-events-none">
            <Dialog.Overlay
              className="DialogOverlay"
              onClick={(e) => e.stopPropagation()}
            />
            <Dialog.Content className="DialogContentForPre">
              <Dialog.Title className="DialogTitle text-white">
                Create New Order
              </Dialog.Title>
              <Dialog.Description className="DialogDescription">
                Add the customer to create the order, and add the products from
                the table list.
              </Dialog.Description>

              <div>
                <h2 className="font-mons mt-5 font-lg mb-2 text-white">
                  Enter Customer Id
                </h2>
                <input
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  type="text"
                  placeholder="Enter customer Id"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              {/* <div>
                <h2 className="font-mons mt-5 font-lg mb-2 text-white">
                  Enter Customer Name
                </h2>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter customer name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div> */}

              <label className="mb-3  block text-white font-mons mt-6">
                Pick Customer's Expected Date
              </label>
              <input
                type="date"
                name="date-picker"
                className="w-full py-2 px-3 rounded focus:outline-none font-mons"
                defaultValue={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              <div className="mt-5 bg-[#1B222C] p-4">
                {customer && (
                  <div className=" text-white font-mons flex text-sm flex-col">
                    <p>Customer's Id: {customer}</p>
                  </div>
                )}
                {/* {name && (
                  <div className=" text-white font-mons flex text-sm flex-col">
                    <p>Customer Name: {name}</p>
                  </div>
                )} */}
                {selectedDate && (
                  <p className="text-white font-mons text-sm">
                    Customer's Expected Date: {selectedDate}
                  </p>
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  marginTop: 25,
                  justifyContent: 'flex-end',
                }}
              >
                <Dialog.Close asChild>
                  <button className=" mt-5 py-2 px-5 border border-white text-white rounded shadow font-mons font-bold mr-5">
                    Cancle
                  </button>
                </Dialog.Close>

                <button
                  onClick={makeorder}
                  className=" mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black"
                >
                  {loading ? 'Loading' : 'Create Order'}
                </button>
              </div>
              <Dialog.Close asChild></Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Preorder Lists
          </h4>
        </div>
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Customer's Name</p>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="font-medium  ">Customer's Address</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium  ">Expected Date</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium"></p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium"></p>
          </div>
        </div>
        {/* pendingOrdersList && */}
        <div>
          {pendingOrdersList &&
            pendingOrdersList.map((order) => (
              <>
                <div
                  className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                  key={order._id}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center col-span-2 ">
                    <p className="text-sm text-black dark:text-white">
                      {order.customer_name}
                    </p>
                  </div>
                  <div className="col-span-3 flex items-center">
                    <div className="col-span-3 hidden items-center sm:flex">
                      <p className="text-sm text-black dark:text-white">
                        {order.delivery}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {new Date(order.expected_date).toLocaleDateString(
                        'en-Us',
                        {
                          dateStyle: 'medium',
                        },
                      )}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center flex-col">
                    {pendingOrdersList && <AddProduct orderId={order._id} />}

                    <Link
                      to={`details`}
                      className="text-xs hover:underline mt-2 cursor inline-block"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Preorders;
