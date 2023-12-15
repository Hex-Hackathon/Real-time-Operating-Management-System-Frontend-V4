import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Select } from '@radix-ui/themes';
import edit from '../../../assets/logo/edit.svg';

const Editcustomer = ({ cus }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setcustomerAddress] = useState('');
  const [customerPhone, setcustomerPhone] = useState('');
  const [customerType, setcustomerType] = useState('');

  useEffect(() => {
    setCustomerName(cus?.name);
    setcustomerAddress(cus?.address);
    setcustomerPhone(cus?.phone);
    setcustomerType(cus?.type.toLowerCase());
  }, []);

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <img src={edit} alt="edit" className="w-[20px]" />
        </Dialog.Trigger>
        <Dialog.Portal className="pointer-events-none">
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContentForPre">
            <Dialog.Title className="DialogTitle text-white">
              Edit Customer Information
            </Dialog.Title>

            <form action="#">
              <div className="px-6.5 pt-6.5">
                <div className="mb-4.5">
                  <input
                    type="text"
                    placeholder="Enter customer's full name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input   text-white"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="mb-4.5">
                  <input
                    type="text"
                    placeholder="Enter customer's address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input   text-white"
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
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  text-white"
                  />
                </div>

                <p className="text-white mb-2 font-mons text-xs">
                  Select Customer's Type
                </p>
                <Select.Root defaultValue={cus?.type.toLowerCase()}>
                  <Select.Trigger
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent block"
                    onChange={(e) => setcustomerType(e.target.value)}
                    value={customerType}
                    style={{
                      padding: '8px 20px',
                      border: '1px solid white',
                      color: 'white',
                    }}
                  />

                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="key account">Key Account</Select.Item>
                      <Select.Item value="wholesale">Wholesale</Select.Item>
                      <Select.Item value="distributor">Distributor</Select.Item>
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

              <button className=" mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black">
                Update Customer
              </button>
            </div>
            <Dialog.Close asChild></Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Editcustomer;
