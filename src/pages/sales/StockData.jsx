import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetInstocksList } from '../../store/slices/Sale/instocksListSlice';
import { handleRequestRaw } from '../../store/slices/Sale/requestRawSlice';
import { db } from '../../realtime/firebase_init';

//firebase
import { ref, onValue } from 'firebase/database';

const StockData = () => {
  const {
    instocksList,
    loading: l1,
    error: e1,
  } = useSelector((state) => state.instocksList);

  const [newDataArray, setNewDataArray] = useState([]);

  const dispatch = useDispatch();
  const [isEvent, setIsEvent] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ApproveStockRequestEventRef = ref(
          db,
          '/ApproveStockRequestEvent/',
        );
        onValue(ApproveStockRequestEventRef, (snapshot) => {
          const data = snapshot.val();
          if (data) setIsEvent(data);
          if (isEvent) alert('Admin approves stock request');
        });

        dispatch(handleGetInstocksList());
        setNewDataArray(instocksList);

        setIsEvent('');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch, isEvent]);

  console.log(instocksList);

  const [productId, setProductId] = useState('');
  const [requestCount, setRequestCount] = useState('');

  const { newRequest, loading, error } = useSelector(
    (state) => state.createRequestRaw,
  );

  const requestStock = () => {
    const data = {
      product_id: productId,
      quantity: requestCount,
    };
    dispatch(handleRequestRaw(data)).then((result) => {
      if (result.payload) alert('Stock Request is sent to Admin & Warehouse');
    });
  };

  return (
    <div>
      <div className="w-full flex justify-end">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="mb-8 mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black">
              Request Stock
            </button>
          </Dialog.Trigger>
          <Dialog.Portal className="pointer-events-none">
            <Dialog.Overlay
              className="DialogOverlay"
              onClick={(e) => e.stopPropagation()}
            />
            <Dialog.Content className="DialogContentForPre">
              <Dialog.Title className="DialogTitle text-white">
                Request stock data
              </Dialog.Title>
              <Dialog.Description className="DialogDescription">
                Notify Admin for Low Stock Action{' '}
              </Dialog.Description>

              <div>
                <h2 className="font-mons mt-5 font-lg mb-2 text-white">
                  Enter Stock Id
                </h2>
                <input
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  type="text"
                  placeholder="Enter stock Id"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <label className="mb-3  block text-white font-mons mt-6">
                Enter request amount
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 rounded focus:outline-none font-mons"
                placeholder="Enter request stock amount"
                value={requestCount}
                onChange={(e) => setRequestCount(e.target.value)}
              />

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
                  onClick={requestStock}
                  className=" mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black"
                >
                  {loading ? 'Sending' : 'Send Request'}
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
            Stock Data
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 hidden items-center sm:flex">
            <p className="font-medium  text-black dark:text-white">Products</p>
          </div>

          <div className="col-span-3 hidden items-center sm:flex">
            <p className="font-medium  text-black dark:text-white">
              Product ID
            </p>
          </div>

          <div className="col-span-2 flex items-center">
            <p className="font-medium text-black dark:text-white">Quantity</p>
          </div>
        </div>

        <div>
          {instocksList &&
            instocksList.map((data) => (
              <>
                <div
                  className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                  key={data._id}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center col-span-3 ">
                    <p className="text-sm text-black dark:text-white">
                      {data.product_name}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center col-span-3">
                    <p className="text-sm text-black dark:text-white font-mono">
                      {data._id}
                    </p>
                  </div>

                  <div className="col-span-2 gap-4 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {data.in_stock_count}
                    </p>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StockData;
