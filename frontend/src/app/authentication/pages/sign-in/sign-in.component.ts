import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.signInForm.invalid) {
      return;
    }

    this.authenticationService.signIn(this.signInForm.value).subscribe({
      next: () => {
        this.router.navigate([this.redirectUrl]);
      },
      error: (error) => {
        this.signInForm.setErrors({ wrongCredentials: true });
      },
    });
  }

  public getErrorMessage(fieldName: string): string | null {
    const field = fieldName ? this.signInForm.get(fieldName) : this.signInForm;

    if (!field || !field.errors || !field.touched || !field.dirty) {
      return null;
    }

    if (field.errors['required']) {
      return 'Ce champ est obligatoire';
    }

    if (field.errors['email']) {
      return `L'email est incorrect`;
    }

    if (field.errors['wrongCredentials']) {
      return 'Les identifiants sont incorrects';
    }

    return null;
  }
}
