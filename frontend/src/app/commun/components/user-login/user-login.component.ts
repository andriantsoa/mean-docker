import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/core/services';
import { LoginService } from './login.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted: boolean;
  returnUrl: any;
  loading: boolean;
  get f(): FormGroup['controls'] {
    return this.loginForm.controls;
  }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private cryptoJs: CryptoService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      rememberMe: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.submitted = false;
    this.loginService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || '/';
  }

  public login(): void {
    if (this.loginForm.valid) {
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));

      this.loading = true;
      this.loginService
        .login(
          this.loginForm.controls.email.value,
          this.loginForm.controls.password.value
          // this.cryptoJs.encrypt(this.loginForm.controls.password.value)
        )
        .subscribe(
          data => {
            this.loading = false;
            this.router.navigate([this.returnUrl]);
          },
          error => {
            // this.toastrService.error(error);
            this.loading = false;
          }
        );
    } else {
      alert('BAm!! :-( \n\n' + JSON.stringify(this.loginForm.value, null, 4));
      // this.toastrService.error('Please enter valid credentails');
    }
  }

}
