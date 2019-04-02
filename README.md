[![NPM](https://nodei.co/npm/ng-drag-drop-list.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/ng-drag-drop-list/)

[![Build Status](https://travis-ci.org/yairtawil/ng-drag-drop-list.svg?branch=master)](https://travis-ci.org/yairtawil/ng-drag-drop-list)

**[Demo](https://yairtawil.github.io/ng-drag-drop-list/)**

# ng-drag-drop-list

Ng Drag Drop List is an [Angular](https://angular.io/) library for drag and drop elements on list.


### Installation

##### Install with `npm`
```shell
npm install ng-drag-drop-list
```

##### Install with `yarn`
```shell
yarn add ng-drag-drop-list
```

### Usage

Add `DragDropListModule` to your list of module imports:

```typescript
import { DragDropListModule } from 'ng-drag-drop-list';

@NgModule({
  imports: [
    ...
    DragDropListModule
],
...
})
export class AppModule { }

```
Create a list in your component (of colors for example)

```typescript
import { Component } from '@angular/core';

@Component({
...
})
export class AppComponent {
  colors = ['blue', 'red', 'greenyellow', 'purple', 'grey'];
}
```

Use `dragDropList` directive on the drag elements (TWO-WAY binding):

```html
    <div *ngFor="let color of colors" 
         [(dragDropList)]="colors">
        {{color}}
    </div>
```

For specific dragging trigger:

```html
    <div *ngFor="let color of colors" 
         [(dragDropList)]="colors"
         [trigger]="trigger">
          <button #trigger> TRIGER </button>
          {{color}}
    </div>
```
### Api

| Input          | Type                              | Default         |
|------------------|-------------------------------------|--------------|
| dragDropList   |            Array |           -  |
| trigger      |           HTMLElement |   nativeElement         |
| duration       |            number |  300  |

| Output          | Emit                              |
|------------------|-------------------------------------|
| dragDropListChange   |            Array |           

