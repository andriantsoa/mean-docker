import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-validation',
  templateUrl: './user-validation.component.html',
  styleUrls: ['./user-validation.component.scss']
})
export class UserValidationComponent implements OnInit {

  public validationForm: FormGroup;
  public attemptTry = 3;
  public validated = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
    this.validationForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      token: new FormControl('', [Validators.required]),
      setProfil: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.validationForm.controls.token.setValue(this.route.snapshot.queryParams[`validationKey`] || null);
  }

  get f(): FormGroup['controls'] {
    return this.validationForm.controls;
  }

  public validate(): void {
    if (this.validationForm.valid) {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.validationForm.value, null, 4));
      this.userService.validate({
        validationKey: this.validationForm.controls.token.value,
        username: this.validationForm.controls.username.value
      }).subscribe(response => {
        this.validated = true;
        const currentUser = this.userService.getCurrentUser();
        currentUser.active = true;
        this.userService.setCurrentUser(currentUser);
        if (this.validationForm.controls.setProfil.value === true) {
          this.router.navigate(['/dashboard/profil/', response.data._id]);
        }
      },
        err => {
          this.validated = false;
          this.attemptTry--;
          // alert('ERROR!! :-)\n\n' + JSON.stringify(err, null, 4));
        });
    } else {
      this.validated = false;
      this.attemptTry--;
      // alert('EROOR!! :-)\n\n' + JSON.stringify(this.validationForm.value, null, 4));
    }
  }

}
