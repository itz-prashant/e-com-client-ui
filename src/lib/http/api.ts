import axios from "axios";
import { CouponCode, Orderdata } from "../types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const ORDER_SERVICE_PREFIX = `/api/order`;

export const getCustomer = () => api.get(`${ORDER_SERVICE_PREFIX}/customer`);
export const addAddresses = (id:string, addresses:string)=> api.patch(`${ORDER_SERVICE_PREFIX}/customer/addresses/${id}`,{addresses})

export const verifyCoupon = (data:CouponCode)=> api.post(`${ORDER_SERVICE_PREFIX}/coupons/verify`,{data})
export const createOder = (data:Orderdata, idemPotencyKey:string)=> api.post(`${ORDER_SERVICE_PREFIX}/orders`,data, {
  headers:{
    "Idempotency-Key" : idemPotencyKey
  }
})

export const getSingleOrder = (orderId:string)=>api.get(`${ORDER_SERVICE_PREFIX}/orders/${orderId}?fields=orderStatus`)