import { Component, OnInit } from '@angular/core';
import { FormSender } from 'projects/demo/src/app/app.component';
import { HttpAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/http-autocomplete.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { ObservableAutocompleteModel } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-model/observable-autocomplete.model';

@Component({
  selector: 'sc-clr-http-input',
  templateUrl: './http-input.component.html',
  styleUrls: ['./http-input.component.scss']
})
export class HttpInputComponent extends FormSender implements OnInit {
  modelReady = false;
  _httpModel: HttpAutocompleteModel<CountryApiValue>;
  exampleCodeStaticTypescript = 'interface CountryApiValue {\n' +
    '  numericCode: number;\n' +
    '  name: string;\n' +
    '  population: number;\n' +
    '}\n' +
    'this._httpModel = new HttpAutocompleteModel<CountryApiValue>(_httpClient, \'https://restcountries.eu/rest/v2/all\', false,\n' +
    '      (val) => `[${val.numericCode}] ${val.name} (${val.population})`);\n';
  exampleCodeStaticHtml = '<form clrForm autocomplete="off" [formGroup]="form">\n' +
    '    <sc-clr-autocomplete [autocompleteModel]="_httpModel" formControlName="autocomplete"></sc-clr-autocomplete>\n' +
    '</form>\n';

  constructor(public _httpClient: HttpClient) {
    super();
    this.resetHttpModel();
  }

  ngOnInit() {
  }

  resetHttpModel() {
    this.modelReady = false;
    this._httpModel = new HttpAutocompleteModel<CountryApiValue>(this._httpClient, 'https://restcountries.eu/rest/v2/all', false,
      (val) => `[${val.numericCode}] ${val.name} (${val.population})`);
    this._httpModel.onReadyChanged.subscribe((value) => {
      this.modelReady = value;
    });
  }
}

interface CountryApiValue {
  numericCode: number;
  name: string;
  population: number;
}
