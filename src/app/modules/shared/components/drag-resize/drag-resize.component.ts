import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-drag-resize",
  templateUrl: "./drag-resize.component.html",
  styleUrl: "./drag-resize.component.scss",
})
export class DragResizeComponent {
  @Input() rotation = 0;
  @Input() boundary!: HTMLElement;
  @Input() x = 0;
  @Input() y = 0;
  @Output() delete = new EventEmitter<void>();
  @Output() dragEnd = new EventEmitter<{ x: number; y: number }>();
  @Output() rotationChange = new EventEmitter<number>();

  rotateLeft() {
    this.rotation -= 15;
    this.rotationChange.emit(this.rotation);
  }

  rotateRight() {
    this.rotation += 15;
    this.rotationChange.emit(this.rotation);
  }

  deleteItem() {
    this.delete.emit();
  }

  onDragEnd(event: any) {
    const { x, y } = event.source.getFreeDragPosition();
    console.log(x, y);
    this.dragEnd.emit({ x, y });
  }
}
