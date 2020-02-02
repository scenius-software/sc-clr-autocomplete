import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'projects/demo/src/app/app-routing.module';
import { AppComponent } from 'projects/demo/src/app/app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HIGHLIGHT_OPTIONS, HighlightModule, HighlightOptions } from 'ngx-highlightjs';
import { StaticInputComponent } from 'projects/demo/src/app/examples/static-input/input/static-input.component';
import { HttpInputComponent } from 'projects/demo/src/app/examples/http-input/http-input.component';
import { ObservableInputComponent } from 'projects/demo/src/app/examples/observable-input/observable-input.component';
import { ObjectOutputComponent } from 'projects/demo/src/app/examples/object-output/object-output.component';
import { StaticSelectComponent } from 'projects/demo/src/app/examples/static-input/select/static-select/static-select.component';
import { ScClrAutocompleteModule } from 'projects/sc-clr-autocomplete/src/lib/sc-clr-autocomplete.module';
import { InputResolveComponent } from 'projects/demo/src/app/examples/static-input/input-resolve/input-resolve.component';
import { PreAppliedInputComponent } from './examples/pre-applied-input/pre-applied-input.component';

/**
 * Import specific languages to avoid importing everything
 * The following will lazy load highlight.js core script (~9.6KB) + the selected languages bundle (each lang. ~1kb)
 */
export function getHighlightLanguages() {
  return {
    typescript: () => import('highlight.js/lib/languages/typescript'),
    html: () => import('highlight.js/lib/languages/xml'),
    xml: () => import('highlight.js/lib/languages/xml'),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    StaticInputComponent,
    HttpInputComponent,
    ObservableInputComponent,
    ObjectOutputComponent,
    StaticSelectComponent,
    InputResolveComponent,
    PreAppliedInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighlightModule,
    ScClrAutocompleteModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        lineNumbers: true,
        languages: getHighlightLanguages()
      } as HighlightOptions
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
