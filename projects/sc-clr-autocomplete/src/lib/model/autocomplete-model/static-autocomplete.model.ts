import { ScAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/sc-autocomplete.model';
import { ClrAutocompleteItem } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-result/clr-autocomplete.item';
import { ScQueryHelpers } from 'projects/sc-clr-autocomplete/src/lib/helpers/qeuery-helpers';

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
