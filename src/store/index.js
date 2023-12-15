import { configureStore } from '@reduxjs/toolkit';
import adminLoginSlice from './slices/Admin/adminLoginSlice';
import saleLoginSlice from './slices/Sale/saleLoginSlice';
import warehouseLoginSlice from './slices/Warehouse/warehouseLoginSlice';
import logisticsLoginSlice from './slices/Logistics/logisticsLoginSlice';
import factoryLoginSlice from './slices/Factory/factoryLoginSlice';
import createTruckSlice from './slices/Logistics/createTruckSlice';
import truckListSlice from './slices/Logistics/truckListSlice';
import createCustomerSlice from './slices/Sale/createCustomerSlice';
import customersListSlice from './slices/Sale/customersListSlice';
import createOrderSlice from './slices/Sale/createOrderSlice';
import pendingOrdersListSlice from './slices/Sale/pendingOrdersListSlice';
import instocksListSlice from './slices/Sale/instocksListSlice';
import addProductsToOrderSlice from './slices/Sale/addProductsToOrderSlice';
import orderProcessConfirmSlice from './slices/Sale/orderProcessConfirmSlice';
import processingOrdersListSlice from './slices/Sale/processingOrdersListSlice';
import createDeliRouteSlice from './slices/Logistics/createDeliRouteSlice';
import createRequestRawSlice from './slices/Sale/requestRawSlice';
import deliRoutesSlice from './slices/Logistics/deliRoutesSlice';

//
import rawMaterialsListSlice from './slices/Factory/rawMaterialsListSlice';
import createRawMaterialsSlice from './slices/Factory/createRawMaterialsSlice';
import requestedMaterialsListSlice from './slices/Factory/requestedMaterialsListSlice';
import createRequestedMaterialSlice from './slices/Factory/createRequestedMaterialSlice';
import requestedProductsSlice from './slices/Factory/requestedProductsSlice';
import productIncreaseSlice from './slices/Warehouse/productIncreaseSlice';
import productDecreaseSlice from './slices/Warehouse/productDecreaseSlice';
import productsListSlice from './slices/Warehouse/productsListSlice';
import addStockSlice from './slices/Warehouse/addStockSlice';
import deleteStockSlice from './slices/Warehouse/deleteStockSlice';

export const store = configureStore({
  reducer: {
    //Logins
    saleLogin: saleLoginSlice,
    warehouseLogin: warehouseLoginSlice,
    logisticsLogin: logisticsLoginSlice,
    adminLogin: adminLoginSlice,
    factoryLogin: factoryLoginSlice,

    //Logistics
    createTruck: createTruckSlice,
    truckList: truckListSlice,
    createDeliRoute: createDeliRouteSlice,
    createRequestRaw: createRequestRawSlice,
    deliRoutes: deliRoutesSlice,

    //Sales
    createCustomer: createCustomerSlice,
    customersList: customersListSlice,
    createOrder: createOrderSlice,
    pendingOrdersList: pendingOrdersListSlice,
    instocksList: instocksListSlice,
    addProductsToOrder: addProductsToOrderSlice,
    orderProcessConfirm: orderProcessConfirmSlice,
    processingOrdersList: processingOrdersListSlice,

    //Factory
    rawMaterialsList: rawMaterialsListSlice,
    createRawMaterials: createRawMaterialsSlice,
    requestedMaterialsList: requestedMaterialsListSlice,
    createRequestedMaterial: createRequestedMaterialSlice,
    requestedProducts: requestedProductsSlice,

    //Warehouse
    productIncrease: productIncreaseSlice,
    productDecrease: productDecreaseSlice,
    productsList: productsListSlice,
    addStock: addStockSlice,
    removeStock: deleteStockSlice,
    //Admin
  },
});
