import { Component } from '@angular/core';
import { ScAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/sc-autocomplete.model';
import { StaticAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/static-autocomplete.model';
import { FormSender } from 'projects/demo/src/app/app.component';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sc-clr-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent extends FormSender {

  model: ScAutocompleteModel<string>;
  exampleValidatedTypescript = 'private _demoModel = [ \'Hello\', \'world\', \'this\', \'is\', \'an\', \'auto complete\', \'component\', \'for\', \'clarity\' ];\n' +
    'this.model = new StaticAutocompleteModel(this._demoModel);\n' +
    'this.form = new FormGroup({\n' +
    ' autocomplete: new FormControl(\'\', [Validators.required])\n' +
    '});\n';
  exampleValidatedHtml = '<clr-control-container>\n' +
    '    <label>Autocomplete</label>\n' +
    '    <form clrForm autocomplete="off" [formGroup]="form">\n' +
    '        <sc-clr-autocomplete clrControl [labelText]="\'Autocomplete\'" [autocompleteModel]="model" [resolveToItemInList]="true"\n' +
    '            formControlName="autocomplete"></sc-clr-autocomplete>\n' +
    '        <clr-control-error *clrIfError="\'required\'">This is a required field</clr-control-error>\n' +
    '    </form>\n' +
    '</clr-control-container>';
  private _demoModel = ['Hello', 'world', 'this', 'is', 'an', 'auto complete', 'component', 'for', 'clarity'];

  constructor() {
    super();
    this.model = new StaticAutocompleteModel(this._demoModel);
    this.form = new UntypedFormGroup({
      autocomplete: new UntypedFormControl(null, [Validators.required])
    });
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
  }

}
