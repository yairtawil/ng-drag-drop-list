# ng-drag-drop-list

## Installation

```shell
npm install --save ng-drag-drop-list
```

## Usage

Add `DragDropListModule` to your list of module imports:

```typescript
import {DragDropListModule} from 'ng-drag-drop-list';

@NgModule({
  imports: [
    ...
    DragDropListModule
],
...
})
export class AppModule { }

```
Create an array in your component (of colors for example)

```typescript
import { Component } from '@angular/core';

@Component({
...
templateUrl: './app.component.html',
})
export class AppComponent {
  public arr:string[] = ["blue","red","greenyellow","purple","grey"];
}
```

use the directive in your html templates:

```html
  <template ngFor [ngForOf]="arr" let-item let-index="index">
    <div [dragDropList]="[index, array]" [style.background]="item" tabindex="0">{{item}}({{index }})</div>
  </template>

```


## Inputs

### requireds

```typescript
    [dragDropList]="[index, array]"
```

* index and array from *ngFor (```item of array; let index="index" ```) 

### optionals

adding classes for dragged & drag-overed:

`[dragged]`
and:
`[drag-overed]`
for example:


```css
    .my-dragged-class{
        opacity: .5;
    }
    .my-dragged-over-class{
        border: 1px solid black;
    }
```

```typescript
    <div [dragDropList]="[index, array]" dragged="my-dragged-class" drag-overed="my-dragged-over-class">{{index}}</div>
```
