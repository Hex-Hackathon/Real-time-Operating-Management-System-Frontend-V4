import React from 'react';
import { Link } from 'react-router-dom';

const Root = () => {
  return (
    <div className="w-full min-h-screen bg-[#1B222C] flex flex-col justify-center items-center ">
      <h1 className="text-white font-bold text-5xl  font-mons">FlavorWave</h1>
      <p className="text-[#ffffffa5] font-mono mt-3">
        Real-time Operating Management System
      </p>

      <div className="flex flex-wrap w-full px-5 lg:px-20 gap-5 mt-20 justify-center items-center">
        <Link
          to={'/sales'}
          className="bg-[#23303F] rounded-lg shadow-lg p-5 text-white font-mono text-lg hover:bg-[#1C2434]"
        >
          Sales Department
        </Link>
        <Link
          className="bg-[#23303F] rounded-lg shadow-lg p-5 text-white font-mono text-lg hover:bg-[#1C2434]"
          to={'/warehouse'}
        >
          Warehouse Department
        </Link>
        <Link
          className="bg-[#23303F] rounded-lg shadow-lg p-5 text-white font-mono text-lg hover:bg-[#1C2434]"
          to={'/logistics'}
        >
          Logistics Department
        </Link>
        <Link
          className="bg-[#23303F] rounded-lg shadow-lg p-5 text-white font-mono text-lg hover:bg-[#1C2434]"
          to={'/admin'}
        >
          Admin Department
        </Link>
        <Link
          className="bg-[#23303F] rounded-lg shadow-lg p-5 text-white font-mono text-lg hover:bg-[#1C2434]"
          to={'/factory'}
        >
          Factory Department
        </Link>
      </div>
    </div>
  );
};

export default Root;
