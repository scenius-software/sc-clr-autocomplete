import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy } from '@angular/core';
import { ScAutocompleteModel } from '../../model/autocomplete-model/sc-autocomplete.model';
import { ClrAutocompleteItem } from '../../model/autocomplete-result/clr-autocomplete.item';

@Component({
  selector: 'sc-clr-popover',
  templateUrl: './sc-clr-autocomplete-popover.component.html',
  styleUrls: ['./sc-clr-autocomplete-popover.component.scss']
})
export class ScClrAutocompletePopoverComponent<T> implements AfterViewChecked, OnDestroy {
  /**
   * Update the current search term & perform a query on the backing auto-complete model.
   * @param value The term to query for.
   */
  @Input() set searchTerm(value: string) {
    this._searchTerm = value;
    this.updateSearch();
  }

  /**
   * Set the current auto-complete model. Setting this property will also re-issue the current query if one is present.
   * @param value A new auto-complete model to use.
   */
  @Input() set autocompleteModel(value: ScAutocompleteModel<T>) {
    if (this._autocompleteModel) {
      this._autocompleteModel.onReadyChanged.unsubscribe();
    }
    this._autocompleteModel = value;
    this.busyLoading = !value.ready;
    this._autocompleteModel.onReadyChanged.subscribe(ready => {
      this.busyLoading = !ready;
      this.updateSearch();
    });
    this.updateSearch();
  }

  /**
   * Set the parent clr-input component of this pop-over. This reference will be used to calculate
   * the position and dimension of the pop-over.
   * @param value Element Reference to our clr-input.
   */
  set parentComponent(value: ElementRef) {
    if (this._parentComponent !== value) {
      this._parentComponent = value;
    }
  }

  resolveToElementInList = true;
  /** Event that will be fired whenever the auto-complete pop-over is closed. */
  closed = new EventEmitter<void>();

  /** Event fired whenever the selected value auto-complete box changes. */
  valueUpdated = new EventEmitter<ClrAutocompleteItem<T>>();
  /** The results of the last query. */
  searchResults: Array<ClrAutocompleteItem<T>> = [];
  /** The width of the pop-over. */
  popoverWidth = 0;
  /** The amount of pixels this popover is positioned from the left of the screen. */
  popoverOffsetLeft = 0;
  /** The amount of pixels this popover is positioned from the top of the screen. */
  popoverOffsetTop = 0;
  /**
   * Indicates whether or not the pop-over is able to display the results of the search-query.
   * When set to true, the pop-over will display a loading spinner.
   */
  busyLoading = true;
  /** The current search term */
  private _searchTerm = '';
  /** The current auto-complete model. This dictates the list that gets shown to users, the way it is retrieved & the way it is queried. */
  private _autocompleteModel: ScAutocompleteModel<T>;
  /** The parent component of the popover. This parent component will be the target of the auto-complete box. */
  private _parentComponent: ElementRef;
  /** Keeps track of whether the last click was made inside the pop-over. */
  private _clickInside = false;

  /** Indicates if the auto-complete component has finished all internal set-up tasks and is ready to be used. */
  private _ready = false;
  private _destroyed = false;

  /** @param _selfReference Reference to ourselves. */
  constructor(private _selfReference: ElementRef, private _changeDetector: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    // In order to prevent immediately closing the popover, set the component to ready after a short delay.
    setTimeout(() => {
      this._ready = true;
      this.reflowPopover();
    }, 10);
  }

  @HostListener('click', ['$event.target']) onClick(event) {
    if (!this._selfReference.nativeElement.contains(event.target)) {
      this._clickInside = true;
    }
  }

  @HostListener('document:click') clickOut(apiClose = false) {
    if (!this._ready) {
      return;
    }
    if (!this._clickInside) {
      if (this.resolveToElementInList && !apiClose) {
        // If we're supposed to always return a result from the list
        // get the closest one.
        this.resolveResult();
      }
      this.closed.emit();
      this._selfReference.nativeElement.remove();
    }
    this._clickInside = false;
  }

  /**
   * Whenever the user resizes the page, recalculate the position & dimension of the pop-over.
   */
  @HostListener('window:resize')
  onResize() {
    this.reflowPopover();
  }

  /** Click one of the results in the pop-over. Then close the pop-over
   * @param item value of the result clicked.
   */
  clickItem(item: ClrAutocompleteItem<T>) {
    this.valueUpdated.emit(item);

    // Close the popover
    setTimeout(() => this.clickOut(true), 10);
  }

  /**
   * Query the model and render the results
   */
  async updateSearch() {
    this.searchResults = await this._autocompleteModel.query(this._searchTerm);
  }

  /**
   * Clamp the search input to the nearest result, or blank if there is no match. This functionality is used to
   * recreate a input element
   */
  resolveResult() {
    const selectedValue = this.searchResults.length > 0 ? this.searchResults[0] : undefined;
    if (selectedValue) {
      this._searchTerm = selectedValue.displayData;
    }
    this.valueUpdated.emit(selectedValue);
  }

  /**
   * Re-calculate the position & dimensions of the pop-over.
   */
  private reflowPopover() {
    this.popoverOffsetLeft = this._parentComponent.nativeElement.offsetLeft;
    this.popoverOffsetTop = (this._parentComponent.nativeElement.offsetTop + this._parentComponent.nativeElement.clientHeight);
    this.popoverWidth = this._parentComponent.nativeElement.clientWidth;
    if (!this._destroyed) {
      this._changeDetector.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this._destroyed = true;
  }
}
