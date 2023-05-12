import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordsValidator } from '@others/validators';
import { UserService } from '@services/user.service';
import { BaseComponent } from '@components/base/base.component';
import { SnackbarService } from '@services/snackbar.service';
import { Router } from '@angular/router';
import { PasswordErrorStateMatcher } from '@others/password-error-state-matcher';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  registerForm: FormGroup | undefined;
  matcher: ErrorStateMatcher = new PasswordErrorStateMatcher();

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private snackbarService: SnackbarService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    }, {validator: passwordsValidator});
  }

  onSubmit(): void {
    if (this.registerForm!.valid) {
      this.userService.register(this.registerForm!.value).subscribe(() => {
        this.snackbarService.openSnackBar(
          {message: 'messages.registered'}
        );
        this.router.navigate(['/login'], {replaceUrl: true})
      });
    }
  }
}
