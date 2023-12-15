import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import icon from '../../assets/logo/logo.svg';
import { handleLogin as warehouseLogin } from '../../store/slices/Warehouse/warehouseLoginSlice';
import { handleLogin as salesLogin } from '../../store/slices/Sale/saleLoginSlice';
import { handleLogin as logisticsLogin } from '../../store/slices/Logistics/logisticsLoginSlice';
import { handleLogin as adminLogin } from '../../store/slices/Admin/adminLoginSlice';
import { handleLogin as factoryLogin } from '../../store/slices/Factory/factoryLoginSlice';

function Login() {
  const path = useResolvedPath('').pathname;
  const navigate = useNavigate();
  const welcomText = () => {
    if (path == '/warehouse/login') {
      return (
        <div className="font-mons text-xl my-5 text-white font-semibold flex ">
          <img src={icon} alt="" className="w-20" />
          <p className="-ml-8"> FlavorWave - Warehouse Department</p>
        </div>
      );
    } else if (path == '/admin/login') {
      return (
        <div className="font-mons text-xl my-5 text-white font-semibold flex ">
          <img src={icon} alt="" className="w-20" />
          <p className="-ml-8"> FlavorWave - Admin Department</p>
        </div>
      );
    } else if (path == '/sales/login') {
      return (
        <div className="font-mons text-xl my-5 text-white font-semibold flex ">
          <img src={icon} alt="" className="w-20" />
          <p className="-ml-8"> FlavorWave - Sales Department</p>
        </div>
      );
    } else if (path == '/factory/login') {
      return (
        <div className="font-mons text-xl my-5 text-white font-semibold flex ">
          <img src={icon} alt="" className="w-20" />
          <p className="-ml-8"> FlavorWave - Factory Department</p>
        </div>
      );
    } else if (path == '/logistics/login') {
      return (
        <div className="font-mons text-xl my-5 text-white font-semibold flex ">
          <img src={icon} alt="" className="w-20" />
          <p className="-ml-8"> FlavorWave - Logistcis Department</p>
        </div>
      );
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const {
    datas: warehouseData,
    loading: warehouseLoading,
    error: warehouseError,
  } = useSelector((state) => state.warehouseLogin);

  const {
    datas: saleData,
    loading: saleLoading,
    error: saleError,
  } = useSelector((state) => state.saleLogin);

  const {
    datas: adminData,
    loading: adminLoading,
    error: adminError,
  } = useSelector((state) => state.adminLogin);

  const {
    datas: factoryData,
    loading: factoryLoading,
    error: factoryError,
  } = useSelector((state) => state.factoryLogin);

  const {
    datas: logisticsData,
    loading: logisticsLoading,
    error: logisticsError,
  } = useSelector((state) => state.logisticsLogin);

  const Login = () => {
    if (email && password) {
      if (path == '/warehouse/login') {
        dispatch(warehouseLogin({ email, password }));
      } else if (path == '/admin/login') {
        dispatch(adminLogin({ email, password }));
      } else if (path == '/sales/login') {
        dispatch(salesLogin({ email, password }));
      } else if (path == '/factory/login') {
        dispatch(factoryLogin({ email, password }));
      } else if (path == '/logistics/login') {
        dispatch(logisticsLogin({ email, password }));
      }
    } else {
      toast.error('Please, Provide the necessary details to log in securely.', {
        style: {
          borderRadius: '10px',
          background: '#23303F',
          color: '#fff',
        },
      });
    }
  };

  // error handling
  useEffect(() => {
    const errors = [
      warehouseError,
      saleError,
      adminError,
      factoryError,
      logisticsError,
    ];
    const anyError = errors.some((error) => error !== null);
    if (anyError) {
      const firstError = errors.find((error) => error !== null);
      toast.error(`Error Occur: ${firstError}.`, {
        style: {
          borderRadius: '10px',
          background: '#23303F',
          color: '#fff',
        },
      });
    }
  }, [warehouseError, saleError, adminError, factoryError, logisticsError]);

  // success handling
  useEffect(() => {
    const datas = [
      warehouseData,
      saleData,
      adminData,
      factoryData,
      logisticsData,
    ];
    const anyData = datas.some((data) => data !== null);
    if (anyData) {
      navigate('../');
    }
  }, [warehouseData, saleData, adminData, factoryData, logisticsData]);

  return (
    <div className="flex items-center min-h-screen p-6 bg-[#1B222C]">
      <div className="flex-1 h-full ">
        <div className="flex flex-col justify-center items-center">
          <main className="flex items-center justify-center p-6 w-[800px]  rounded-lg shadow-xl bg-[#23303F]">
            <div className="w-full">
              <div>{welcomText()}</div>
              <h1 className="mb-4 text-xl font-mons text-white">Login</h1>
              <label>
                <span className="font-mons  text-white">Email</span>
                <input
                  className="mt-1 font-mons flex px-5 py-2 bg-[#1B222C] border border-[#1B222C] focus:outline-none rounded-md w-full  shadow  font-semibold  text-white"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="john@doe.com"
                />
              </label>

              <label className="mt-4 block">
                <span className="font-mons  text-white">Password</span>
                <div className="relative">
                  <input
                    className="mt-1 font-mons flex px-5 py-2 border  border-[#1B222C]  focus:outline-none rounded-md w-full  shadow  font-semibold  bg-[#1B222C]  text-white"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                  />
                </div>
              </label>

              <button
                className=" bg-yellow-400 text-gray-800 w-full rounded-md shadow px-5 py-2 font-mons font-bold focus:outline-none inline-block mt-10  text-black"
                onClick={() => Login()}
                disabled={
                  warehouseLoading ||
                  saleLoading ||
                  adminLoading ||
                  factoryLoading ||
                  logisticsLoading
                }
              >
                {warehouseLoading ||
                saleLoading ||
                adminLoading ||
                factoryLoading ||
                logisticsLoading ? (
                  <> Requesting... </>
                ) : (
                  <> Log in</>
                )}
              </button>
            </div>
          </main>
        </div>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
    </div>
  );
}

export default Login;
