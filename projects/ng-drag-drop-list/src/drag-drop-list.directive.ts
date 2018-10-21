import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[dragDropList]'
})

export class DragDropListDirective {

  @Input() dragDropList: [number, Array<any>];
  @Input() dragged: string;
  @Input() draggOvered: string;
  @HostBinding() draggable = true;
  @Output() onDrop = new EventEmitter();
  shiftDown = false;

  @HostListener('dragstart', ['$event'])
  dragstart($event: DragEvent) {
    const dragIndex: string = this.dragDropList[0].toString();
    $event.dataTransfer.setData('dragIndex', dragIndex);
    this.addDraggedStyle();
  }

  @HostListener('dragend')
  dragend() {
    this.removeDraggedStyle();
  }

  @HostListener('dragover', ['$event'])
  dragover($event) {
    $event.preventDefault();
    this.addDragOveredStyle();
  }

  @HostListener('dragleave')
  dragleave() {
    this.removeDragOveredStyle();
  }

  @HostListener('drop', ['$event'])
  drop($event: DragEvent) {
    const dropIndex = this.dragDropList[0];
    const dragIndex: number = +$event.dataTransfer.getData('dragIndex');
    const array = this.dragDropList[1];
    this.removeDragOveredStyle();
    if (dropIndex !== dragIndex) {
      const temp = array[dragIndex];
      array[dragIndex] = array[dropIndex];
      array[dropIndex] = temp;
      this.onDrop.emit(array);
    }
  }

  @HostListener('keyup', ['$event'])
  keyup($event) {
    switch ($event.which) {
      case 16:
        this.shiftDown = false;
        this.removeDraggedStyle();
        break;
    }
  }

  @HostListener('keydown', ['$event'])
  keydown($event) {
    switch ($event.which) {
      case 38:
        this.keydownDown();
        break;
      case 40:
        this.keydownUp();
        break;
      case 16:
        this.shiftDown = true;
        this.addDraggedStyle();
        break;
    }
  }

  constructor(private el: ElementRef) {
  }

  removeDragOveredStyle() {
    if (this.draggOvered) {
      this.el.nativeElement.classList.remove(this.draggOvered);
    } else {
      this.el.nativeElement.style.outline = 'none';
    }
  }

  addDragOveredStyle() {
    if (this.draggOvered) {
      this.el.nativeElement.classList.add(this.draggOvered);
    } else {
      this.el.nativeElement.style.outline = '2px dashed lightblue';
    }
  }

  addDraggedStyle() {
    if (this.dragged) {
      this.el.nativeElement.classList.add(this.dragged);
    } else {
      this.el.nativeElement.style.opacity = 0.6;
    }
  }

  removeDraggedStyle() {
    if (this.dragged) {
      this.el.nativeElement.classList.remove(this.dragged);
    } else {
      this.el.nativeElement.style.opacity = 1;
    }
  }

  keydownDown() {
    if (this.shiftDown) {
      this.switchPrev();
    } else {
      this.focusPrev();
    }
  }

  keydownUp() {
    if (this.shiftDown) {
      this.switchNext();
    } else {
      this.focusNext();
    }
  }

  switchNext() {
    const dropIndex = this.dragDropList[0];
    const array = this.dragDropList[1];
    let swapIndex, temp;
    swapIndex = (dropIndex + 1) % array.length;
    temp = array[dropIndex];
    array[dropIndex] = array[swapIndex];
    array[swapIndex] = temp;
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 0);
  }

  switchPrev() {
    const dropIndex = this.dragDropList[0];
    const array = this.dragDropList[1];
    let swapIndex, temp;
    swapIndex = (dropIndex - 1) % array.length;
    if (swapIndex < 0) {
      swapIndex += array.length;
    }
    temp = array[dropIndex];
    array[dropIndex] = array[swapIndex];
    array[swapIndex] = temp;
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 0);
  }

  focusNext() {
    const elem: HTMLElement = this.el.nativeElement;
    const brothers: HTMLCollection = elem.parentElement.children;
    const array = [].slice.call(brothers);
    const myIndex = array.indexOf(this.el.nativeElement);
    const nextIndex = (myIndex + 1) % array.length;
    array[nextIndex].focus();
  }

  focusPrev() {
    const elem: HTMLElement = this.el.nativeElement;
    const brothers: HTMLCollection = elem.parentElement.children;
    const array = [].slice.call(brothers);
    const myIndex = array.indexOf(this.el.nativeElement);
    const prevIndex = (myIndex - 1) < 0 ? array.length + (myIndex - 1) : (myIndex - 1);
    array[prevIndex].focus();
  }

}
