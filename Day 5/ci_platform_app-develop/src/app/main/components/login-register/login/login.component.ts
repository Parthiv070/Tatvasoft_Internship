import { NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { Subscription } from "rxjs";
import { APP_CONFIG } from "src/app/main/configs/environment.config";
import { AuthService } from "src/app/main/services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  formValid: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(
    private _fb: FormBuilder,
    private _service: AuthService,
    private _router: Router,
    private _toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this._fb.group({
      emailAddress: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  get emailAddress() {
    return this.loginForm.get("emailAddress") as FormControl;
  }

  get password() {
    return this.loginForm.get("password") as FormControl;
  }

  onSubmit() {
    this.formValid = true;

    if (this.loginForm.valid) {
      const loginData = {
  EmailAddress: this.loginForm.value.emailAddress,
  Password: this.loginForm.value.password,
};

      const loginSub = this._service.loginUser(loginData).subscribe({
        next: (res: any) => {
          if (res.result === 1 && res.data.message === "Login Successfully") {
            this._service.setToken(res.data.data);
            const tokenPayload = this._service.decodedToken();
            this._service.setCurrentUser(tokenPayload);

            this._toast.success({
              detail: "SUCCESS",
              summary: res.data.message,
              duration: APP_CONFIG.toastDuration,
            });

            const redirectPath = tokenPayload.userType === "admin" ? "admin/dashboard" : "/home";
            this._router.navigate([redirectPath]);
          } else {
            this._toast.error({
              detail: "ERROR",
              summary: res.data?.message || "Login failed",
              duration: APP_CONFIG.toastDuration,
            });
          }
        },
        error: (err) => {
          this._toast.error({
            detail: "ERROR",
            summary: err.error?.message || "Server error occurred",
            duration: APP_CONFIG.toastDuration,
          });
        },
      });

      this.formValid = false;
      this.unsubscribe.push(loginSub);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
