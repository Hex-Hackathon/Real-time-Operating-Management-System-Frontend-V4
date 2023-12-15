import Breadcrumb from '../mock-components/Breadcrumb';
import TableOne from '../mock-components/TableOne';
import TableThree from '../mock-components/TableThree';
import TableTwo from '../mock-components/TableTwo';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
