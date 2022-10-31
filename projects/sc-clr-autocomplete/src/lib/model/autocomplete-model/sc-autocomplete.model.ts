import { EventEmitter } from '@angular/core';
import { ClrAutocompleteItem } from '../autocomplete-result/clr-autocomplete.item';

export abstract class ScAutocompleteModel<T> {
  public get ready() {
    return this._ready;
  }

  public set ready(value: boolean) {
    if (this._ready !== value) {
      this._ready = value;
      this.onReadyChanged.emit(value);
    }
  }

  public get model() {
    return this._model;
  }

  public onReadyChanged = new EventEmitter<boolean>();
  /**
   * Debounce timer that determines the delay between the last keystroke on the input
   * and the start of retrieval and querying of the dataset.
   */
  public debounceTimer = 0;
  private _ready = false;

  protected constructor(protected _model: Array<T>, public displaySelector: ((T1: T) => string) = ((T1) => T1.toString())) {}

  abstract query(searchParam: string): Promise<Array<ClrAutocompleteItem<T>>>;
}

