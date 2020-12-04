import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-link-picker',
  templateUrl: './link-picker.component.html',
  styleUrls: ['./link-picker.component.css']
})
export class LinkPickerComponent implements OnInit {
  @Input() url = '';
  @Input() title = '';

  @Output() selected = new EventEmitter<any>();
  @Output() canceled = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectClick(): void {
    const title = document.getElementById('title');
    const url = document.getElementById('url');

    this.selected?.emit({ title: title?.innerText, url: url?.innerText, });
  }

  cancelClick(): void {
    this.canceled?.emit();
  }
}
