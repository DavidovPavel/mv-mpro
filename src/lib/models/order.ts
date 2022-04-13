import { List } from './list';

export interface Order {
  orderId: number;
  customerId: number;
  emissionId: number;
  imageId: number;
  orderStatus: number;
  paymentDate: string;
  discount: number;
  deliveryMethod: number;
  validPeriodStartDate: string;
  archiveSize: number;
  nominal: number;
  quantity: number;
  generatedQuantity: number;

  dt: string;
  customerName: string;
  emissionName: string;

  activated: boolean;
  activationDate: string;
  blocked: boolean;
}

export interface OrderList extends List {
  items: Order[];
}
