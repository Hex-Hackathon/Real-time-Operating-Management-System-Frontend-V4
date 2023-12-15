import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Flex, Button, Grid, Box, Container } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';


import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { TruckListfunc } from '../../store/slices/Logistics/truckListSlice.js';

import { useEffect,useState } from 'react';


import { handleCreateTruck } from '../../store/slices/Logistics/createTruckSlice.js';

const Truck = () => {

    const dispatch = useDispatch();

    const { data, loading, error } = useSelector(
      (state) => state.truckList,
    );

    useEffect(() => {
      const fetchData = async () => {
        try {
          dispatch(TruckListfunc());
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [dispatch]); 


      const [driver, setDriver] = useState('');
      const [truck_id_card, setTruck_id_card] = useState('');
      const [truck_capacity, setTruck_capacity] = useState('');
      
       const { loading :loader, error:err } = useSelector(
         (state) => state.createTruck,
       );

       const handleTruck = (e) => {
         e.preventDefault();
  
         let createDate = {
           driver,
           truck_id_card,
           truck_capacity,
         };

         dispatch(handleCreateTruck(createDate)).then((result) => {
           if (result.payload) {
            setDriver("");
            setTruck_capacity("");
            setTruck_id_card("");
            location.reload();
           }
         });
       };


  return (
    <div>
      <div className="w-full flex justify-end">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="mb-8 mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black">
              New Truck
            </button>
          </Dialog.Trigger>
          <Dialog.Portal className="pointer-events-none">
            <Dialog.Overlay
              className="DialogOverlay"
              onClick={(e) => e.stopPropagation()}
            />
            <Dialog.Content className="DialogContent">
              <Dialog.Title className="DialogTitle">
                Create New Truck
              </Dialog.Title>
              {/* <Dialog.Description className="DialogDescription">
                Add orders to the customer, click save when you're done.
              </Dialog.Description> */}

              <div className="mt-6">
                <label className="mb-3 mt-3 block text-black dark:text-white">
                  Truck Id
                </label>
                <input
                  value={truck_id_card}
                  onChange={(e) => setTruck_id_card(e.target.value)}
                  type="text"
                  placeholder="Id"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 mt-3 block text-black dark:text-white">
                  Truck Capacity
                </label>
                <input
                  value={truck_capacity}
                  onChange={(e) => setTruck_capacity(e.target.value)}
                  type="text"
                  placeholder="capacity"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 mt-3 block text-black dark:text-white">
                  Driver Name
                </label>
                <input
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                  type="text"
                  placeholder="driver name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
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
                  onClick={handleTruck}
                  className=" mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black"
                >
                  {loader ? 'Loading' : 'Create'}
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
            Trucks
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Truck No</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Driver Name</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Capacity</p>
          </div>
          {/* <div className="col-span-1 flex items-center">
            <p className="font-medium">Available</p>
          </div> */}
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Edit</p>
          </div>
        </div>

        {data &&
          data.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            >
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-black dark:text-white">
                    {product.truck_id_card}
                  </p>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.driver}
                </p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {product.truck_capacity}
                </p>
              </div>

              <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3 dark:text-white">
                  {/* {product.sold} */}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">Edit</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Truck;
