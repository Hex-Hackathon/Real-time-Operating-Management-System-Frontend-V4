import { CubeIcon, PaperPlaneIcon, PersonIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import DashboardCard from '../../components/admin/DashboardCard';
import DateInput from '../../components/admin/DateInput';
import OrderStatusAnalysis from '../../components/admin/OrderStatusAnalysis';
import useDateInput from '../../hooks/useDateInput';
import { apiBaseUrl } from '../../utils';
import { db } from '../../realtime/firebase_init';
//firebase
import { ref, onValue } from 'firebase/database';

const title = {
  customers: 'Total Customers',
  orders: 'Total Orders',
  deliveringTrucks: 'Total Delivering Trucks',
};
const icons = {
  customers: <PersonIcon width={20} height={20} />,
  deliveringTrucks: <PaperPlaneIcon width={20} height={20} />,
  orders: <CubeIcon width={20} height={20} />,
};

const currentDate = new Date();

async function getOverallData(date) {
  const res = await fetch(`${apiBaseUrl}/admin-overall-data?date=${date}`);
  return await res.json();
}

async function getAnalysis(period) {
  const res = await fetch(`${apiBaseUrl}/order-analysis?period=${period}`);
  return await res.json();
}

function extractAnalysisCount(analysis) {
  const analysisData = [];
  console.log({ analysis });
  analysis.forEach((item) => {
    if (!item || !item?.order_status) {
      return;
    }
    analysisData.push(item.count);
  });
  return analysisData;
}

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState([]);
  const [period, setPeriod] = useState('weekly');

  const onPeriodChange = async (newPeriod) => {
    if (newPeriod === period) {
      return;
    }
    setPeriod(newPeriod);

    const response = await getAnalysis(newPeriod);
    const result = extractAnalysisCount(response);
    setAnalysis(result);

    return result;
  };

  const [isEvent, setIsEvent] = useState();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getAnalysis('weekly').then((res) => {
        const analysisData = extractAnalysisCount(res);
        setAnalysis(analysisData);
      });
    }
    const newRawRequestEventRef = ref(db, '/NewRawRequestEvent/');
    onValue(newRawRequestEventRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setIsEvent(data);
      if (isEvent) alert('There is an stock request from sales');
    });

    return () => {
      isMounted = false;
    };
  }, [isEvent]);

  const { handleDateChange, selectedDate, inputDateString } = useDateInput({
    hook: fetchAndSetDataWith,
  });

  async function fetchAndSetDataWith(dateString) {
    const result = await getOverallData(dateString);
    setData(result);
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchAndSetDataWith(currentDate);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div className="flex justify-end items-center mb-3">
        <div>
          <DateInput
            handleDateChange={handleDateChange}
            inputDateString={inputDateString}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        {!data
          ? 'no data'
          : data.map((item) => (
              <DashboardCard
                key={item.name}
                icon={icons[item.name]}
                title={`${title[item.name]} (${getLongMonth(selectedDate)})`}
                count={item.count}
              />
            ))}
      </div>

      <div>
        <OrderStatusAnalysis
          key={analysis}
          data={analysis}
          period={period}
          onPeriodChange={onPeriodChange}
        />
      </div>
    </div>
  );
};

function getLongMonth(date) {
  return date.toLocaleDateString('en-Us', {
    month: 'long',
  });
}

export default AdminDashboard;
