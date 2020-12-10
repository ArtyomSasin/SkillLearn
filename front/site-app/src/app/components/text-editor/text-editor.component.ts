import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormControl, } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from 'src/app/services/file.service';
import { ColorGroup } from 'src/app/shared/models/color';
import { CodeDialogComponent } from '../dialogs/code-dialog/code-dialog.component';
import { HtmlDialogComponent } from '../dialogs/html-dialog/html-dialog.component';
import { LoadFileDialogComponent } from '../dialogs/load-file-dialog/load-file-dialog.component';
import { LinkPickerComponent } from './link-picker/link-picker.component';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  @Input() label = '';
  @Input() html = '';
  @Input() userId: string | null = null;

  formatBlockControl = new FormControl();
  fontFamilyControl = new FormControl();
  fontSizeControl = new FormControl();

  private editor: HTMLElement | null = null;
  private savedRange: Range | null = null;
  selectionLength = 0;
  formatBlocks = [
    { id: 'div', name: 'Обычный текст' },
    { id: 'h1', name: 'Заголовок 1' },
    { id: 'h2', name: 'Заголовок 2' },
    { id: 'h3', name: 'Заголовок 3' },
    { id: 'h4', name: 'Заголовок 4' },
    { id: 'h5', name: 'Заголовок 5' },
    { id: 'h6', name: 'Заголовок 6' },
    { id: 'p', name: 'Параграф' },
  ];
  fontFamilies = ['Raleway', 'Helvetica Neue', 'Roboto', 'Arial', 'Times New Roman'];
  fontSizes = [
    { id: '1', name: 'Малюсенький', size: '9px' },
    { id: '2', name: 'Маленький', size: '12px' },
    { id: '3', name: 'Нормальный', size: '14px' },
    { id: '4', name: 'Большеват', size: '16px' },
    { id: '5', name: 'Большой', size: '18px' },
    { id: '6', name: 'Большущий', size: '24px' },
    { id: '7', name: 'Огромный', size: '32px' },
  ];
  colorGroups: ColorGroup[] = [
    { title: 'BLACK & WHITE', colors: ['#000000', '#FFFFFF'] },
    {
      title: 'Red 50', colors: [
        '#FFEBEE', '#FFCDD2', '#EF9A9A',
        '#E57373', '#EF5350', '#F44336',
        '#E53935', '#D32F2F', '#C62828',
        '#B71C1C', '#FF8A80', '#FF5252',
        '#FF1744', '#D50000']
    },
    {
      title: 'Pink 50', colors: [
        '#FCE4EC', '#F8BBD0', '#F48FB1',
        '#F06292', '#EC407A', '#E91E63',
        '#D81B60', '#C2185B', '#AD1457',
        '#880E4F', '#FF80AB', '#FF4081',
        '#F50057', '#C51162']
    },
    {
      title: 'Purple 50', colors: [
        '#F3E5F5', '#E1BEE7', '#CE93D8',
        '#BA68C8', '#AB47BC', '#9C27B0',
        '#8E24AA', '#7B1FA2', '#6A1B9A',
        '#4A148C', '#EA80FC', '#E040FB',
        '#D500F9', '#AA00FF']
    },
    {
      title: 'Deep Purple 50', colors: [
        '#EDE7F6', '#D1C4E9', '#B39DDB',
        '#9575CD', '#7E57C2', '#673AB7',
        '#5E35B1', '#512DA8', '#4527A0',
        '#311B92', '#B388FF', '#7C4DFF',
        '#651FFF', '#6200EA']
    },
    {
      title: 'Indigo 50', colors: [
        '#E8EAF6', '#C5CAE9', '#9FA8DA',
        '#7986CB', '#5C6BC0', '#3F51B5',
        '#3949AB', '#303F9F', '#283593',
        '#1A237E', '#8C9EFF', '#536DFE',
        '#3D5AFE', '#304FFE']
    },
    {
      title: 'Blue 50', colors: [
        '#E3F2FD', '#BBDEFB', '#90CAF9',
        '#64B5F6', '#42A5F5', '#2196F3',
        '#1E88E5', '#1976D2', '#1565C0',
        '#0D47A1', '#82B1FF', '#448AFF',
        '#2979FF', '#2962FF']
    },
    {
      title: 'Light Blue 50', colors: [
        '#E1F5FE', '#B3E5FC', '#81D4FA',
        '#4FC3F7', '#29B6F6', '#03A9F4',
        '#039BE5', '#0288D1', '#0277BD',
        '#01579B', '#80D8FF', '#40C4FF',
        '#00B0FF', '#0091EA']
    },
    {
      title: 'Cyan 50', colors: [
        '#E0F7FA', '#B2EBF2', '#80DEEA',
        '#4DD0E1', '#26C6DA', '#00BCD4',
        '#00ACC1', '#0097A7', '#00838F',
        '#006064', '#84FFFF', '#18FFFF',
        '#00E5FF', '#00B8D4']
    },
    {
      title: 'Teal 50', colors: [
        '#E0F2F1', '#B2DFDB', '#80CBC4',
        '#4DB6AC', '#26A69A', '#009688',
        '#00897B', '#00796B', '#00695C',
        '#004D40', '#A7FFEB', '#64FFDA',
        '#1DE9B6', '#00BFA5']
    },
    {
      title: 'Green 50', colors: [
        '#E8F5E9', '#C8E6C9', '#A5D6A7',
        '#81C784', '#66BB6A', '#4CAF50',
        '#43A047', '#388E3C', '#2E7D32',
        '#1B5E20', '#B9F6CA', '#69F0AE',
        '#00E676', '#00C853']
    },
    {
      title: 'Light Green 50', colors: [
        '#F1F8E9', '#DCEDC8', '#C5E1A5',
        '#AED581', '#9CCC65', '#8BC34A',
        '#7CB342', '#689F38', '#558B2F',
        '#33691E', '#CCFF90', '#B2FF59',
        '#76FF03', '#64DD17']
    },
    {
      title: 'Lime 50', colors: ['#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39', '#C0CA33',
        '#AFB42B', '#9E9D24', '#827717', '#F4FF81', '#EEFF41', '#C6FF00', '#AEEA00']
    },
    {
      title: 'Yellow 50', colors: ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B',
        '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFFF8D', '#FFFF00', '#FFEA00',
        '#FFD600']
    },
    {
      title: 'Amber 50', colors: ['#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28',
        '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFE57F', '#FFD740',
        '#FFC400', '#FFAB00']
    },
    {
      title: 'Orange 50', colors: ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D',
        '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFD180',
        '#FFAB40', '#FF9100', '#FF6D00']
    },
    {
      title: 'Deep Orange 50', colors: ['#FBE9E7', '#FFCCBC', '#FFAB91',
        '#FF8A65', '#FF7043', '#FF5722', '#F4511E', '#E64A19', '#D84315', '#BF360C',
        '#FF9E80', '#FF6E40', '#FF3D00', '#DD2C00']
    },
    {
      title: 'Brown 50', colors: ['#EFEBE9', '#D7CCC8',
        '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#4E342E',
        '#3E2723']
    },
    {
      title: 'Grey 50', colors: ['#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD',
        '#9E9E9E', '#757575', '#616161', '#424242', '#212121']
    },
    {
      title: 'Blue Grey 50', colors: ['#ECEFF1',
        '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A', '#455A64',
        '#37474F', '#263238']
    },
  ];

  color = 'black';
  backgroundColor = 'transparent';

  showColor = false;
  showBackgroundColor = false;
  menuEnabled = false;

  public get content(): string {
    return this.editor?.innerHTML ?? '';
  }

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fileService: FileService,
  ) { }

  ngOnInit(): void {
    this.editor = document.getElementById('editor');
    this.formatBlockControl.valueChanges.subscribe(value => {
      this.formatDoc('formatBlock', value.id);
    });
    this.fontFamilyControl.valueChanges.subscribe(value => {
      this.formatDoc('fontname', value);
    });
    this.fontSizeControl.valueChanges.subscribe(value => {
      this.formatDoc('fontsize', value.id);
    });
  }

  compareById(a1: any, a2: any): boolean {
    return a1 && a2 && a1.id === a2.id;
  }
  compareBy(a1: any, a2: any): boolean {
    return a1 && a2 && a1 === a2;
  }
  /** Назад */
  undo(): void {
    this.formatDoc('undo');
  }
  /** Вперёд */
  redo(): void {
    this.formatDoc('redo');
  }

  add(): void {

  }

  /** Сбросить форматирование */
  formatClear(): void {
    this.formatDoc('selectAll');
    // Запоминам selection
    this.saveSelection();
    const content = this.savedRange?.cloneContents();
    const text = content?.textContent;
    this.formatDoc('insertHTML', text ?? '');
  }

  /** Размер шрифта */
  fontSize(size: string): void {
    this.formatDoc('fontsize', size);
  }

  /** Открытие окна со ссылкой  */
  private openLinkDialog(): void {
    // Запоминам selection
    this.saveSelection();

    let title; let url;

    // Если выделен текст
    if (this.selectionLength > 0) {
      const content = this.savedRange?.cloneContents();
      const ancestor = this.savedRange?.commonAncestorContainer;
      const tagName = ancestor?.nodeName?.toLowerCase();

      title = content?.textContent;

      // Если tagName - text, смотрим родительский тэг
      // и если он ссылка, извлекаем url и title
      if (tagName === '#text') {
        const parent = ancestor?.parentElement;
        if (parent?.tagName?.toLowerCase() === 'a') {
          url = parent.getAttribute('href');
          title = parent.textContent;
        }
      }
    }

    // Передаем в окно текст ссылки и ее url
    this.dialog.open(LinkPickerComponent, {
      data: { url: url ?? '', title: title ?? '' }
    }).afterClosed().subscribe(value => {
      this.restoreSelection();
      if (value) {
        this.addLink(value);
      }
    });
  }
  private openPhotoDialog(): void {
    // Запоминам selection
    this.saveSelection();
    if (!this.userId) {
      throw Error('userId is null');
    }
    const filePath = `user-uploads/${this.userId}/`;
    // Передаем в окно текст ссылки и ее url
    this.dialog.open(LoadFileDialogComponent, {
      data: {
        title: 'Выберите изображение',
        fileTypes: ['image/*'],
        upload: (file: File) => this.fileService.upload(file, filePath),
        exists: (file: File) => this.fileService.isExists(`${filePath}/${file.name}`)
      }
    }).afterClosed().subscribe(value => {
      this.restoreSelection();
      if (value) {
        this.addPhoto(value);
      }
    });
  }
  private openTableDialog(): void { }
  private openCodeDialog(): void {
    // Запоминам selection
    this.saveSelection();

    const node = this.savedRange?.commonAncestorContainer;

    let current = (node && node as HTMLElement) ? node as HTMLElement : node?.parentElement;
    let tagName = current?.nodeName?.toLowerCase();
    let code; let language;

    // смотрим родительский тэг
    if (tagName === '#text' || tagName === 'code' || tagName === 'pre') {
      do {
        if (tagName === 'pre') {
          if (current?.childElementCount ?? 0 >= 2) {
            current = current?.children[2] as HTMLElement;
            code = current?.textContent;
            language = current?.getAttribute('lang');
          }
          break;
        } else if (tagName === 'code') {
          code = current?.textContent;
          language = current?.getAttribute('lang');
          break;
        } else {
          current = current?.parentElement ?? null;
          tagName = current?.tagName?.toLowerCase();
        }
      } while (current !== null);
    }

    this.dialog.open(CodeDialogComponent, {
      data: {
        code,
        language: language ?? 'dart',
        languages: ['dart']
      },
      autoFocus: false,
    }).afterClosed().subscribe(value => {
      this.restoreSelection();
      console.log('current: ', current);
      if (value) {
        // если current - pre или code, удаляем старый контент
        if (current?.tagName?.toLowerCase() === 'pre') {
          current?.remove();
        } else if (current?.tagName?.toLowerCase() === 'code' &&
          current?.parentElement?.tagName?.toLowerCase() === 'pre') {
          current = current.parentElement;
          current?.remove();
        }
        this.addCode(value.code);
      }
    });
  }
  private openQuoteDialog(): void { }

  /** Очистка текста */
  clearText(): void {
    this.formatDoc('selectAll');
    this.formatDoc('delete');
  }

  /** Вставить цитату */
  addBlockquote(): void {
    this.formatDoc('formatblock', 'blockquote');
  }
  /** Вставить ссылку */
  private addLink(model: any): void {
    const html = '<a href="' + model.url + '" target="_blank">' + (model.title ?? model.url) + '</a>';
    this.formatDoc('insertHTML', html);
  }

  /** Вставить изоображение */
  private addPhoto(url: string): void {
    const img = `<img src="${url}">`;
    this.formatDoc('insertHTML', img);
  }

  private addCode(code: string): void {
    this.formatDoc('insertHTML', code);
  }

  /** Изменение цвета  */
  changeColor(color: string): void {
    this.showColor = false;
    this.color = color;
    this.formatDoc('forecolor', color);
  }

  /** Изменение цвета  */
  changeBackgroundColor(color: string): void {
    this.showBackgroundColor = false;
    this.backgroundColor = color;
    this.formatDoc('backcolor', color);
  }

  /** Форматирование документа */
  formatDoc(command: string, value?: string): boolean {
    const result = document.execCommand(command, false, value);
    // result = document.queryCommandEnabled(command);
    this.editor?.focus();
    if (!result) {
      console.warn(`Ошибка форматирования! command: `, command);
    } else {
      this.updateMenu();
    }
    return result;
  }

  /** Возвращает установлен ли у элеменнта параметр command */
  isFormat(command: string): boolean {
    let result = false;
    if (document.queryCommandState) {
      result = document.queryCommandState(command);
    }
    return result;
  }

  getFormatValue(command: string): string | null {
    if (document.queryCommandValue) {
      return document.queryCommandValue(command);
    }
    return null;
  }

  updateMenu(): void {
    const selection = window.getSelection() ?? document.getSelection() ?? null;
    this.calculate(selection);
  }

  /** Запоминает место выделения/фокуса */
  private saveSelection(): void {
    this.savedRange = null;
    // Взято с https://stackoverflow.com/questions/1181700/set-cursor-position-on-contenteditable-div
    if (document.getSelection) {
      if (document?.getSelection()?.rangeCount ?? 0 > 0) {
        this.savedRange = document.getSelection()?.getRangeAt(0) ?? null;
      }
    } else {
      this.savedRange = document.createRange(); // IE
    }
  }

  isLinkSelected(): boolean {
    if (!this.savedRange) {
      return false;
    }
    const ancestor = this.savedRange?.commonAncestorContainer;
    const tagName = ancestor?.nodeName?.toLowerCase();
    if (tagName === '#text') {
      const parent = ancestor?.parentElement;
      if (parent?.tagName?.toLowerCase() === 'a') {
        return true;
      }
    }
    return false;
  }

  openDialog(dialogType: string): void {
    if (!this.menuEnabled) { return; }
    switch (dialogType) {
      case 'link': this.openLinkDialog(); break;
      case 'photo': this.openPhotoDialog(); break;
      case 'code': this.openCodeDialog(); break;
      case 'quote': this.openQuoteDialog(); break;
      case 'table': this.openTableDialog(); break;
      default: console.warn('Неизвестная комманда: ', dialogType);
    }
  }

  editorBlur(): void {
    this.menuEnabled = false;
    console.log('editor blure');
  }

  editorFocus(): void {
    this.menuEnabled = true;
  }

  editorPaste($event: ClipboardEvent): void {
    const types = $event.clipboardData?.types ?? [];
    console.log('types: ', types);
    if (types.find(t => t.toLowerCase() === 'files')) {
      this.snackBar.open('Вставка файла из буфера обмена запрещена! Если вы хотите добавить изображение, нажмите "Добавить изображение" в меню.',
        'ок',
        {
          // duration: 3000,
          panelClass: 'warn',
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      $event.preventDefault();
    }
  }

  /** Восстанавливает фокус в editor на прошлое место */
  private restoreSelection(): void {
    // Взято с https://stackoverflow.com/questions/1181700/set-cursor-position-on-contenteditable-div
    this.editor?.focus();
    if (this.savedRange != null) {
      if (document.getSelection()) {
        const s = window.getSelection();
        if (s && s.rangeCount > 0) {
          s?.removeAllRanges();
        }
        s?.addRange(this.savedRange);
      }
      else if (document.createRange()) {
        document.getSelection()?.addRange(this.savedRange);
      }
    }
  }

  private calculate(selection: Selection | null): void {
    setTimeout(() => {
      this.saveSelection();
      this.selectionLength = selection?.toString()?.length ?? 0;

      // Стиль текста
      const formatBlockValue = this.getAvailableFontBlock(this.getFormatValue('formatBlock'));
      this.formatBlockControl.patchValue(formatBlockValue, { emitEvent: false });

      // Шрифт
      const fontFamily = this.getFormatValue('fontname')?.toLowerCase() ?? null;
      this.fontFamilyControl.patchValue(this.getAvailableFontFamily(fontFamily), { emitEvent: false });

      // Размер шрифта
      const fontSize = this.getFormatValue('fontsize')?.toLowerCase() ?? null;
      this.fontSizeControl.patchValue(this.getAvailableFontSize(fontSize), { emitEvent: false });

      // Цвета
      this.color = this.formatColor(this.getFormatValue('forecolor') ?? 'black');
      this.backgroundColor = this.formatColor(this.getFormatValue('backcolor') ?? 'transparent');
    });
  }

  private getAvailableFontBlock(fontBlock: string | null): any {
    let block: string;
    if (!fontBlock || fontBlock.length === 0) {
      block = 'div';
    } else {
      block = fontBlock;
    }
    return this.formatBlocks.find(b => b.id.toLowerCase() === block.toLowerCase()) ?? this.formatBlocks[0];
  }

  private formatColor(source: string): string {
    if (source.startsWith('rgb(') && source.endsWith(')')) {
      const s = source.replace('rgb(', '').replace(')', '').trim();
      const rgb = s.split(',').map(c => Number.parseInt(c.trim(), 10));
      if (!rgb || rgb.length !== 3) {
        return source;
      }
      return this.rgbToHex(rgb[0], rgb[1], rgb[2]);
    }
    return source;
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return '#' + this.toHex(r) + this.toHex(g) + this.toHex(b);
  }

  private toHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  private getAvailableFontFamily(fontFamily: string | null): string {
    let result;
    const def = this.fontFamilies[0];
    if (!fontFamily || fontFamily.length === 0) {
      result = def;
    } else {
      // Может прилететь массив шрифтов
      const arr = fontFamily.split(',');
      // Если это не массив, то добавляем к нему fontFamily
      if (!arr || arr.length === 0) {
        arr.push(fontFamily);
      }
      // Перебираем все элементы
      for (const item of arr) {
        const f = item.split('"').join('').trim().toLowerCase();
        result = this.fontFamilies.find(_ => _.toLowerCase() === f);
        if (result) {
          break;
        }
      }
    }
    return result ?? def;
  }

  private getAvailableFontSize(fontSize: string | null): any {
    let size: string;

    if (!fontSize || fontSize.length === 0) {
      size = '3';
    } else {
      size = fontSize;
    }
    return this.fontSizes.find(b => b.id.toLowerCase() === size.toLowerCase()) ?? this.fontSizes[0];
  }
}
