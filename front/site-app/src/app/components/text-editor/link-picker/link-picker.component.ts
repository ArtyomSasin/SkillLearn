import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-link-picker',
  templateUrl: './link-picker.component.html',
  styleUrls: ['./link-picker.component.css']
})
export class LinkPickerComponent implements OnInit {
  form = new FormGroup({
    url: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
  });
  saveClicked = false;
  isTitleChanged = false;

  constructor(
    public dialogRef: MatDialogRef<LinkPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('data: ', this.data);
    this.form.get('url')?.valueChanges.subscribe(value => {
      if (!this.isTitleChanged) {
        this.form.get('title')?.patchValue(value, { emitEvent: false });
      }
    });
    this.form.get('title')?.valueChanges.subscribe(value => {
      this.isTitleChanged = true;
    });
    if (this.data) {
      if (this.data.title) {
        this.isTitleChanged = true;
        this.form.get('title')?.patchValue(this.data.title, { emitEvent: false });
      }
      this.form.get('url')?.patchValue(this.data.url);
    }
  }

  selectClick(): void {
    this.saveClicked = true;
    if (this.form.valid) {
      const data = this.form.getRawValue();
      this.dialogRef?.close(data);
    }
  }

  cancelClick(): void {
    this.dialogRef?.close();
  }
}
