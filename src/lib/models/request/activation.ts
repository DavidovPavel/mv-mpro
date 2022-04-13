export interface ActivationItem {
  code: string;
  amount: number;
  customerId: number;
  activationDiscount: number;
}

export interface ActivationModel {
  comment: string;
  items: ActivationItem[];
}
