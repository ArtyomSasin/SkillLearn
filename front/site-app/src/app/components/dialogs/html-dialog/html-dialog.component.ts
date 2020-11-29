import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-html-dialog',
  templateUrl: './html-dialog.component.html',
  styleUrls: ['./html-dialog.component.css']
})
export class HtmlDialogComponent implements OnInit {
  html: string;

  constructor(
    public dialogRef: MatDialogRef<string>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.html = this.data;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
