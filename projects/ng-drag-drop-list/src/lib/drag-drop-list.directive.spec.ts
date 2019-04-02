import { DragDropListDirective } from './drag-drop-list.directive';

describe('DragDropListDirective', () => {
  it('should create an instance', () => {
    const directive = new DragDropListDirective({ nativeElement: null });
    expect(directive).toBeTruthy();
  });
});
