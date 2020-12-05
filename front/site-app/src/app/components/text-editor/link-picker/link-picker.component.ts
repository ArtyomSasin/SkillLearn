import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-link-picker',
  templateUrl: './link-picker.component.html',
  styleUrls: ['./link-picker.component.css']
})
export class LinkPickerComponent implements OnInit {

  urlControl = new FormControl();
  titleControl = new FormControl();
  isTitleChanged = false;

  constructor(
    public dialogRef: MatDialogRef<LinkPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('data: ', this.data);
    this.urlControl.valueChanges.subscribe(value => {
      if (!this.isTitleChanged) {
        this.titleControl.patchValue(value, { emitEvent: false });
      }
    });
    this.titleControl.valueChanges.subscribe(value => {
      this.isTitleChanged = true;
    });
    if (this.data) {
      if (this.data.title) {
        this.isTitleChanged = true;
        this.titleControl.patchValue(this.data.title, { emitEvent: false });
      }
      this.urlControl.patchValue(this.data.url);
    }
  }

  selectClick(): void {
    const title = this.titleControl.value;
    const url = this.urlControl.value;
    const data = { title, url };
    this.dialogRef?.close(data);
  }

  cancelClick(): void {
    this.dialogRef?.close();
  }
}
