import OrderRow, { nullOrderRow } from './OrderRow';

export interface Order {
  _id: string;
  customer_id: string;
  product_list: string[];
  order_status: string;
  delivery_status: string;
  paid: string;
  created_date: string;
  expected_date: string;
  deli_id: string;
  customer_name: string;
}
interface Props {
  columnNames: string[];
  data: Order[];
}

const OrderTable = ({ columnNames, data }: Props) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          {columnNames.map((name) => (
            <div key={name} className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase">{name}</h5>
            </div>
          ))}
        </div>

        {!data.length ? (
          <OrderRow order={nullOrderRow} />
        ) : (
          data.map((order) => <OrderRow key={order._id} order={order} />)
        )}
      </div>
    </div>
  );
};

export default OrderTable;
