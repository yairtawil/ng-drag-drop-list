import { NgModule } from '@angular/core';
import { DragDropListDirective } from './drag-drop-list.directive';

@NgModule({
    declarations: [DragDropListDirective],
    exports: [DragDropListDirective]
})

export class DragDropListModule{}
