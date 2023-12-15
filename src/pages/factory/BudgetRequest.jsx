import React, { useEffect, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Flex, Button, Grid, Select, Box, Container } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { handleGetRequestedMaterialsList } from '../../store/slices/Factory/requestedMaterialsListSlice';

import './style.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleCreateRequestedMaterial } from '../../store/slices/Factory/createRequestedMaterialSlice';
import { db } from '../../realtime/firebase_init';
//firebase
import { ref, onValue } from 'firebase/database';

const BudgetRequest = () => {
  const [date, setDate] = useState(new Date().toISOString());
  const dispatch = useDispatch();

  const { newRequestedMaterial, loading: loadingForCreating } = useSelector(
    (state) => state.createRequestedMaterial,
  );

  const productData = [
    {
      id: 1,
      name: 'Apple Watch Series 7',
      category: 'Electronics',
      price: '$269',
      sold: 22,
      status: 'pending',
    },
    {
      id: 2,
      name: 'Macbook Pro M1',
      category: 'Electronics',
      price: '$546',
      sold: 34,
      status: 'approved',
    },
    {
      id: 3,
      name: 'Dell Inspiron 15',
      category: 'Electronics',
      price: '$443',
      sold: 64,
      status: 'approved',
    },
    {
      id: 4,
      name: 'HP Probook 450',
      category: 'Electronics',
      price: '$499',
      sold: 72,
      status: 'approved',
    },
  ];

  const { requestedMaterialsList } = useSelector(
    (state) => state.requestedMaterialsList,
  );

  useEffect(() => {
    console.log(date);
    dispatch(handleGetRequestedMaterialsList(date));
    console.log(requestedMaterialsList);
  }, [date, newRequestedMaterial]);

  const productRequestStatus = ['approved', 'pending'];

  const [materialName, setMaterialName] = useState('');
  const [materialBudget, setMaterialBudget] = useState('');
  const [materialQuantity, setMaterialQuantity] = useState('');

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
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="mb-5 mt-5 py-2 px-5 float-right bg-yellow-500 rounded shadow font-mons font-bold text-black">
              Request Budget
            </button>
          </Dialog.Trigger>
          <Dialog.Portal className="pointer-events-none">
            <Dialog.Overlay
              className="DialogOverlay"
              onClick={(e) => e.stopPropagation()}
            />
            <Dialog.Content className="DialogContent w-[600px]">
              <Dialog.Title className="DialogTitle text-white pb-1 text-xl text-center">
                Request Budget for Required Raw Materials
              </Dialog.Title>

              <Container size="1">
                <Grid className="flex gap-4">
                  <form>
                    <div className="px-6.5 pt-6.5">
                      <div className="mb-4.5">
                        <input
                          type="text"
                          placeholder="Enter Material Name"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  text-white"
                          value={materialName}
                          onChange={(e) => setMaterialName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4.5">
                        <input
                          type="number"
                          placeholder="Enter Material Quantity"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  text-white"
                          value={materialQuantity}
                          onChange={(e) => setMaterialQuantity(e.target.value)}
                        />
                      </div>
                      <div className="mb-4.5">
                        <input
                          type="number"
                          placeholder="Enter Budget"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  text-white"
                          value={materialBudget}
                          onChange={(e) => setMaterialBudget(e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                </Grid>
              </Container>

              <div
                style={{
                  display: 'flex',
                  marginTop: 25,
                  justifyContent: 'flex-end',
                }}
              >
                <Dialog.Close asChild>
                  <button className=" mt-5 py-2 px-5 border border-white text-white rounded shadow font-mons font-bold mr-5">
                    Cancel
                  </button>
                </Dialog.Close>

                <Dialog.Close asChild>
                  <button
                    disabled={
                      !materialName ||
                      !materialQuantity ||
                      !materialBudget ||
                      loadingForCreating
                    }
                    onClick={() => {
                      dispatch(
                        handleCreateRequestedMaterial({
                          material_name: materialName,
                          quantity: materialQuantity,
                          budget: materialBudget,
                        }),
                      );
                      setMaterialName('');
                      setMaterialQuantity('');
                      setMaterialBudget('');
                    }}
                    className=" mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black"
                  >
                    {loadingForCreating ? <>Sending...</> : <>Request</>}
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Close asChild></Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Budget Request Lists
          </h4>
        </div>

        <div className="grid grid-cols-9 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-start-1 col-end-3 flex items-center">
            <p className="font-medium">Material Name</p>
          </div>
          <div className="col-start-4 col-end-5 flex justify-center">
            <p className="font-medium">Quantity</p>
          </div>
          <div className="col-start-6 col-end-7 flex justify-center">
            <p className="font-medium">Budget</p>
          </div>
          <div className="col-start-8 col-end-9 flex justify-center">
            <p className="font-medium">Status</p>
          </div>
        </div>

        {requestedMaterialsList.map((product, i) => (
          <div
            key={i}
            className="grid grid-cols-3 justify-between border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          >
            <div className="col-start-1 col-end-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.material.raw_material_name}
                </p>
              </div>
            </div>
            <div className="col-start-4 col-end-5 flex justify-center">
              <p className="text-sm text-black dark:text-white">
                {product.quantity}
              </p>
            </div>
            <div className="col-start-6 col-end-7 flex justify-center">
              <p className="text-sm text-black dark:text-white">
                {product.budget}
              </p>
            </div>
            <div className="col-start-8 col-end-9 flex justify-center">
              <div className="text-sm text-black dark:text-white">
                {product.status == 'approved' ? (
                  <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                    Approved
                  </p>
                ) : (
                  <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                    Pending
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetRequest;
