import DateInput from '../../components/admin/DateInput';
import MaterialTable from '../../components/admin/MaterialTable';
import useDateInput from '../../hooks/useDateInput';
import {
  useApproveMaterialRequestMutation,
  useGetAllMaterialRequestsQuery,
} from './api/materialRequestApiSlice';
import { useMaterialRequestStore } from './store/material_request_store';
import toast from 'react-hot-toast';
import {db} from '../../realtime/firebase_init';
//firebase
import { ref, onValue } from 'firebase/database';
import React,{useEffect,useState} from 'react';

const columnNames = [
  'Material Name',
  'Quantity',
  'Status',
  'Budget',
  'Created Date',
];

const MaterialRequests = () => {
  const { handleDateChange, inputDateString, selectedDate } = useDateInput();

  const { data, isFetching } = useGetAllMaterialRequestsQuery({
    date: selectedDate.toISOString(),
  });
  const [approveMaterialRequests, { isLoading }] =
    useApproveMaterialRequestMutation();

  const selectedMaterialIds = useMaterialRequestStore().selectedMaterialIds;
  const resetMaterialIds = useMaterialRequestStore().resetMaterialIds;

  const onApproveMaterialRequests = async () => {
    try {
      if (!selectedMaterialIds) {
        return;
      }
      await approveMaterialRequests({
        request_ids: selectedMaterialIds,
      });
      resetMaterialIds();
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

 const [isEvent, setIsEvent] = useState("");
   useEffect(() => {
     const newMaterialRequestEventRef = ref(db, '/NewMaterialRequestEvent/');
     onValue(newMaterialRequestEventRef, (snapshot) => {
       const data = snapshot.val();
       if (data) setIsEvent(data);
       if (isEvent) alert('There is an budget request from Factory');
     });

     setIsEvent('');
   }, [isEvent]);

  return (
    <div>
      <div>
        <div className="flex justify-end items-center gap-3 mb-3">
          <DateInput
            handleDateChange={handleDateChange}
            inputDateString={inputDateString}
          />

          <button
            onClick={onApproveMaterialRequests}
            disabled={isLoading || !selectedMaterialIds.length}
            className="bg-primary hover:bg-opacity-70 disabled:bg-opacity-30 text-white rounded-md font-medium px-8 py-[14px] text-base"
          >
            Approve
          </button>
        </div>
        <p className="my-3 text-black dark:text-white mt-5 ">
          The list displays material requests from the factory department.
          Select the items you wish to approve for budget allocation.
        </p>
        {isFetching ? (
          'Fetching...'
        ) : (
          <MaterialTable columnNames={columnNames} data={!!data ? data : []} />
        )}
      </div>
    </div>
  );
};

export default MaterialRequests;
