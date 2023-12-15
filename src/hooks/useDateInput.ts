import { ChangeEvent, useState } from 'react';

type Props = {
  hook: (dateString: string) => Promise<void>;
};

const currentDate = new Date();

const useDateInput = (props?: Props) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [inputDateString, setInputDateString] = useState(
    currentDate.toISOString().slice(0, 10),
  );

  const handleDateChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputDateString(e.target.value);

    const dateObj = new Date(e.target.value);
    setSelectedDate(dateObj);

    if (!!props?.hook) {
      await props.hook(dateObj.toISOString());
    }
  };

  return { selectedDate, inputDateString, handleDateChange };
};

export default useDateInput;