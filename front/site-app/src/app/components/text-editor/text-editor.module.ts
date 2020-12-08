import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './text-editor.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { LinkPickerComponent } from './link-picker/link-picker.component';
import { LoadFileDialogModule } from '../dialogs/load-file-dialog/load-file-dialog.module';
import { CodeDialogModule } from '../dialogs/code-dialog/code-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LoadFileDialogModule,
    CodeDialogModule,
  ],
  exports: [TextEditorComponent, ColorPickerComponent, LinkPickerComponent],
  declarations: [TextEditorComponent, ColorPickerComponent, LinkPickerComponent]
})
export class TextEditorModule { }
