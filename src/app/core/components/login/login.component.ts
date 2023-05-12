import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)
  });

  redirectUrl: string | null = null;
  private readonly subscriptions = new Subscription();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.resolveRedirectUrl();
  }

  login(): void {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authService.loginUser({username: username!, password: password!, redirectUrl: this.getRedirectUrl()});
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getRedirectUrl(): string {
    return this.redirectUrl ?? 'collections';
  }

  private resolveRedirectUrl(): void {
    this.subscriptions.add(
      this.activatedRoute.queryParamMap
        .subscribe(paramMap => this.redirectUrl = paramMap.get('redirectUrl'))
    );
  }
}
