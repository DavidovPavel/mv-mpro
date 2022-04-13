export interface Contractor {
  customerId: number;
  status: 1 | 0;
  type: 1 | 2;

  fullCompanyName: string;
  shortCompanyName: string;
  inn: string;
  kpp: string;
  ogrn: string;
  legalAddress: string;
  locationAddress: string;

  directorName: string;
  document: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;

  bankName: string;
  bankAddress: string;
  rs: string;
  ks: string;
  bik: string;

  overdraft: number;
  balance: number;
  balanceForCards: number;
  customerDiscount: number;
  customerDiscountForCards: number;

  notes: string;
}

export interface ContractorEditModel extends Contractor {
  operations: string[];
  operationsForCards: string[];
}
