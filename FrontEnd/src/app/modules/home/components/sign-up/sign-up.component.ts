import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  digitValidator,
  lowerCaseValidator,
  noBlackListValidator,
  noWhitespaceValidator,
  upperCaseValidator,
  User,
} from '../../../../models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      pseudo: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(8),
        upperCaseValidator,
        lowerCaseValidator,
        digitValidator,
        noWhitespaceValidator,
        noBlackListValidator,
      ]),
    });
  }

  public signUp() {
    this.formGroup.markAsTouched();
    if (this.formGroup.valid) {
      const user = new User(
        this.formGroup.get('pseudo')?.value,
        this.formGroup.get('email')?.value,
        this.formGroup.get('password')?.value
      );

      this.authService.signUp(user).subscribe((res) => {
          this.authService.setUpToken(res)
        this.route.navigate(['dashboard']);
      });
    }
  }
}
