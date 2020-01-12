import { Component, OnInit } from '@angular/core';
import { ScClrAutocompleteMode } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-result/sc-clr-autocomplete.mode';
import { ScAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/sc-autocomplete.model';
import { FormSender } from 'projects/demo/src/app/app.component';
import { StaticAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/static-autocomplete.model';

@Component({
  selector: 'sc-clr-object-output',
  templateUrl: './object-output.component.html',
  styleUrls: ['./object-output.component.scss']
})
export class ObjectOutputComponent extends FormSender implements OnInit {
  autocompleteModes = ScClrAutocompleteMode;
  model: ScAutocompleteModel<TestObject>;
  exampleCodeStaticTypescript = 'private _demoModel: Array<TestObject> = [\n' +
    '    {\n' +
    '      key: \'1\',\n' +
    '      value: \'hello\'\n' +
    '    },\n' +
    '    {\n' +
    '      key: \'2\',\n' +
    '      value: \'world\'\n' +
    '    },\n' +
    '    {\n' +
    '      key: \'3\',\n' +
    '      value: \'good\'\n' +
    '    },\n' +
    '    {\n' +
    '      key: \'4\',\n' +
    '      value: \'bye\'\n' +
    '    },\n' +
    '  ];\n' +
    'this.model = new StaticAutocompleteModel(this._demoModel,\n' +
    '    ((testObject) => `(${testObject.key}) ${testObject.value}`));\n';
  exampleCodeStaticHtml = '<form clrForm autocomplete="off" [formGroup]="form">\n' +
    '    <sc-clr-autocomplete [readOnly]="true" [autocompleteMode]="autocompleteModes.Select"\n' +
    '        [labelText]="\'Autocomplete\'" [autocompleteModel]="model"\n' +
    '        formControlName="autocomplete"></sc-clr-autocomplete>\n' +
    '</form>\n';
  private _demoModel: Array<TestObject> = [
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
    this.model = new StaticAutocompleteModel(this._demoModel,
      ((testObject) => `(${testObject.key}) ${testObject.value}`));
  }

  ngOnInit() {
  }
}

export class TestObject {
  key: string;
  value: string;
}
