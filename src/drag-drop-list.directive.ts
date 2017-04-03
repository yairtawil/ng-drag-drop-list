import { Directive, Input, ElementRef, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';

const selector = "[dragDropList]"

@Directive({
    selector
})

export class DragDropListDirective{

    constructor(private el: ElementRef) {}

    @Input("dragDropList") public data:[number,Array<any>];

    @Input("dragged") dragged:string ;
    @Input("drag-over") draggOvered:string ;

    @Output() onDrop = new EventEmitter();
    public shift_down:boolean = false;

    @HostListener('dragstart', ['$event']) dragstart($event:DragEvent) {
        let dragIndex:string = this.data[0].toString();
        $event.dataTransfer.setData("dragIndex", dragIndex);
        this.addDraggedStyle();
    }

    @HostBinding('draggable') draggable = true;

    @HostListener('dragend') dragend() {
        this.removeDraggedStyle();
    }

    @HostListener('dragover', ['$event']) dragover($event) {
        $event.preventDefault();
        this.addDragOveredStyle()
    }

    @HostListener('dragleave') dragleave() {
        this.removeDragOveredStyle();
    }

    @HostListener('drop', ['$event']) drop($event:DragEvent) {
        let dropIndex = this.data[0];
        let dragIndex:number = +$event.dataTransfer.getData("dragIndex");
        let array = this.data[1];
        this.removeDragOveredStyle();
        if(dropIndex != dragIndex){
            let temp = array[dragIndex];
            array[dragIndex] = array[dropIndex];
            array[dropIndex] = temp;
            this.onDrop.emit(array);
        }
    }

    @HostListener('keyup', ['$event']) keyup($event){
        switch ($event.which) {
            case 16:
                this.shift_down = false;
                this.removeDraggedStyle();
                break;
        }
    }

    @HostListener('keydown', ['$event']) keydown($event){
        switch ($event.which) {
            case 38:
                this.keydownDown();
                break;
            case 40:
                this.keydownUp();
                break;
            case 16:
                this.shift_down = true;
                this.addDraggedStyle();
                break;
        }
    }

    removeDragOveredStyle(){
        if(this.draggOvered) {
            this.el.nativeElement.classList.remove(this.draggOvered);
        } else {
            this.el.nativeElement.style.outline = "none";
        }
    }

    addDragOveredStyle(){
        if(this.draggOvered) {
            this.el.nativeElement.classList.add(this.draggOvered);
        } else {
            this.el.nativeElement.style.outline = "2px dashed lightblue";
        }
    }

    addDraggedStyle(){
        if(this.dragged) {
            this.el.nativeElement.classList.add(this.dragged);
        } else {
            this.el.nativeElement.style.opacity = 0.6;
        }
    }

    removeDraggedStyle(){
        if(this.dragged) {
            this.el.nativeElement.classList.remove(this.dragged);
        } else {
            this.el.nativeElement.style.opacity = 1;
        }
    }

    keydownDown() {
        if(this.shift_down) {
            this.switchPrev();
        } else {
            this.focusPrev();
        }
    }

    keydownUp() {
        if(this.shift_down) {
            this.switchNext();
        } else {
            this.focusNext();
        }
    }

    switchNext() {
        let dropIndex = this.data[0];
        let array = this.data[1];
        let swapIndex, temp;
        swapIndex = (dropIndex + 1) % array.length;
        temp = array[dropIndex];
        array[dropIndex] = array[swapIndex];
        array[swapIndex] = temp;
        setTimeout(()=>{
            this.el.nativeElement.focus();
        }, 0);
    }

    switchPrev() {
        let dropIndex = this.data[0];
        let array = this.data[1];
        let swapIndex, temp;
        swapIndex = (dropIndex - 1) % array.length;
        if (swapIndex < 0) swapIndex += array.length;
        temp = array[dropIndex];
        array[dropIndex] = array[swapIndex];
        array[swapIndex] = temp;
        setTimeout(()=>{
            this.el.nativeElement.focus();
        }, 0);
    }

    focusNext() {
        let elem:HTMLElement = this.el.nativeElement;
        let brothers:HTMLCollection = elem.parentElement.children;
        let array = [].slice.call(brothers);
        let myindex = array.indexOf(this.el.nativeElement);
        let next_index = (myindex + 1) % array.length;
        array[next_index].focus();
    }

    focusPrev(){
        let elem:HTMLElement = this.el.nativeElement;
        let brothers:HTMLCollection = elem.parentElement.children;
        let array = [].slice.call(brothers);
        let myindex = array.indexOf(this.el.nativeElement);
        let prev_index = (myindex - 1) < 0 ? array.length + (myindex - 1) : (myindex - 1);
        array[prev_index ].focus();
    }

}
