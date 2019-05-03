import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../shared/service/authentication.service";


interface Response {
  response: string;
  result: {
    token: string;
  };
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @Input() atCheckout: boolean;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * Logs in user.
   */
  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(res => {
        const resObj = res as Response;
        if (resObj.response === "success") {
          this.authService.setLocalStorage(resObj.result.token);
          if (!this.atCheckout) this.router.navigateByUrl('/');
        }
      });
    }
  }

  /**
   * Checks, if there is a logged in user.
   */
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  /**
   * Logs out user.
   */
  logout() {
    this.authService.logout();
  }
}
