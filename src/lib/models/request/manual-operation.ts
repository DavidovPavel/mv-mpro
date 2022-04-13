export interface CodeModel {
  code: string;
}

export interface ManualOperationModel {
  items: CodeModel[];
  comment: string;
  balance?: number;
  orderNumber?: number;
  count?: number;
  discount?: number;
  activationDiscount?: number;
  status?: number;
  blocked?: 0 | 1;
  used?: boolean;
  prolongated?: boolean;
  notes?: string;
  dateFrom?: string;
  dateTo?: string;
  dateFromA?: string;
  dateToA?: string;
  poolName?: string;
  wareCode?: string;
  goodsGroupCode?: string;
  brandCode?: string;
  goodsCode?: string;
  objectCode?: string;
}
