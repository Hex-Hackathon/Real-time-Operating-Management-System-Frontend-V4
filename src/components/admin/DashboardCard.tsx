type Props = {
  icon: string;
  title: string;
  count: number;
};

export default function DashboardCard({ icon, title, count }: Props) {
  return (
    <div className="w-full rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {icon}
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-primary dark:text-white">
            {count}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
}
