import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  form = new UntypedFormGroup({
    autocomplete: new UntypedFormControl('')
  });

  sendForm() {
    alert(JSON.stringify(this.form.value));
  }

}
