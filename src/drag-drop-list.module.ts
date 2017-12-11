import { NgModule } from '@angular/core';
import { DragDropListDirective } from './drag-drop-list.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [DragDropListDirective],
  exports: [DragDropListDirective]
})

export class DragDropListModule {
}
