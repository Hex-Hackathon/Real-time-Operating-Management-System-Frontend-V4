import React, { useState } from 'react';
import Login from '../common/Login';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Link,
  NavLink,
  useNavigate,
  Routes,
  Outlet,
} from 'react-router-dom';
import Sidebar from '../common/sidebar/Sidebar';
import Header from '../common/Header/Header';

import SalesDashboard from '../../pages/sales/SalesDashboard';
import Preorders from '../../pages/sales/Preorders';
import Customers from '../../pages/sales/Customers';
import StockData from '../../pages/sales/StockData';
import PreordersDetails from '../../pages/sales/PreordersDetails';

const Sales = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path="*"
        element={
          localStorage.getItem('sales-token') ? (
            <SalesPanel />
          ) : (
            <Navigate to="/sales/login" />
          )
        }
      />
    </Routes>
  );
};

export default Sales;

const SalesPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const salesMenu = [
    {
      path: '/sales/preorders',
      text: 'Preorders',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-file-text"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
    },
    {
      path: '/sales/customers',
      text: 'Customers',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-users"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      path: '/sales/stock',
      text: 'Stock Data',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-package"
        >
          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
    },
  ];

  // Array of notification objects
  const SalesNotifications = [
    {
      content: 'Edit your information in a swipe Sint occaecat cupidatat...',
      date: '12 May, 2025',
    },
    {
      content:
        'It is a long established fact that a reader will be distracted...',
      date: '24 Feb, 2025',
    },
    {
      content:
        'There are many variations of passages of Lorem Ipsum available, there are many variations of passages of Lorem Ipsum available.',
      date: '04 Jan, 2025',
    },
    {
      content:
        'There are many variations of passages of Lorem Ipsum available...',
      date: '01 Dec, 2024',
    },
    {
      content:
        'There are many variations of passages of Lorem Ipsum available, there are many variations of passages of Lorem Ipsum available.',
      date: '04 Jan, 2025',
    },
    {
      content:
        'There are many variations of passages of Lorem Ipsum available...',
      date: '01 Dec, 2024',
    },
  ];

  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            salesMenu={salesMenu}
          />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              notifications={SalesNotifications}
            />

            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Routes>
                  <Route index element={<Navigate to="customers" />} />
                  {/* <Route path="dashboard" element={<SalesDashboard />} /> */}
                  <Route path="preorders" element={<Preorders />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="stock" element={<StockData />} />
                  <Route
                    path="preorders/details"
                    element={<PreordersDetails />}
                  />
                </Routes>
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
