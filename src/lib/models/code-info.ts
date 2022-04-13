import { CardType } from "./card-type";

export interface CodeInfo {
  code: string;
  id: string;
  balance: number;
  status: number;
  type: CardType;
  wareCode: string;
  dateFromA: string;
  dateToA: string;
  dateFrom: string;
  dateTo: string;
  poolName: string;
  orderNumber: number;
  notes: string;
  blocked: 1 | 2;
  used: boolean;
  count: number;
  authorizationDate: string;
  authorizationShop: string;
  authorizationBalance: number;
  instTypeCode: number;
  isArchive: boolean;
  prolongated: boolean;
  errorMessage: string;
}
