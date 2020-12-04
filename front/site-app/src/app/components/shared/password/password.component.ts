import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() autocomplete = 'current-password';
  hidePassword = true;

  constructor() { }

  ngOnInit(): void {
  }

}
