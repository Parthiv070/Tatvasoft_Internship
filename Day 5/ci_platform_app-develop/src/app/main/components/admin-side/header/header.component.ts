import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import dateFormat from 'dateformat';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/main/services/auth.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { APP_CONFIG } from 'src/app/main/configs/environment.config';
import { CommonModule } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { ClientService } from 'src/app/main/services/client.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BsDropdownModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  data: any;
  userDetail: any;
  loggedInUserDetail: any;
  private unsubscribe: Subscription[] = [];

  constructor(
    private _service: AuthService,
    private _clientService: ClientService,
    public _router: Router,
    private _toast: NgToastService
  ) {
    // Live time update
    setInterval(() => {
      const now = new Date();
      this.data = dateFormat(now, 'dddd mmmm dS, yyyy, h:MM:ss TT');
    }, 1000);
  }

  ngOnInit(): void {
    // Step 1: Get user from token
    const user = this._service.getUserDetail();

    // Step 2: Only call API if userId is valid
    if (user && user.userId) {
      this.loginUserDetailByUserId(user.userId);
    } else {
      console.error("User or User ID is not available.");
    }

    // Step 3: Subscribe to user name changes
    const userSubscription = this._service.getCurrentUser().subscribe((data: any) => {
      const userName = this._service.getUserFullName();
      this.userDetail = data == null ? userName : data.fullName;
    });

    this.unsubscribe.push(userSubscription);
  }

  // Load user detail from API by ID
  loginUserDetailByUserId(id: any) {
    const userDetailSubscribe = this._clientService.loginUserDetailById(id).subscribe(
      (data: any) => {
        if (data.result == 1) {
          this.loggedInUserDetail = data.data;
        } else {
          this._toast.error({
            detail: 'ERROR',
            summary: data.message,
            duration: APP_CONFIG.toastDuration,
          });
        }
      },
      (err) => {
        this._toast.error({
          detail: 'ERROR',
          summary: err.message || 'Something went wrong',
          duration: APP_CONFIG.toastDuration,
        });
      }
    );
    this.unsubscribe.push(userDetailSubscribe);
  }

  // Return full image path
  getFullImageUrl(relativePath: string): string {
    return relativePath ? `${APP_CONFIG.imageBaseUrl}/${relativePath}` : '';
  }

  // Logout method
  loggedOut() {
    this._service.loggedOut();
    this._router.navigate(['']);
  }

  // Cleanup subscriptions
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
