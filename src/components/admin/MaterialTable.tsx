import { useState } from 'react';
import MaterialRow, { nullRequestedMaterialRow } from './MaterialRow';
import { useMaterialRequestStore } from '../../pages/admin/store/material_request_store';

export interface RequestedMaterial {
  _id: string;
  quantity: number;
  budget: number;
  status: 'pending' | 'approved';
  created_date: string;
  material: Material;
}
type Material = {
  _id: string;
  raw_material_name: string;
};

interface Props {
  columnNames: string[];
  data: RequestedMaterial[];
}

const MaterialTable = ({ columnNames, data }: Props) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          {columnNames.map((name) => (
            <div key={name} className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase">{name}</h5>
            </div>
          ))}
        </div>

        {!data.length ? (
          <MaterialRow item={nullRequestedMaterialRow} />
        ) : (
          data.map((order) => <MaterialRow key={order._id} item={order} />)
        )}
      </div>
    </div>
  );
};

export default MaterialTable;
