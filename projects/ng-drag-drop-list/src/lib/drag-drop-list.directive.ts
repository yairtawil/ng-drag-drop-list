import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Directive({
  selector: '[dragDropList]'
})
export class DragDropListDirective implements OnInit, OnDestroy {
  protected _trigger: HTMLElement = this.elementRef.nativeElement;

  data: {
    dragElement: HTMLElement;
    dropElement?: HTMLElement;
    dragElementInitialBoundingBox: ClientRect;
    targetElementInitialBoundingBox: ClientRect;
  };

  @Input() dragDropList: Array<any>;

  @Input()
  set trigger(value: HTMLElement) {
    if (this.elementRef.nativeElement.hasChildNodes(value)) {
      this._trigger = value;
    } else {
      console.error('Input "dragItem" must be a valid child of:', this.elementRef.nativeElement);
      throw new Error();
    }
  }

  get trigger() {
    return this._trigger;
  }

  @Output() dragDropListChange = new EventEmitter<Array<any>>();
  @Input() duration = 500;
  mousedownSubscription: Subscription;

  get brothers(): Array<HTMLElement> {
    return <HTMLElement[]>Array
      .from(this.elementRef.nativeElement.parentElement.children)
      .filter((elem: HTMLElement): any => {
        return Array.from(elem.attributes)
          .map((attr) => attr.nodeName)
          .some((name) => name.includes('drag-drop-list'));
      });
  }

  mouseMove = ($event) => {
    const { dragElement, dropElement, targetElementInitialBoundingBox } = this.data;
    const { width: targetWidth, height: targetHeight, left: targetLeft, top: targetTop } = targetElementInitialBoundingBox;
    const { left, top, width, height } = dragElement.getBoundingClientRect();
    if (dropElement) {
      dropElement.style.filter = null;
    }
    dragElement.style.pointerEvents = 'none';
    const elements = document.elementsFromPoint(left + (width / 2), top + (height / 2));
    const newDropElement = <HTMLElement>elements.find((element: HTMLElement) => this.brothers.includes(element));
    if (newDropElement) {
      dragElement.style.pointerEvents = null;
      newDropElement.style.filter = 'blur(2px)';
    }
    this.data.dropElement = newDropElement;
    dragElement.style.transition = null;
    dragElement.style.zIndex = '200';
    const translateX = $event.clientX - targetLeft - (targetWidth / 2);
    const translateY = $event.clientY - targetTop - (targetHeight / 2);
    dragElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
  };

  mouseUp = () => {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
    const { dragElement, dropElement, dragElementInitialBoundingBox } = this.data;
    const { left: initialLeft, top: initialTop, width: dragWidth, height: dragHeight } = dragElementInitialBoundingBox;
    document.body.style.userSelect = null;
    dragElement.style.transition = `transform ${this.duration}ms`;

    timer(this.duration).pipe(tap(() => {
      dragElement.style.pointerEvents = null;
      dragElement.style.transition = null;
      dragElement.style.transform = null;
      dragElement.style.zIndex = null;
      if (dropElement) {
        dropElement.style.transform = null;
        dropElement.style.zIndex = null;
        dropElement.style.transition = null;
        const cloneList = [...this.dragDropList];
        const dragIndex = this.brothers.indexOf(dragElement);
        const dropIndex = this.brothers.indexOf(dropElement);
        cloneList[dragIndex] = this.dragDropList[dropIndex];
        cloneList[dropIndex] = this.dragDropList[dragIndex];
        this.dragDropListChange.emit(cloneList);
      }
    })).subscribe();

    if (dropElement) {
      const { left: dropLeft, top: dropTop } = dropElement.getBoundingClientRect();
      dropElement.style.filter = null;
      dropElement.style.transition = `transform ${this.duration}ms`;
      dropElement.style.transform = `translate(${initialLeft - dropLeft}px, ${initialTop - dropTop}px)`;
      dragElement.style.transform = `translate(${dropLeft - initialLeft}px, ${dropTop - initialTop}px)`;
      dropElement.style.zIndex = '199';
      dropElement.classList.remove('droppable');
    } else {
      dragElement.style.transform = `translate(0, 0)`;
    }

    this.data = null;
  };

  constructor(protected elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.mousedownSubscription = fromEvent(this.trigger, 'mousedown').pipe(
      tap(() => {
          const dragElement = this.elementRef.nativeElement;
          document.body.style.userSelect = 'none';
          const dragElementInitialBoundingBox = dragElement.getBoundingClientRect();
          const targetElementInitialBoundingBox = this.trigger.getBoundingClientRect();
          this.data = { dragElement, dragElementInitialBoundingBox, targetElementInitialBoundingBox };
          document.addEventListener('mousemove', this.mouseMove);
          document.addEventListener('mouseup', this.mouseUp);
        }
      )).subscribe();
  }

  ngOnDestroy() {
    this.mousedownSubscription.unsubscribe();
  }

}
