import React, { useEffect } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Flex, Button, Grid, Box, Container } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';

import './style.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetRawMaterialsList } from '../../store/slices/Factory/rawMaterialsListSlice';
import { handleCreateRawMaterials } from '../../store/slices/Factory/createRawMaterialsSlice';

const RawMaterials = () => {
  const dispatch = useDispatch()
  const {createdRawMaterial , loading: loadingForCreating} = useSelector(state => state.createRawMaterials)
  const {rawMaterialsList, loading, error} = useSelector(state => state.rawMaterialsList)

  useEffect(() => {
    dispatch(handleGetRawMaterialsList())
  }, [createdRawMaterial])
  
  const [newRawMaterial, setNewRawMaterial] = useState({raw_material_name: "", in_stock_count: ""})
  
  const [materialName, setMaterialName] = useState('')
  const [materialBudget, setMaterialBudget] = useState('')
  const [materialQuantity, setMaterialQuantity] = useState('')
  
  return (
    <div>
      <div className="w-full flex justify-end gap-5">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="mb-8 mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black">
              Add Raw Materials
            </button>
          </Dialog.Trigger>
          <Dialog.Portal className="pointer-events-none">
            <Dialog.Overlay
              className="DialogOverlay"
              onClick={(e) => e.stopPropagation()}
            />
            <Dialog.Content className="DialogContent w-[600px]">
              <Dialog.Title className="DialogTitle text-white pb-1 text-xl text-center">
                Add New Raw Materials
              </Dialog.Title>

              <Container size="1">
                <Grid className="flex gap-4">
                  <form>
                    <div className="px-6.5 pt-6.5">
                      <div className="mb-4.5">
                        <input
                          type="text"
                          placeholder="Enter Material Name"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  text-white"
                          
                          onChange={(e) => setNewRawMaterial({...newRawMaterial,  raw_material_name: e.target.value})}
                        />
                      </div>
                      <div className="mb-4.5">
                        <input
                          type="number"
                          placeholder="Enter Material Quantity"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  text-white"
                          onChange={(e) => setNewRawMaterial({...newRawMaterial, in_stock_count: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                  </form>
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

                <Dialog.Close asChild>
                  <button disabled={!newRawMaterial.raw_material_name || !newRawMaterial.in_stock_count || loadingForCreating}
                   onClick={() => {dispatch(handleCreateRawMaterials(newRawMaterial)); 
                   setNewRawMaterial({raw_material_name: "", in_stock_count: ""})}} className=" mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black">
                 {loadingForCreating ? <>Adding...</> : <>Add</>}   
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Close asChild></Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Raw Material Lists
          </h4>
        </div>

        <div className="grid grid-cols-9 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-start-1 col-end-4 flex items-center">
            <p className="font-medium">Material Name</p>
          </div>
          <div className="col-start-5 col-end-6 flex justify-center">
            <p className="font-medium">Quantity</p>
          </div>
          <div className="col-start-7 col-end-9 flex justify-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {rawMaterialsList.map((material) => (
          <div
            key={material._id}
            className="grid grid-cols-3 justify-between border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          >
            <div className="col-start-1 col-end-4 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-black dark:text-white">
                  {material.raw_material_name}
                </p>
              </div>
            </div>
            <div className="col-start-5 col-end-6 flex justify-center">
              <p className="text-sm text-black dark:text-white">
                {material.in_stock_count}
              </p>
            </div>
            <div className="col-start-7 col-end-9 flex justify-center">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <p className="text-sm text-gray-200 me-2"><button className="hover:text-blue-500">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="feather feather-edit"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
              </p>
                </Dialog.Trigger>
                <Dialog.Portal className="pointer-events-none">
                  <Dialog.Overlay
                    className="DialogOverlay"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Dialog.Content className="DialogContent w-[600px]">
                    <Dialog.Title className="DialogTitle text-white pb-1 text-xl text-center">
                      Edit Raw Materials
                    </Dialog.Title>

                    <Container size="1">
                      <Grid className="flex gap-4">
                        <form>
                          <div className="px-6.5 pt-6.5">
                            <div className="mb-4.5">
                              <input
                                type="text"
                                placeholder="Enter Material Name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  text-white"                              
                                defaultValue={material.raw_material_name}
                              />
                            </div>
                            <div className="mb-4.5">
                              <input
                                type="text"
                                placeholder="Enter Material Quantity"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  text-white"
                                defaultValue={material.in_stock_count}
                              />
                            </div>
                          </div>
                        </form>
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

                      <button className=" mt-5 py-2 px-5 bg-yellow-500 rounded shadow font-mons font-bold text-black">
                     Edit
                      </button>
                    </div>
                    <Dialog.Close asChild></Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              
              <p className="text-sm text-gray-400"><button className="hover:text-red-500">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                        fill=""
                      />
                      <path
                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                        fill=""
                      />
                      <path
                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                        fill=""
                      />
                      <path
                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                        fill=""
                      />
                    </svg>
                  </button></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RawMaterials;
