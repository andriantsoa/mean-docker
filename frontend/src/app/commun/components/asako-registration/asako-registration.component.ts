import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/core/components';
import { CryptoService, UserService } from 'src/app/core/services';

@Component({
  selector: 'app-asako-registration',
  templateUrl: './asako-registration.component.html',
  styleUrls: ['./asako-registration.component.css']
})
export class AsakoRegistrationComponent implements OnInit {

  public Roles: any = ['Admin', 'Entreprise', 'Candidat'];
  public titles: any = ['Mr', 'Mme'];

  public formRegister: FormGroup;
  public submitted: boolean;
  loading: boolean;
  get f(): FormGroup['controls'] {
    return this.formRegister.controls;
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private validationService: ValidationService,
    private userService: UserService,
    private cryptService: CryptoService,
  ) {
    this.formRegister = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      firstname: new FormControl('', [Validators.required, Validators.minLength(1)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(1)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthdate: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required]),
      city: new FormControl(''),
      role: new FormControl(this.Roles[3], [Validators.required]),
      acceptTerms:  new FormControl(false, [Validators.requiredTrue]),
    }, {
      validator: this.validationService.MustMatch('password', 'confirmPassword')
    });
  }

  public ngOnInit(): void {
  }

  public onSubmit(): void{
    this.submitted = true;

    if (this.formRegister.invalid) {
      alert('What!! :-(\n\n' + JSON.stringify(this.formRegister.value, null, 4));

      return;
    }

    this.register();
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formRegister.value, null, 4));
  }

  public onReset(): void {
    this.submitted = false;
    this.formRegister.reset();
  }

  public register(): void {
    this.loading = true;
    // this.formRegister.controls.password.setValue(this.cryptService.encrypt(this.formRegister.controls.password.value));
    // this.formRegister.controls.confirmPassword.setValue(this.cryptService.encrypt(this.formRegister.controls.confirmPassword.value));
    this.userService.create(this.formRegister.value).subscribe(
      (data) => {
        // this.toastrService.success('Registration successful');
        this.router.navigate(['/login']);
        console.log(data);
      },
      (error) => {
        // this.toastrService.error(error);
        this.loading = false;
      }
    );
  }

}
