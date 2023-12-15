import * as Dialog from '@radix-ui/react-dialog';
import React, { useState, useEffect } from 'react';

import Select from 'react-select';

import { handleGetProcessingOrdersList } from '../../store/slices/Sale/processingOrdersListSlice';
import { handleCreateDeliRoute } from '../../store/slices/Logistics/createDeliRouteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../realtime/firebase_init';

//firebase
import { ref, onValue } from 'firebase/database';
import { locale } from 'dayjs';
import { data } from 'autoprefixer';

const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: '1em' }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const DeliveryHistory = () => {
  const [deperatureDate, setDeperatureDate] = useState();
  const [completeDate, setCompleteDate] = useState();

  const options = [
    { value: '7A-9821', label: '7A-9821' },
    { value: '9C-4421', label: '9C-4421' },
    { value: '6B-4455', label: '6B-4455' },
    { value: '12C-1234', label: '12C-1234' },
    { value: '2C-1567', label: '2C-1567' },
  ];

  const productData = [
    {
      id: 1,
      name: 'Apple Watch Series 7',
      category: 'Electronics',
      price: '$269',
      sold: 22,
      profit: '$45',
    },
    {
      id: 2,
      name: 'Macbook Pro M1',
      category: 'Electronics',
      price: '$546',
      sold: 34,
      profit: '$125',
    },
    {
      id: 3,
      name: 'Dell Inspiron 15',
      category: 'Electronics',
      price: '$443',
      sold: 64,
      profit: '$247',
    },
    {
      id: 4,
      name: 'HP Probook 450',
      category: 'Electronics',
      price: '$499',
      sold: 72,
      profit: '$103',
    },
  ];

  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleCheckboxChange = (productId) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds((prevIds) =>
        prevIds.filter((id) => id !== productId),
      );
    } else {
      setSelectedProductIds((prevIds) => [...prevIds, productId]);
    }
  };

  //console.log(selectedProductIds);

  const dispatch = useDispatch();

  const [isEvent, setIsEvent] = useState();
  const dbRef = ref(db, 'NewOrderEvent/');

  useEffect(() => {
    // onValue(dbRef, (snapshot) => {
    //   const data = snapshot.val();
    //   setIsEvent(data);
    // });

     const newOrderRef = ref(db, '/NewOrderEvent/');
     onValue(newOrderRef, (snapshot) => {
       const data = snapshot.val();
       if (data) setIsEvent(data);
     });

    const fetchData = async () => {
      try {
        dispatch(handleGetProcessingOrdersList());
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
       
      //  const getNewOrderData = (snapshot) => {
      //    const fetchedData = snapshot.val();
      //    setIsEvent(fetchedData);
      //  };
      //  const unsubscribeNewOrder = onValue(newOrderRef, getNewOrderData);
    
    };
    fetchData();
  }, [dispatch,isEvent]);

  const { processingOrdersList } = useSelector(
    (state) => state.processingOrdersList,
  );

  //console.log(processingOrdersList);
  const [truck, setTruck] = useState();
  const createRoute = () => {
    const data = {
      truck_id_card: truck.value,
      deperature_date: deperatureDate,
      completed_date: completeDate,
      IdsOfOrders: selectedProductIds,
    };
    dispatch(handleCreateDeliRoute(data)).then((result) => {
      if (result) location.reload();
    });
  };
  // console.log(truck);
  const { newDeliRoute, loading, error } = useSelector(
    (state) => state.processingOrdersList,
  );

  return (
    <div>
      <div className="w-full flex justify-end">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              disabled={selectedProductIds.length === 0}
              className="disabled:cursor-not-allowed mb-8 mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black"
            >
              New Deli Route
            </button>
          </Dialog.Trigger>
          <Dialog.Portal className="pointer-events-none">
            <Dialog.Overlay
              className="DialogOverlay"
              onClick={(e) => e.stopPropagation()}
            />
            <Dialog.Content className="DialogContent">
              <Dialog.Title className="DialogTitle text-yellow-500 font-bold">
                New Deli Route
              </Dialog.Title>

              <div className="mt-2 flex gap-2">
                <div>
                  <label className="mb-3 mt-3 block text-black dark:text-white">
                    Pick Deperature Date
                  </label>
                  <input
                    type="date"
                    name=""
                    className="w-full py-2 px-3 rounded focus:outline-none font-mons"
                    defaultValue={deperatureDate}
                    onChange={(e) => setDeperatureDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-3 mt-3 block text-black dark:text-white">
                    Pick Complete Date
                  </label>
                  <input
                    type="date"
                    name=""
                    className="w-full py-2 px-3 rounded focus:outline-none font-mons"
                    defaultValue={completeDate}
                    onChange={(e) => setCompleteDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="mb-3 mt-3 block text-black dark:text-white">
                  Select Truck
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={options[0]}
                  value={truck}
                  onChange={(newV) => {
                    setTruck(newV);
                  }}
                  name="color"
                  options={options}
                />

                <div
                  style={{
                    color: 'hsl(0, 0%, 40%)',
                    display: 'inline-block',
                    fontSize: 12,
                    fontStyle: 'italic',
                    marginTop: '1em',
                  }}
                ></div>
              </div>

              <div
                style={{
                  display: 'flex',
                  marginTop: 0,
                  justifyContent: 'flex-end',
                }}
              >
                <Dialog.Close asChild>
                  <button className=" mt-5 py-2 px-5 border border-white text-white rounded shadow font-mons font-bold mr-5">
                    Cancle
                  </button>
                </Dialog.Close>

                <button
                  onClick={createRoute}
                  className=" mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black"
                >
                  {loading ? 'Creating' : 'Create Route'}
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
            Incoming Preorders
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Select</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Order Id</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Deli Address</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Customer</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Expected Date</p>
          </div>
        </div>

        {processingOrdersList &&
          processingOrdersList.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            >
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-black dark:text-white">
                    <div>
                      <label
                        id={`checkboxLabel_${product._id}`}
                        className="flex cursor-pointer select-none items-center"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id={`checkboxLabel_${product._id}`}
                            className="sr-only"
                            checked={selectedProductIds.includes(product._id)}
                            onChange={() => handleCheckboxChange(product._id)}
                          />
                          <div
                            className={`box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary ${
                              selectedProductIds.includes(product._id) &&
                              '!border-4'
                            }`}
                          >
                            <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </p>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-black dark:text-white">
                    {product._id}
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {product.delivery}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.customer_name}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                
                  {new Date(product.expected_date).toLocaleDateString('en-Us', {
                    dateStyle: 'medium',
                  })}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DeliveryHistory;
