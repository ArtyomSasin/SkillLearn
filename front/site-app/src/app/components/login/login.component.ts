import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { getControlByError, getMessageByError } from 'src/app/shared/validation-map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });


  get email(): FormControl {
    return this.form.controls.email as FormControl;
  }
  get password(): FormControl {
    return this.form.controls.password as FormControl;
  }

  showProgress = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    if (this.form.valid) {
      this.showProgress = true;
      try {
        await this.authService.loginByEmail(this.form.controls.email.value, this.form.controls.password.value);
        await this.router.navigate(['/']);
      }
      catch (err) {
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
      }
      this.showProgress = false;
    }
  }
}
