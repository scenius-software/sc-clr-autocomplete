import { ComponentRef, ElementRef, Injectable, ViewContainerRef } from '@angular/core';
import { ScClrAutocompletePopoverComponent } from '../components/popover/sc-clr-autocomplete-popover.component';

@Injectable({
  providedIn: 'root'
})
export class ScClrAutocompletePopoverService {

  open<T>(vcRef: ViewContainerRef, parentComponent: ElementRef): ComponentRef<ScClrAutocompletePopoverComponent<T>> {
    vcRef.clear();

    const component = vcRef.createComponent(ScClrAutocompletePopoverComponent);
    component.instance.parentComponent = parentComponent;

    // @ts-ignore
    return component;
  }
}
