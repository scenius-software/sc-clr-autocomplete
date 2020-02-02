# Scenius Clarity Auto-Complete Component
[![npm](https://img.shields.io/npm/v/sc-clr-autocomplete?style=for-the-badge)](https://www.npmjs.com/package/sc-clr-autocomplete)

Check out our [Github Pages](https://scenius-software.github.io/sc-clr-autocomplete/) for a live demo and complete description of this project.

## Demo
![Demo](https://i.imgur.com/adHcB7y.png)

Works with Angular Reactive Forms.

##### HTML
```html
<form clrForm autocomplete="off" [formGroup]="form">
  <sc-clr-autocomplete [labelText]="'Autocomplete'" [autocompleteModel]="model"
                       formControlName="autocomplete"></sc-clr-autocomplete>
</form>
```

##### TypeScript
```typescript
private _demoModel = [ 'Hello', 'world', 'this', 'is', 'an', 'auto complete', 'component', 'for', 'clarity' ];
this.model = new StaticAutocompleteModel(this._demoModel);
```

