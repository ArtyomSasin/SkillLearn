import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
  @Input() colors: string[] = [];
  @Input() color = 'black';

  @Output() selected = new EventEmitter<string>();
  @Output() canceled = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectClick(): void {
    this.selected?.emit(this.color);
  }

  cancelClick(): void {
    this.canceled?.emit(this.color);
  }
}
