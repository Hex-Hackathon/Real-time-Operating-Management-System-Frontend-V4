import React,{useEffect,useState} from 'react';
import DateInput from '../../components/admin/DateInput';
import useDateInput from '../../hooks/useDateInput';
import StockRequestTable from '../../components/admin/StockRequestTable';
import { useMaterialRequestStore } from './store/material_request_store';
import {
  useApproveStockRequestMutation,
  useGetStockRequestsQuery,
} from './api/stockRequestApiSlice';
import toast from 'react-hot-toast';
import { db } from '../../realtime/firebase_init';
//firebase
import { ref, onValue } from 'firebase/database';

const columnNames = [
  
  'Product Name',
  'Quantity',
  'Status',
  'Admin Status',
  'Created Date',
];

const StockRequest = () => {
  const { handleDateChange, inputDateString, selectedDate } = useDateInput();
  const { data, isFetching } = useGetStockRequestsQuery({
    date: selectedDate.toISOString(),
  });
  const [approveStockRequests, { isLoading: isApproving }] =
    useApproveStockRequestMutation();

  const selectedStockRequestIds = useMaterialRequestStore().selectedMaterialIds;
  const resetMaterialIds = useMaterialRequestStore().resetMaterialIds;

  const onApproveStockRequests = async () => {
    try {
      if (isApproving || !selectedStockRequestIds) {
        return;
      }
      await approveStockRequests({
        request_ids: selectedStockRequestIds,
      });
      resetMaterialIds();
    } catch (err) {
      if (import.meta.env.VITE_ENV !== 'production') {
        console.error(err);
      }
      toast.error('Something went wrong!');
    }
  };

   const [isEvent, setIsEvent] = useState();
   useEffect(() => {
     const newMaterialRequestEventRef = ref(db, '/NewRawRequestEvent/');
     onValue(newMaterialRequestEventRef, (snapshot) => {
       const data = snapshot.val();
       if (data) setIsEvent(data);
       if (isEvent) alert('There is an Stock request from Sales');
     });

     setIsEvent('');
   }, [isEvent]);
  

  return (
    <div>
      <div>
        <div>
          <div className="flex justify-end items-center gap-3 mb-3">
            <DateInput
              handleDateChange={handleDateChange}
              inputDateString={inputDateString}
            />

            <button
              className="bg-primary hover:bg-opacity-70 disabled:bg-opacity-30 text-white rounded-md font-medium px-8 py-[14px] text-base"
              onClick={onApproveStockRequests}
              disabled={!selectedStockRequestIds.length}
            >
              Approve
            </button>
          </div>

          {isFetching ? (
            'fetching...'
          ) : (
            <StockRequestTable
              columnNames={columnNames}
              data={!!data ? data : []}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StockRequest;
