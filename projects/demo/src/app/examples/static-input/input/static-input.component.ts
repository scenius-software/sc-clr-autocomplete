import { Component } from '@angular/core';
import { FormSender } from 'projects/demo/src/app/app.component';
import { ScAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/sc-autocomplete.model';
import { StaticAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/static-autocomplete.model';

@Component({
  selector: 'sc-clr-static-input',
  templateUrl: './static-input.component.html',
  styleUrls: ['./static-input.component.scss']
})
export class StaticInputComponent extends FormSender {
  model: ScAutocompleteModel<string>;
  exampleCodeStaticTypescript = 'private _demoModel = [ \'Hello\', \'world\', \'this\', \'is\', \'an\', \'auto complete\', \'component\', \'for\', \'clarity\' ];\n' +
    'this.model = new StaticAutocompleteModel(this._demoModel);\n';
  exampleCodeStaticHtml = '<clr-control-container>\n' +
    '    <label>Autocomplete</label>\n' +
    '    <form clrForm autocomplete="off" [formGroup]="form">\n' +
    '        <sc-clr-autocomplete clrControl [labelText]="\'Autocomplete\'" [autocompleteModel]="model"\n' +
    '            formControlName="autocomplete"></sc-clr-autocomplete>\n' +
    '    </form>\n' +
    '</clr-control-container>';
  private _demoModel = ['Hello', 'world', 'this', 'is', 'an', 'auto complete', 'component', 'for', 'clarity'];

  constructor() {
    super();
    this.model = new StaticAutocompleteModel(this._demoModel);
  }
}
