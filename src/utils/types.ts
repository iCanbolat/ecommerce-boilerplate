import { OrderStatus, ProductStatus, UserRoleStatus } from '@prisma/client';

export interface APIResponseType<T> {
  success: boolean;
  data?: T;
  errors?: any;
  message?: string;
}

export enum OptimisticUpdateTypes {
  ADD,
  DELETE,
  UPDATE,
}

//export enum ProductStatus {
//  DRAFT = 'DRAFT',
//  ACTIVE = 'ACTIVE',
//}

//export enum OrderStatus {
//  fulfilled,
//  shipped,
//  awaiting_shipment,
//}

//export enum UserRoleStatus {
//  ADMIN = "ADMIN",
//  CUSTOMER = "CUSTOMER"
//}
export interface IOrder {
  id: number;
  productTitle: string;
  amount: number;
  userName: string;
  status: OrderStatus;
  createdAt: Date;
  isPaid: boolean;
  shippingAddress: string;
}

export interface IUser {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  password: string | null;
  image: string | null;
  role: UserRoleStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  id: string;
  image: string;
  title: string;
  status: ProductStatus;
  price: number;
  totalSale: number;
  createdAt: Date;
}
