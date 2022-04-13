export enum CardType {
  'TYPE_UNSPECIFIED',
  'TYPE_FIXED',
  'TYPE_FLEXIBLE',
  'TYPE_VIRTUAL',
  'TYPE_PROMO',
  'TYPE_VIP',
}

export const CardTypeName: string[] = [
  'тип не указан',
  'фиксированный номинал (ПК, КПК)',
  'гибкий номинал (ПК, КПК)',
  'ВПС',
  'промокоды',
  'VIP карты',
];
