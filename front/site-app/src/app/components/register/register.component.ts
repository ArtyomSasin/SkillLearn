import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { getControlByError, getMessageByError } from 'src/app/shared/validation-map';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form = this.fb.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  showProgress = false;

  get email(): FormControl {
    return this.form.controls.email as FormControl;
  }
  get password(): FormControl {
    return this.form.controls.password as FormControl;
  }
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  register(): void {
    if (this.form.valid) {
      this.showProgress = true;
      this.authService.registerByEmail(this.form.controls.email.value, this.form.controls.password.value)
        .then(res => {
          this.router.navigate(['']);
        }, err => {
          console.error(err);
          const code = err?.code;
          if (code) {
            const control = getControlByError(code);
            const message = getMessageByError(code);
            console.log(`control: ${control}, message: ${message}`);

            if (control && message) {
              this.form.get(control)?.setErrors({ customError: message });
              this.snackBar.open(message, 'ОК', {
                duration: 5000,
              });
            }
          } else {
            this.snackBar.open(err.message, 'ОК', {
              duration: 5000,
            });
          }
        });
      this.showProgress = false;
    }
  }
}
