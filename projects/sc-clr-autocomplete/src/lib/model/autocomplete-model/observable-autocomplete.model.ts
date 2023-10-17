import { Observable } from 'rxjs';
import { ScAutocompleteModel } from './sc-autocomplete.model';
import { ClrAutocompleteItem } from '../autocomplete-result/clr-autocomplete.item';
import { ScQueryHelpers } from '../../helpers/sc-query-helpers';

export class ObservableAutocompleteModel<T> extends ScAutocompleteModel<T> {
  constructor(private _observable: Observable<Array<T>>, _displaySelector: ((T1: T) => string) = ((T1) => T1.toString())) {
    super([], _displaySelector);
    _observable.subscribe(result => {
      this._model = result;
      this.ready = true;
      this.onReadyChanged.emit(true);
    });
  }

  async query(searchParam: string): Promise<Array<ClrAutocompleteItem<T>>> {
    return new Promise(resolve => {
      resolve(ScQueryHelpers.queryModel<T>(this, searchParam));
    });
  }
}
