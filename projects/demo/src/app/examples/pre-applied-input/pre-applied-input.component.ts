import { Component, OnInit } from '@angular/core';
import { ObservableAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/observable-autocomplete.model';
import { of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { FormSender } from 'projects/demo/src/app/app.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestObject } from 'projects/demo/src/app/examples/object-output/object-output.component';

@Component({
  selector: 'sc-clr-pre-applied-input',
  templateUrl: './pre-applied-input.component.html',
  styleUrls: ['./pre-applied-input.component.scss']
})
export class PreAppliedInputComponent extends FormSender implements OnInit {
  observableModel: ObservableAutocompleteModel<string>;
  observableObjectModel: ObservableAutocompleteModel<TestObject>;
  objectForm = new FormGroup({
    autocomplete: new FormControl('', [Validators.required])
  });

  observableDone = false;
  objectObservableDone = false;
  // tslint:disable-next-line:max-line-length
  exampleCodeStaticTypescript = 'private _demoModel = [ \'Hello\', \'world\', \'this\', \'is\', \'an\', \'auto complete\', \'component\', \'for\', \'clarity\' ];\n' +
    'const observable = of(this._demoModel).pipe(delay(5000), finalize(() => this.observableDone = true));\n' +
    'this.observableModel = new ObservableAutocompleteModel<string>(observable);\n' +
    '    this.form.patchValue({\n' +
    '      autocomplete: \'hello\'\n' +
    '    });\n';
  exampleCodeStaticHtml = '<form clrForm autocomplete="off" [formGroup]="form">\n' +
    '    <sc-clr-autocomplete [labelText]="\'Autocomplete\'" [autocompleteModel]="observableModel" [resolveToItemInList]="true" \n' +
    '        formControlName="autocomplete"></sc-clr-autocomplete>\n' +
    '</form>\n';
  // tslint:disable-next-line:max-line-length
  exampleCodeObjectTypescript = 'private _demoModel = [ \'Hello\', \'world\', \'this\', \'is\', \'an\', \'auto complete\', \'component\', \'for\', \'clarity\' ];\n' +
    'const observable = of(this._demoModel).pipe(delay(5000), finalize(() => this.observableDone = true));\n' +
    'this.observableModel = new ObservableAutocompleteModel<string>(observable);\n' +
    'this.objectForm.patchValue({\n' +
    '  autocomplete: {\n' +
    '    key: 3,\n' +
    '    value: \'good\'\n' +
    '  }\n' +
    '});\n'
  exampleCodeObjectHtml = '<form [formGroup]="objectForm" autocomplete="off" clrForm>\n' +
    '    <sc-clr-autocomplete [autocompleteModel]="observableObjectModel" [labelText]="\'Autocomplete\'"\n' +
    '        formControlName="autocomplete"></sc-clr-autocomplete>\n' +
    '</form>\n';
  private _demoModel = ['Hello', 'world', 'this', 'is', 'an', 'auto complete', 'component', 'for', 'clarity'];
  private _demoObjectModel: Array<TestObject> = [
    {
      key: '1',
      value: 'hello'
    },
    {
      key: '2',
      value: 'world'
    },
    {
      key: '3',
      value: 'good'
    },
    {
      key: '4',
      value: 'bye'
    },
  ];

  constructor() {
    super();
    this.resetObservableModelTest();
    this.resetObjectObservableModelTest();
  }

  ngOnInit() {
  }

  private patchForm() {
    this.form.patchValue({
      autocomplete: 'hello'
    });
  }

  private patchObjectForm() {
    this.objectForm.patchValue({
      autocomplete: {
        key: 3,
        value: 'good'
      }
    });
  }

  sendObjectForm() {
    alert(JSON.stringify(this.objectForm.value));
  }

  resetObservableModelTest() {
    this.observableDone = false;
    const observable = of(this._demoModel).pipe(delay(5000), finalize(() => this.observableDone = true));
    this.observableModel = new ObservableAutocompleteModel<string>(observable);
    this.patchForm();
  }

  resetObjectObservableModelTest() {
    this.objectObservableDone = false;
    const observable = of(this._demoObjectModel).pipe(delay(5000), finalize(() => this.objectObservableDone = true));
    this.observableObjectModel = new ObservableAutocompleteModel<TestObject>(observable,  ((testObject) => `(${testObject.key}) ${testObject.value}`));
    this.patchObjectForm();
  }
}
