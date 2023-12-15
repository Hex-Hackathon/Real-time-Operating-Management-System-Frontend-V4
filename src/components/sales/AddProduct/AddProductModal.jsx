import React, { useState, useEffect } from 'react';
import { Flex, Button, Grid, Box, Container } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import './style.css';

import check from '../../../assets/logo/check.svg';
import toast from 'react-hot-toast';

import { handleAddProductsToOrder } from '../../../store/slices/Sale/addProductsToOrderSlice';
import { handleOrderProcessConfirm } from '../../../store/slices/Sale/orderProcessConfirmSlice';

import { useDispatch, useSelector } from 'react-redux';

const AddProduct = ({ orderId }) => {
  const dispatch = useDispatch();
  const {
    instocksList,
    loading: l1,
    error: e1,
  } = useSelector((state) => state.instocksList);

  const [newDataArray, setNewDataArray] = useState([]);

  useEffect(() => {
    if (instocksList) {
    }
    setNewDataArray(() => {
      return instocksList?.map((item) => ({ ...item, quantity: 0 }));
    });
  }, [instocksList]);

  console.log(newDataArray, instocksList);
  // Function to update the count later
  const updateCount = (name, newCount) => {
    // Find the index of the object with the given name
    const index = newDataArray.findIndex((item) => item.product_name == name);

    // If the name is found, update the count
    if (index !== -1) {
      const updatedArray = [...newDataArray];
      updatedArray[index] = { ...updatedArray[index], quantity: +newCount };
      setNewDataArray(updatedArray);
    }
  };

  //add product to the order
  const addProductToOrder = async (itemquantity, item_id, orderId) => {
    const data = {
      order_id: orderId,
      product_id: item_id,
      product_count: itemquantity,
    };
    dispatch(handleAddProductsToOrder(data));
  };

  const confirmtheOrder = () => {
    const data = {
      order_id: orderId,
    };
    dispatch(handleOrderProcessConfirm(data)).then((result) => {
      if (result.payload) {
        location.reload();
      }
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <p className="text-sm  border border-yellow-500 text-yellow-500 rounded py-1 px-2 cursor-pointer">
          Add Product
        </p>
      </Dialog.Trigger>
      <Dialog.Portal className="pointer-events-none">
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContentAddProduct no-scrollbar overflow-y-auto">
          <Dialog.Title className="DialogTitle text-white">
            Add products to's order
            {/* {orderId.customerName} */}
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Include items in the customer's order and select "proceed" to
            initiate the pre-order processing.
          </Dialog.Description>

          <Container size="1">
            <Grid columns="2" className="flex gap-4">
              <Box className="border p-5" width="auto">
                <p className="text-xl font-mons text-white text-center w-full">
                  Stock Data
                </p>
                <div className="flex gap-5 items-center border-b border-b-[#64748b] text-white font-mons py-3">
                  <span className="w-1/2 ">Product Name</span>
                  <span className="w-1/2">Product Quantity</span>
                </div>
                {instocksList &&
                  instocksList?.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-5 items-center border-b border-b-[#64748b] text-white font-mons py-3"
                    >
                      <span className="w-1/2 ">{item.product_name}</span>
                      <span className="w-1/2">{item.in_stock_count}</span>
                    </div>
                  ))}
           
              </Box>
              <Box height="9" className="border p-5" width="auto">
                <p className="text-xl font-mons text-white text-center w-full">
                  Customer's Order
                </p>
                <div className="flex gap-5 items-center border-b border-b-[#64748b] text-white font-mons py-3">
                  <span className="w-1/2 ">Product Name</span>
                  <span className="w-1/2">Product Quantity</span>
                </div>
                {newDataArray &&
                  newDataArray?.map((item, index) => (
                    <div className="flex justify-between items-center">
                      <div
                        key={item._id}
                        className="flex gap-5 items-center border-b border-b-[#64748b] text-white font-mons  w-[90%]"
                      >
                        <span className="w-1/2 ">{item.product_name}</span>
                        <input
                          // className="increaseArrow"
                          placeholder="Enter QTY"
                          type="number"
                          value={+item.quantity}
                          onChange={(e) => {
                            console.log(
                              e.target.value,
                              instocksList[index].in_stock_count,
                            );
                            if (
                              +e.target.value >
                              instocksList[index].in_stock_count
                            ) {
                              alert(
                                `Entered amount cannot be larger than the initial count for ${item.product_name}`,
                              );
                            } else {
                              updateCount(item.product_name, e.target.value);
                            }
                          }}
                          className="bg-[#202732] focus:outline-none border-none text-white px-2 py-3 w-1/2 "
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (item.quantity !== 0) {
                            console.log(
                              `Product: ${item.product_name}, Quantity: ${item.quantity}`,
                            );
                            addProductToOrder(item.quantity, item._id, orderId);
                          }
                        }}
                        className={`border rounded-full cursor-pointer  border-yellow-500 p-1 hover:bg-[#1B222C] disabled:bg-transparent ${
                          !item.quantity ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!item.quantity}
                      >
                        <img
                          src={check}
                          alt="check"
                          className="w-[13px] h-[13px]"
                        />
                      </button>
                    </div>
                  ))}
              </Box>
            </Grid>
          </Container>

          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button className=" mt-5 py-2 px-5 border border-white text-white rounded shadow font-mons font-bold mr-5">
                Cancel
              </button>
            </Dialog.Close>

            <button
              onClick={confirmtheOrder}
              className=" mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black"
            >
              Proceed
            </button>
          </div>
          <Dialog.Close asChild></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddProduct;
