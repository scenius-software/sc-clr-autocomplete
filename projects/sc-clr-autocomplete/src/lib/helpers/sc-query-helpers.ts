import { ScAutocompleteModel } from '../model/autocomplete-model/sc-autocomplete.model';
import { ClrAutocompleteItem } from '../model/autocomplete-result/clr-autocomplete.item';

export class ScQueryHelpers {
  static queryModel<T>(model: ScAutocompleteModel<any>, queryTerm: string): Array<ClrAutocompleteItem<T>> {
    const searchExp = queryTerm.length > 0 ? new RegExp('^(.*)(' + ScQueryHelpers.escape(queryTerm) + ')(.*)$', 'i')
      : new RegExp('^(.*)$', 'i');
    return model.model.map(x => {
      const match = searchExp.exec(model.displaySelector(x));
      const item: ClrAutocompleteItem<any> = {
        data: x,
        displayData: model.displaySelector(x),
        preString: match && match[1] ? match[1] : '',
        searchMatch: match && match[2] ? match[2] : '',
        postMatchString: match && match[3] ? match[3] : '',
        match: match !== null
      };
      return item;
    }).filter(x => x.match === true);
  }

  /**
   * Let's not have the user input any values that could be parsed as regex structures.
   * @param val input to sanitize.
   */
  private static escape(val: string): string {
    const escapeExp = new RegExp('[.*+?^${}()|[\\]\\\\]', 'g');
    return val.replace(escapeExp, '\\$&'); // $& means the whole matched string
  }
}
