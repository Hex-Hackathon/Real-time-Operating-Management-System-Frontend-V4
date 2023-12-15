import React from 'react';

const PreordersDetails = () => {
  const fakeProducts = [
    { productName: 'Widget A', quantity: 3 },
    { productName: 'Gizmo B', quantity: 5 },
    { productName: 'Doodad C', quantity: 2 },
    { productName: 'Thingamajig D', quantity: 7 },
    { productName: 'Whatchamacallit E', quantity: 1 },
    { productName: 'Contraption F', quantity: 4 },
    { productName: 'Gadget G', quantity: 6 },
    { productName: 'Doohickey H', quantity: 2 },
    { productName: 'Gizmo I', quantity: 8 },
    { productName: 'Widget J', quantity: 3 },
    { productName: 'Thingamabob K', quantity: 5 },
    { productName: 'Doodad L', quantity: 2 },
    { productName: 'Contraption M', quantity: 6 },
    { productName: 'Gadget N', quantity: 4 },
    { productName: 'Whatchamacallit O', quantity: 1 },
    { productName: 'Doohickey P', quantity: 7 },
    { productName: 'Thingamajig Q', quantity: 3 },
    { productName: 'Widget R', quantity: 5 },
    { productName: 'Gizmo S', quantity: 2 },
    { productName: 'Doodad T', quantity: 4 },
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Product Lists
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-4 hidden items-center sm:flex">
          <p className="font-medium  text-black dark:text-white">Products</p>
        </div>

        <div className="col-span-4 flex items-center">
          <p className="font-medium text-black dark:text-white">Quantity</p>
        </div>
      </div>

      <div>
        {fakeProducts?.map((p, i) => (
          <>
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={i}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center col-span-4 ">
                <p className="text-sm text-black dark:text-white">
                  {p?.productName}
                </p>
              </div>

              <div className="col-span-4 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {p?.quantity}
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default PreordersDetails;
