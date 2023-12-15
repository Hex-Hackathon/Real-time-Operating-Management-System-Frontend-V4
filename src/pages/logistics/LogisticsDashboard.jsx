import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetDeliRoutes } from '../../store/slices/Logistics/deliRoutesSlice';

const LogisticsDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(handleGetDeliRoutes());
        setNewDataArray(deliRoutes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch]);


  const { deliRoutes, loading, error } = useSelector(
    (state) => state.deliRoutes,
  );

  const [newDataArray, setNewDataArray] = useState([]);
  console.log(deliRoutes);
  console.log(newDataArray)

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            On Going Preorders
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Truck Id</p>
          </div>
          {/* <div className="col-span-3 hidden items-center sm:flex">
            <p className="font-medium">Deli Address</p>
          </div> */}
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Deperature Date</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Completed Date</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Deli Status</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Edit</p>
          </div>
        </div>

        {newDataArray &&
          newDataArray.map((product) => (
            <>
              <div
                key={product._id}
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-2 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <p className="text-sm text-black dark:text-white">
                      {product.truck_id}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">
                    {new Date(product.deperature_date).toLocaleDateString(
                      'en-Us',
                      {
                        dateStyle: 'medium',
                      },
                    )}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {new Date(product.completed_date).toLocaleDateString(
                      'en-Us',
                      {
                        dateStyle: 'medium',
                      },
                    )}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {product.deli_status}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-meta-3">Edit Status</p>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default LogisticsDashboard;
