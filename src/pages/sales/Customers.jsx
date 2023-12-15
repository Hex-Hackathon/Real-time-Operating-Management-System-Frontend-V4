import React from 'react';
import CreateCustomer from '../../components/sales/Customer/CreateCustomer';
import Editcustomer from '../../components/sales/Customer/EditCustomer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { handleGetCustomersList } from '../../store/slices/Sale/customersListSlice';

const Customers = () => {
  const dispatch = useDispatch();

  const { customersList, loading, error } = useSelector(
    (state) => state.customersList,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(handleGetCustomersList());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <div className="w-full flex justify-end items-end">
        <CreateCustomer />
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Customers
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 hidden items-center sm:flex">
            <p className="font-medium ">Customer's Name</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium ">Customer's Address</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium ">Phone</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Customer's Type</p>
          </div>
        </div>

        <div>
          {customersList &&
            customersList.map((customer) => (
              <div
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                key={customer._id}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center col-span-3">
                  <p className="text-sm text-black dark:text-white">
                    {customer.name} |{' '}
                    <span className="font-mono text-[#e0e0e0]">
                      {customer._id}
                    </span>
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <div className="col-span-3 hidden items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                      {customer.deli_address}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {customer.phone}
                  </p>
                </div>
                <div className="col-span-1 flex items-center flex-col">
                  <p className="text-sm text-black dark:text-white">
                    {customer.role === 'Key Account' && (
                      <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                        Key Account
                      </span>
                    )}
                    {customer.role === 'Wholesale' && (
                      <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                        Wholesale
                      </span>
                    )}
                    {customer.role === 'Distributor' && (
                      <span className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
                        Distributor
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Customers;
