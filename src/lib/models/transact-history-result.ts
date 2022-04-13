import { List } from './list';
import { TransactHistory } from './transact-history';


export interface TransactHistoryResult extends List {
  historyShort: boolean;
  searchResult: TransactHistory[];
}
