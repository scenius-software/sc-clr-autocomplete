import { ScAutocompleteModel } from './sc-autocomplete.model';
import { ScQueryHelpers } from '../../helpers/qeuery-helpers';
import { ClrAutocompleteItem } from '../autocomplete-result/clr-autocomplete.item';

export class StaticAutocompleteModel<T> extends ScAutocompleteModel<T> {

  constructor(model: Array<T>,
              _displaySelector: ((T1: T) => string) = ((T1) => T1.toString())) {
    super(model, _displaySelector);
    this.ready = true;
  }

  async query(searchParam: string): Promise<Array<ClrAutocompleteItem<T>>> {
    return new Promise(resolve => {
      resolve(ScQueryHelpers.queryModel<T>(this, searchParam));
    });
  }
}
