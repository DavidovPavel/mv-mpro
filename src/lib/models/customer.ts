
export enum CustomerType {
  '',
  'Агент',
  'Клиент'
}

export interface Customer {
  customerID: number;
  shortCompanyName: number;
  inn: string;
  customerType: 1 | 2;
}
