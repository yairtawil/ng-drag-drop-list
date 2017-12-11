# ng-drag-drop-list

[![NPM](https://nodei.co/npm/ng-drag-drop-list.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/ng-drag-drop-list/)

**[Demo](https://yairtawil.github.io/ng-drag-drop-list/)**

## Installation

```shell
npm install ng-drag-drop-list
```

## Usage

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
Create an array in your component (of colors for example)

```typescript
import { Component } from '@angular/core';

@Component({
...
templateUrl: './app.component.html',
})
export class AppComponent {
  arr: string[] = ['blue','red','greenyellow','purple','grey'];
}
```

use the directive in your html templates:

```html
    <div *ngFor="let item of arr; let index = index" 
         [dragDropList]="[index, array]" 
         [style.background]="item" tabindex="0">{{item}}({{index }})
    </div>
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
