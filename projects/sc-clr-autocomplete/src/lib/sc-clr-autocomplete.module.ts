import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScClrAutocompleteComponent } from 'projects/sc-clr-autocomplete/src/lib/components/autocomplete/sc-clr-autocomplete.component';
import { ScClrAutocompletePopoverComponent } from 'projects/sc-clr-autocomplete/src/lib/components/popover/sc-clr-autocomplete-popover.component';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [ScClrAutocompleteComponent, ScClrAutocompletePopoverComponent],
  exports: [
    ScClrAutocompleteComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
  ],
  entryComponents: [ScClrAutocompletePopoverComponent]
})
export class ScClrAutocompleteModule {}
