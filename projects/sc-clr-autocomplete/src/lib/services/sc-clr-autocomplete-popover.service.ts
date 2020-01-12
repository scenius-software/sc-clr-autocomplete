import { ComponentFactoryResolver, ComponentRef, ElementRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { ScClrAutocompletePopoverComponent } from '../components/popover/sc-clr-autocomplete-popover.component';

@Injectable({
  providedIn: 'root'
})
export class ScClrAutocompletePopoverService {

  constructor(private _componentResolver: ComponentFactoryResolver, private _injector: Injector) {
  }

  open<T>(vcRef: ViewContainerRef, parentComponent: ElementRef): ComponentRef<ScClrAutocompletePopoverComponent<T>> {
    vcRef.clear();

    const factory = this._componentResolver.resolveComponentFactory(ScClrAutocompletePopoverComponent);
    const component = vcRef.createComponent(factory);
    component.instance.parentComponent = parentComponent;

    // @ts-ignore
    return component;
  }
}
