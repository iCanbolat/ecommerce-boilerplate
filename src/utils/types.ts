export enum ProductStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
}

export enum OrderStatus {
  fulfilled,
  shipped,
  awaiting_shipment,
}

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
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  image: string;
  title: string;
  status: ProductStatus;
  price: number;
  totalSale: number;
  createdAt: Date;
}
