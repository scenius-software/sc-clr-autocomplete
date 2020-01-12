import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScClrAutocompleteModule } from 'projects/sc-clr-autocomplete/src/lib/sc-clr-autocomplete.module';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ScClrAutocompleteModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
