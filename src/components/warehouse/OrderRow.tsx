import { Order } from './OrderTable';

type Props = {
  order: Order;
};

export const nullOrderRow: Order = {
  _id: '-1',
  customer_id: '-1',
  customer_name: '-',
  deli_id: '-1',
  delivery_status: '-',
  order_status: '-',
  paid: '-',
  product_list: [],
  created_date: '-',
  expected_date: '-',
};

const OrderRow = ({ order }: Props) => {
  return (
    <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="hidden text-black dark:text-white sm:block">
          {order.customer_name}
        </p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white">{order.order_status}</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">{order.delivery_status}</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{order.paid}</p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-meta-5">
          {order.expected_date === '-'
            ? order.expected_date
            : new Date(order.expected_date).toLocaleDateString('en-Us', {
                dateStyle: 'medium',
              })}
        </p>
      </div>
    </div>
  );
};

export default OrderRow;
