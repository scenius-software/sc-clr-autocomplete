import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ScClrAutocompleteComponent } from './components/autocomplete/sc-clr-autocomplete.component';
import { ScClrAutocompletePopoverComponent } from './components/popover/sc-clr-autocomplete-popover.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ScClrAutocompleteComponent,
    ScClrAutocompletePopoverComponent
  ],
  exports: [
    ScClrAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ScClrAutocompletePopoverComponent],
})
export class ScClrAutocompleteModule {}
