import { Component } from '@angular/core';
import { FormSender } from 'projects/demo/src/app/app.component';
import { ScAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/sc-autocomplete.model';
import { StaticAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/static-autocomplete.model';

@Component({
  selector: 'sc-clr-static-select',
  templateUrl: './static-select.component.html',
  styleUrls: ['./static-select.component.scss']
})
export class StaticSelectComponent extends FormSender{
  model: ScAutocompleteModel<string>;
  exampleCodeStaticTypescript = 'private _demoModel = [ \'Hello\', \'world\', \'this\', \'is\', \'an\', \'auto complete\', \'component\', \'for\', \'clarity\' ];\n' +
    'this.model = new StaticAutocompleteModel(this._demoModel);';
  exampleCodeStaticHtml = '<clr-control-container>  \n' +
    '    <label>Combobox</label>\n' +
    '    <form [formGroup]="form" autocomplete="off" clrForm>\n' +
    '        <sc-clr-autocomplete clrControl [autocompleteModel]="model" [characterActivationTrigger]="0" [labelText]="\'Autocomplete\'"\n' +
    '            [readOnly]="true" formControlName="autocomplete"></sc-clr-autocomplete>\n' +
    '    </form>\n' +
    '</clr-control-container>';
  private _demoModel = ['Hello', 'world', 'this', 'is', 'an', 'auto complete', 'component', 'for', 'clarity'];

  constructor() {
    super();
    this.model = new StaticAutocompleteModel(this._demoModel);
  }
}
