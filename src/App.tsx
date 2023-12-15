import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Loader from './department/common/Loader.js';
import Root from './department/common/Root.jsx';
import NotFound from './department/common/NotFound';
import Sales from './department/sales/Sales.jsx';
import Admin from './department/admin/Admin.jsx';
import Warehouse from './department/warehouse/Warehouse.jsx';
import Logistics from './department/logistics/Logistics.jsx';
import Factory from './department/factory/Factory.jsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/sales/*" element={<Sales />} />
        <Route path="/warehouse/*" element={<Warehouse />} />
        <Route path="/logistics/*" element={<Logistics />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/factory/*" element={<Factory />} />

        <Route exact path="/" element={<Root />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
