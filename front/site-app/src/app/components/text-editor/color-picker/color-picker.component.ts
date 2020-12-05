import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorGroup } from 'src/app/shared/models/color';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
  @Input() colorGroups: ColorGroup[] = [];
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
    this.canceled?.emit();
  }
}
