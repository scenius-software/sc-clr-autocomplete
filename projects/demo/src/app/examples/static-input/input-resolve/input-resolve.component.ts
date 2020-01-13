import { Component } from '@angular/core';
import { ScAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/sc-autocomplete.model';
import { StaticAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/static-autocomplete.model';
import { FormSender } from 'projects/demo/src/app/app.component';

@Component({
  selector: 'sc-clr-static-input-resolve',
  templateUrl: './input-resolve.component.html',
  styleUrls: ['./input-resolve.component.scss']
})
export class InputResolveComponent extends FormSender {
  model: ScAutocompleteModel<string>;
  exampleCodeStaticTypescript = 'private _demoModel = [ \'Hello\', \'world\', \'this\', \'is\', \'an\', \'auto complete\', \'component\', \'for\', \'clarity\' ];\n' +
    'this.model = new StaticAutocompleteModel(this._demoModel);\n';
  exampleCodeStaticHtml = '<form clrForm autocomplete="off" [formGroup]="form">\n' +
    '    <sc-clr-autocomplete [labelText]="\'Autocomplete\'" [autocompleteModel]="model" [resolveToItemInList]="true"\n' +
    '        formControlName="autocomplete"></sc-clr-autocomplete>\n' +
    '</form>\n';
  private _demoModel = ['Hello', 'world', 'this', 'is', 'an', 'auto complete', 'component', 'for', 'clarity'];

  constructor() {
    super();
    this.model = new StaticAutocompleteModel(this._demoModel);
  }
}
