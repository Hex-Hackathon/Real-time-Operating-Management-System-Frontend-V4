import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Select } from '@radix-ui/themes';
import { handleCreateCustomer } from '../../../store/slices/Sale/createCustomerSlice';
import { useDispatch, useSelector } from 'react-redux';
const CreateCustomer = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setcustomerAddress] = useState('');
  const [customerPhone, setcustomerPhone] = useState('');
  const [customerType, setcustomerType] = useState('wholesale');

  const dispatch=useDispatch();


  const handleNewCustomer = (e) => {
    e.preventDefault();

    let createDate = {
      name: customerName,
      phone: customerPhone,
      deli_address: customerAddress,
      role: customerType,
    };

    dispatch(handleCreateCustomer(createDate)).then((result) => {
      if (result.payload) {
        setCustomerName('');
        setcustomerAddress('');
        setcustomerPhone('');
        setcustomerType('');
        location.reload();
      }
    });
  };

  
  const { loading: loader, error: err } = useSelector(
    (state) => state.createCustomer,
  );

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="mb-8 mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black">
            Create New Customer
          </button>
        </Dialog.Trigger>
        <Dialog.Portal className="pointer-events-none">
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContentForPre">
            <Dialog.Title className="DialogTitle text-white">
              Create New Customer
            </Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Create customer to start the process of creating order.
            </Dialog.Description>

            <form action="#">
              <div className="px-6.5 pt-6.5">
                <div className="mb-4.5">
                  <input
                    type="text"
                    placeholder="Enter customer's full name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  text-white"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="mb-4.5">
                  <input
                    type="text"
                    placeholder="Enter customer's address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  text-white"
                    value={customerAddress}
                    onChange={(e) => setcustomerAddress(e.target.value)}
                  />
                </div>

                <div className="mb-4.5">
                  <input
                    type="text"
                    placeholder="Enter customer's phone number"
                    value={customerPhone}
                    onChange={(e) => setcustomerPhone(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input text-white"
                  />
                </div>

                <p className="text-white mb-2 font-mons text-xs">
                  Select Customer's Type
                </p>
                <Select.Root
                  defaultValue={customerType}
                  onValueChange={(value) => setcustomerType(value)}
                >
                  <Select.Trigger
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent block text-white"
                    style={{
                      padding: '8px 20px',
                      border: '1px solid white',
                      color: 'white',
                    }}
                  />

                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="Key Account">Key Account</Select.Item>
                      <Select.Item value="Wholesale">Wholesale</Select.Item>
                      <Select.Item value="Distributor">Distributor</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>
            </form>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Dialog.Close asChild>
                <button className=" mt-5 py-2 px-5 border border-white text-white rounded shadow font-mons font-bold mr-5">
                  Cancle
                </button>
              </Dialog.Close>

              <button
                onClick={handleNewCustomer}
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
  );
};

export default CreateCustomer;
