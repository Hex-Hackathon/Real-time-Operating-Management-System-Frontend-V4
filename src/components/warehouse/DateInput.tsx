import { ChangeEventHandler } from 'react';

type Props = {
  inputDateString: string;
  handleDateChange: ChangeEventHandler<HTMLInputElement>;
};

const DateInput = ({ handleDateChange, inputDateString }: Props) => {
  return (
    <div className="relative">
      <input
        type="date"
        className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        value={inputDateString}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateInput;