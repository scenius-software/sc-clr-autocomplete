import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScClrAutocompleteMode } from 'projects/sc-clr-autocomplete/src/lib/model/autocomplete-result/sc-clr-autocomplete.mode';
import version from '../../../../version';

@Component({
  selector: 'sc-clr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  version = version;

  constructor() {
  }
}

export abstract class FormSender {
  autocompleteModes = ScClrAutocompleteMode;
  form = new FormGroup({
    autocomplete: new FormControl('', [Validators.required])
  });

  sendForm() {
    alert(JSON.stringify(this.form.value));
  }

}
