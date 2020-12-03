import { Component, Input, OnInit, } from '@angular/core';
import { FormControl, } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  @Input() html = '';
  formatBlockControl = new FormControl();
  fontFamilyControl = new FormControl();
  fontSizeControl = new FormControl();
  showPreview = false;
  editor: HTMLElement | null = null;
  selectionLength = 0;
  formatBlocks = [
    { id: 'div', name: 'Обычный текст' },
    { id: 'h1', name: 'Заголовок' },
    { id: 'h2', name: 'Подзаголовок 1' },
    { id: 'h3', name: 'Подзаголовок 2' },
    { id: 'p', name: 'Параграф' },
    { id: 'h6', name: 'Самый маленький текст' },
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

  constructor() { }

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
    this.formatDoc('formatBlock', 'div');
    this.formatDoc('removeFormat');
  }

  /** Размер шрифта */
  fontSize(size: string): void {
    this.formatDoc('fontsize', size);
  }

  /** Выбор выравнивания */
  selectJustify(): void { }
  selectLink(): void { }
  selectPhoto(): void { }
  selectTable(): void { }
  selectCode(): void { }
  selectQuote(): void { }
  selectFontSize(): void { }
  selectColor(): void { }
  selectBackgroundColor(): void { }

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
  addLink(url: string, text?: string): void {
    const html = '<a href="' + url + '" target="_blank">' + text ?? url + '</a>';
    this.formatDoc('insertHTML', html);
  }

  /** Изменение цвета  */
  changeColor(color: string): void {
    this.formatDoc('forecolor', color);
  }

  /** Форматирование документа */
  formatDoc(command: string, value?: string): boolean {
    const result = document.execCommand(command, false, value);
    console.log('command: ', command, 'result: ', result);
    // result = document.queryCommandEnabled(command);
    this.editor?.focus();
    if (!result) {
      console.warn(`ошибка форматирования!`);
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

  showHtml(): void {
    console.log(`html: ${this.editor?.innerHTML}`);
    console.log(`text: ${this.editor?.textContent}`);
  }

  updateMenu(): void {
    const selection = window.getSelection() ?? document.getSelection() ?? null;
    this.calculate(selection);
  }

  private calculate(selection: Selection | null): void {
    setTimeout(() => {
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

      /*if (this.selectionLength === 0) {
        this.fontFamilyControl.disable({ emitEvent: false });
        this.fontSizeControl.disable({ emitEvent: false });

      } else {
        this.fontFamilyControl.enable({ emitEvent: false });
        this.fontSizeControl.enable({ emitEvent: false });
      }*/
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
    let block: string;
    console.log(fontSize);

    if (!fontSize || fontSize.length === 0) {
      block = '3';
    } else {
      block = fontSize;
    }
    return this.fontSizes.find(b => b.id.toLowerCase() === block.toLowerCase()) ?? this.fontSizes[0];
  }
}
