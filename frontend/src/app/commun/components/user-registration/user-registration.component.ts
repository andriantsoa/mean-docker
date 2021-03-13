import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ValidationService } from 'src/app/core/components';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services';
import { Role } from '../../enum/role.enum';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  // public rolesKey = Object.keys(Role);
  public Roles = Object.keys(Role)
    .filter(value => isNaN(Number(value)) === true)
    .map(key => ({ value: Role[key], label: key }));

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
      role: new FormControl(Role, [Validators.required]),
      acceptTerms: new FormControl(false, [Validators.requiredTrue]),
    }, {
      validator: this.validationService.MustMatch('password', 'confirmPassword')
    });
  }

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.formRegister.invalid) {
      // alert('What!! :-(\n\n' + JSON.stringify(this.formRegister.value, null, 4));

      return;
    }

    this.register();
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formRegister.value, null, 4));
  }

  public onReset(): void {
    this.submitted = false;
    this.formRegister.reset();
  }

  private toUser(formValue: any): IUser {
    const user = {
      title: formValue.title,
      firstname: formValue.firstname,
      lastname: formValue.lastname,
      username: formValue.username,
      email: formValue.email,
      password: formValue.password,
      role: formValue.role,
      notifications: {
        email: true,
        notifyByEmailOnTransfer: true
      },
      profils: [],
      active: true,
      birthdate: formValue.birthdate.toISOString(),
      nationality: 'MG',
      pays: 'MG',
      city: 'tana',
      adresse: 'atana'
    } as IUser;

    // const user = formValue as User;
    console.log(user);

    return user;
  }

  public register(): void {
    this.loading = true;
    const user = this.toUser(this.formRegister.value);
    this.userService.create(user)
      .pipe(finalize(() => this.loading = false))
      .subscribe((data) => {
        // this.toastrService.success('Registration successful');
        this.router.navigate(['/login']);
      });
  }

}
