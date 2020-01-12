import { Component, ComponentRef, forwardRef, HostListener, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ScAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/sc-autocomplete.model';
// tslint:disable-next-line:max-line-length
import { ScClrAutocompletePopoverComponent } from 'projects/sc-clr-autocomplete/src/lib/components/popover/sc-clr-autocomplete-popover.component';
import { ScClrAutocompletePopoverService } from 'projects/sc-clr-autocomplete/src/lib/services/sc-clr-autocomplete-popover.service';
import { ScClrAutocompleteMode } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-result/sc-clr-autocomplete.mode';
import { ClrAutocompleteItem } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-result/clr-autocomplete.item';

/**
 * The Scenius Clarity Autocomplete Component is a simple input variant that provides the ability for users
 * to input one of the pre-defined strings provided to the component.
 */
@Component({
  selector: 'sc-clr-autocomplete',
  templateUrl: './sc-clr-autocomplete.component.html',
  styleUrls: ['./sc-clr-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ScClrAutocompleteComponent)
    }
  ]
})
export class ScClrAutocompleteComponent<T> implements ControlValueAccessor {
  /** Whether the user can input text into the input or not. */
  @Input() readOnly = false;

  /** The number of characters to be input before opening the auto-complete dialog */
  @Input() characterActivationTrigger = 1;

  @Output() selectedItem: T | undefined;

  /**
   * Returns whether or not a valid value is selected from the auto-complete model.
   */
  get elementIsSelected(): boolean {
    return this.selectedItem !== undefined;
  }

  /**
   * Returns the user set text of the input.
   */
  get freeInputValue(): string {
    return this._freeInputValue;
  }

  /**
   * Sets the user input on the autocomplete box. This value will be used to query the search space.
   */
  set freeInputValue(newValue: string) {
    if (newValue !== this._freeInputValue) {
      this._freeInputValue = newValue;
      this.updatePopover();
    }
  }

  get popoverOpen() {
    return this._popoverRef !== undefined;
  }

  @Input() autocompleteModel: ScAutocompleteModel<T>;
  @Input() labelText = '';
  /**
   * ComponentRef to the actual in-use auto-complete popover.
   */
  private _popoverRef: ComponentRef<ScClrAutocompletePopoverComponent<T>>;
  private _freeInputValue = '';
  @Input() autocompleteMode: ScClrAutocompleteMode = ScClrAutocompleteMode.Input;
  /**
   * ViewContainerRef to the popover element used for showing the auto-complete pop-over container.
   */
  @ViewChild('popover', {read: ViewContainerRef, static: false}) private _popoverElementRef;
  /**
   * A reference to our Clr Input element, used to calculate the position and width of the auto-complete pop-over.
   */
  @ViewChild('inputElement', {static: false}) private _inputElementRef;
  /**
   * A reference to our Clr Label used to calculate the offset of the auto-complete pop-over.
   */
  @ViewChild('label', {static: false}) private _labelRef;

  constructor(private _popoverService: ScClrAutocompletePopoverService) { }

  // Required interfaces for form functionality.
  onChange: any = () => { };
  onTouched: any = () => { };

  /**
   * OnChange event handler for Reactive Forms functionality.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * OnTouched event handler for Reactive Forms functionality.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * writeValue implementation for Reactive Forms functionality.
   */
  writeValue(obj: any): void {
    if (obj) {
      this.freeInputValue = obj as string;
    }
  }

  @HostListener('click', ['$event.target']) onClick(event) {
    if (this.autocompleteMode === ScClrAutocompleteMode.Select && !this._popoverRef) {
      this.openPopover();
    }
  }

  clearInput() {
    this.updateInput('');
    this._inputElementRef.nativeElement.focus();
    this.openPopover();
  }

  closePopover() {
    if (this._popoverRef) {
      this._popoverRef.instance.clickOut();
    }
  }

  /**
   * Toggle the auto-complete pop-over.
   */
  openPopover() {
    // Open the auto-complete pop-over.
    this._popoverRef = this._popoverService.open(this._popoverElementRef, this._inputElementRef);

    // When the pop-over gets closed, dump the instance we have.
    this._popoverRef.instance.closed.subscribe(() => {
      this._popoverRef.destroy();
      this._popoverRef = undefined;
    });

    // When the user selects a value in the auto-complete model, write it to our current value instead.
    // Effectively replacing the current user input with the selected one.
    this._popoverRef.instance.valueUpdated.subscribe((value: ClrAutocompleteItem<T>) => {
      const displayData = (value) ? value.displayData : '';
      this._inputElementRef.nativeElement.value = displayData;
      this._freeInputValue = displayData;
      this.selectedItem = (value) ? value.data : undefined;
      this.onChange(this.selectedItem);
      this.onTouched();
    });

    // Set the search-space (auto-complete model) to the one provided.
    this._popoverRef.instance.resolveToElementInList = this.autocompleteMode !== ScClrAutocompleteMode.Input;
    this._popoverRef.instance.autocompleteModel = this.autocompleteModel;
    this._popoverRef.instance.searchTerm = (this.autocompleteMode !== ScClrAutocompleteMode.Input) ? '' : this._freeInputValue;

    // Set focus back on the input element
    this._inputElementRef.nativeElement.focus();
  }

  /**
   * Event handler for the backing input onchange event.
   * @param input the new state of the input field.
   */
  updateInput(input: string) {
    if (this.readOnly) {
      this._inputElementRef.nativeElement.value = '';
      this.freeInputValue = '';
    } else {
      this._inputElementRef.nativeElement.value = input;
      this.freeInputValue = input;
    }
    this.onChange(this.freeInputValue);
    this.onTouched();
  }

  /**
   * Update the state of the pop-over. Either summon it if it needs to be there,
   * or update the value to its filter.
   */
  updatePopover() {
    if (!this._popoverRef
      && ((this.freeInputValue.length >= this.characterActivationTrigger) || this.autocompleteMode === ScClrAutocompleteMode.Select)) {
      // If we don't have a reference to an active pop-over, and the user has entered at least one character,
      // toggle the pop-over.
      this.openPopover();
    }

    if (this._popoverRef) {
      // If we have a reference to our pop-over, update its search-term.
      this._popoverRef.instance.searchTerm = this._freeInputValue;
    }
  }
}
