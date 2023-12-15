import { StockRequest } from '../../pages/admin/api/stockRequestApiSlice';
import { useMaterialRequestStore } from '../../pages/admin/store/material_request_store';

type Props = {
  item: StockRequest;
};

export const nullRequestedStock: StockRequest = {
  _id: '-1',
  quantity: 0,
  status: '-' as any,
  admin_status: '-' as any,
  created_date: '-',
  product: {
    _id: '-',
    in_stock_count: 0,
    product_name: '-',
  },
};

const StockRequestRow = ({ item }: Props) => {
  const { selectedMaterialIds, updateMaterialIds } = useMaterialRequestStore();

  const onCheckboxChange = () => {
    if (item.status === 'processed') {
      return;
    }
    updateMaterialIds(item._id);
  };

  return (
    <div className="grid grid-cols-4 border-b border-stroke relative dark:border-strokedark sm:grid-cols-5">
      <div className="absolute left-0  top-6">
        <label
          id={`checkboxLabel_${item._id}`}
          className="flex cursor-pointer select-none items-center"
        >
          <div className="relative">
            <input
              disabled={item.admin_status === 'approved'}
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
        <p className="hidden text-black dark:text-white sm:block ">
          {item.product?.product_name}
        </p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white">{item.quantity}</p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <div className="text-black dark:text-white">
          {item.status == 'processed' ? (
            <>
              <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                {item.status}
              </p>
            </>
          ) : (
            <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
              {item.status}
            </p>
          )}
        </div>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <div className="text-black dark:text-white">
          {item.admin_status == 'approved' ? (
            <>
              <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                {item.admin_status}
              </p>
            </>
          ) : (
            <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
              {item.admin_status}
            </p>
          )}
        </div>
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

export default StockRequestRow;
