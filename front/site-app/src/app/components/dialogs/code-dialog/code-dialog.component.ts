import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CodeFormatter } from 'src/app/code-formatter/code-formatter';
import { TokenNotFoundError } from 'src/app/code-formatter/models';

@Component({
  selector: 'app-code-dialog',
  templateUrl: './code-dialog.component.html',
  styleUrls: ['./code-dialog.component.css']
})
export class CodeDialogComponent implements OnInit {
  codeControl = new FormControl(null, [Validators.required]);
  langControl = new FormControl(null, [Validators.required]);

  formatter = new CodeFormatter();

  constructor(
    public dialogRef: MatDialogRef<CodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CodeModel,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.codeControl.patchValue(this.data.code);
    this.langControl.patchValue(this.data.language);
  }

  save(): void {
    if (this.codeControl.invalid || this.langControl.invalid) {
      return;
    }
    const code = this.codeControl.value as string;
    const language = this.langControl.value as string;
    let formatCode;
    try {
      formatCode = this.formatter.format(language, code);
    } catch (e) {
      let message = 'Ошибка!';
      if (e instanceof TokenNotFoundError) {
        message = e.message;
      }
      this.snackBar.open(message, 'ОК', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }
    this.dialogRef.close({ code: formatCode, language: this.langControl.value });
  }
}

export class CodeModel {
  code: string;
  language: string;
  languages: string[];

  constructor(
    code: string,
    language: string,
    languages: string[],
  ) {
    this.code = code;
    this.language = language;
    this.languages = languages;
  }
}
