import { useState } from 'react';
import StockRequestRow, { nullRequestedStock } from './StockRequestRow';
import { StockRequest } from '../../pages/admin/api/stockRequestApiSlice';

interface Props {
  columnNames: string[];
  data: StockRequest[];
}

const StockRequestTable = ({ columnNames, data }: Props) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          {columnNames.map((name, i) => (
            <div key={i} className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase">{name}</h5>
            </div>
          ))}
        </div>

        {!data.length ? (
          <StockRequestRow item={nullRequestedStock} />
        ) : (
          data.map((stockRequest) => (
            <StockRequestRow key={stockRequest._id} item={stockRequest} />
          ))
        )}
      </div>
    </div>
  );
};

export default StockRequestTable;
