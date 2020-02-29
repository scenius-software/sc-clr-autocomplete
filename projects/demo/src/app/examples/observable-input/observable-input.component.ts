import { Component, OnInit } from '@angular/core';
import { ObservableAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/observable-autocomplete.model';
import { FormSender } from 'projects/demo/src/app/app.component';
import { of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

@Component({
  selector: 'sc-clr-observable-input',
  templateUrl: './observable-input.component.html',
  styleUrls: ['./observable-input.component.scss']
})
export class ObservableInputComponent extends FormSender implements OnInit {
  observableModel: ObservableAutocompleteModel<string>;
  observableDone = false;
  exampleCodeStaticTypescript = 'private _demoModel = [ \'Hello\', \'world\', \'this\', \'is\', \'an\', \'auto complete\', \'component\', \'for\', \'clarity\' ];\n' +
    'const observable = of(this._demoModel).pipe(delay(5000), finalize(() => this.observableDone = true));\n' +
    'this.observableModel = new ObservableAutocompleteModel<string>(observable);\n';
  exampleCodeStaticHtml = '<clr-control-container>  \n' +
    '    <label>Combobox</label>\n' +
    '    <form clrForm autocomplete="off" [formGroup]="form">\n' +
    '        <sc-clr-autocomplete clrControl [labelText]="\'Autocomplete\'" [autocompleteModel]="observableModel"\n' +
    '            formControlName="autocomplete"></sc-clr-autocomplete>\n' +
    '    </form>\n' +
    '</clr-control-container>';
  private _demoModel = ['Hello', 'world', 'this', 'is', 'an', 'auto complete', 'component', 'for', 'clarity'];

  constructor() {
    super();
    this.resetObservableModelTest();
  }

  ngOnInit() {
  }

  resetObservableModelTest() {
    this.observableDone = false;
    const observable = of(this._demoModel).pipe(delay(5000), finalize(() => this.observableDone = true));
    this.observableModel = new ObservableAutocompleteModel<string>(observable);
  }
}
