import { HttpClient } from '@angular/common/http';
import { ClrAutocompleteItem } from '../autocomplete-result/clr-autocomplete.item';
import { ScQueryHelpers } from '../../helpers/qeuery-helpers';
import { ScAutocompleteModel } from './sc-autocomplete.model';

export class HttpAutocompleteModel<T> extends ScAutocompleteModel<T> {
  private _requestMade = false;

  constructor(private _httpClient: HttpClient, private _url: string, private _isLazy = false,
              _displaySelector: ((T1: T) => string) = ((T1) => T1.toString())) {
    super([], _displaySelector);
    this.ready = false;
    if (!_isLazy) {
      this.getModel();
    }
  }

  async query(searchParam: string): Promise<Array<ClrAutocompleteItem<T>>> {
    if (!this.ready) {
      await this.getModel();
    }
    return ScQueryHelpers.queryModel<T>(this, searchParam);
  }

  private async getModel(): Promise<void> {
    if (!this.ready && !this._requestMade) {
      this._requestMade = true;
      this._httpClient.get<Array<T>>(this._url).subscribe(result => {
        this._model = result;
        this.ready = true;
        this.onReadyChanged.emit(true);
        return new Promise(resolve => {
          resolve();
        });
      });
    } else {
      return new Promise(resolve => {
        resolve();
      });
    }
  }
}
