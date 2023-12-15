import { useMaterialRequestStore } from '../../pages/admin/store/material_request_store';
import { RequestedMaterial } from './MaterialTable';

type Props = {
  item: RequestedMaterial;
};

export const nullRequestedMaterialRow: RequestedMaterial = {
  _id: '-1',
  budget: 0,
  quantity: 0,
  material: {
    _id: '-',
    raw_material_name: '-',
  },
  status: '-' as any,
  created_date: '-',
};

const MaterialRow = ({ item }: Props) => {
  const { selectedMaterialIds, updateMaterialIds } = useMaterialRequestStore();

  const onCheckboxChange = () => {
    if (item.status === 'approved') {
      return;
    }
    updateMaterialIds(item._id);
  };

  return (
    <div className="grid grid-cols-4 border-b border-stroke relative dark:border-strokedark sm:grid-cols-5">
      <div className="absolute left-0 top-6">
        <label
          id={`checkboxLabel_${item._id}`}
          className="flex cursor-pointer select-none items-center"
        >
          <div className="relative">
            <input
              disabled={item.status === 'approved'}
              type="checkbox"
              id={`checkboxLabel_${item._id}`}
              className="sr-only disabled:pointer-events-none disabled:opacity-50"
              checked={selectedMaterialIds.includes(item._id)}
              onChange={onCheckboxChange}
            />
            <div
              className={`box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary ${
                selectedMaterialIds.includes(item._id) && '!border-4'
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
            </div>
          </div>
        </label>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="hidden text-black dark:text-white sm:block">
          {item.material.raw_material_name}
        </p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white">{item.quantity}</p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white">{item.status}</p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white">{item.budget}</p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-meta-5">
          {item.created_date === '-'
            ? item.created_date
            : new Date(item.created_date).toLocaleDateString('en-Us', {
                dateStyle: 'medium',
              })}
        </p>
      </div>
    </div>
  );
};

export default MaterialRow;
