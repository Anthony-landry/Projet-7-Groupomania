import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl(null, Validators.required),
    });
  }

  public signIn() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.authService
        .login(
          this.formGroup.get('email')?.value,
          this.formGroup.get('password')?.value
        )
        .subscribe({
          next: (res) => {
            this.authService.setUpToken(res);
            this.route.navigate(['dashboard']);
          },
          error: () => {
            this.snackBar.open("le password ou l'email est incorrect", '', {
              duration: 2000,
              panelClass: ['red'],
            });
          },
        });
    }
  }
}
