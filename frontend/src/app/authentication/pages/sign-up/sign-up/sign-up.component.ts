import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { passwordMatchValidator } from '../../../validators/password-match.validator';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';

  signUpForm = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: passwordMatchValidator,
    }
  );

  public onSubmit(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    this.authenticationService.signUp(this.signUpForm.value).subscribe({
      next: () => {
        this.router.navigate(['/auth/sign-in']);
      },
      error: (error) => {
        this.signUpForm.setErrors({ wrongSignUp: true });
      },
    });
  }

  public getErrorMessage(fieldName: string): string | null {
    const field = fieldName ? this.signUpForm.get(fieldName) : this.signUpForm;

    if (!field || !field.errors || !field.touched || !field.dirty) {
      return null;
    }

    if (field.errors['required']) {
      return 'Ce champ est obligatoire';
    }

    if (field.errors['email']) {
      return `L'email est incorrect`;
    }

    if (field.errors['minlength']) {
      return `Le mot de passe doit avoir au moins ${field.errors['minlength'].requiredLength} caractères`;
    }

    if (field.errors['pattern']) {
      return `Le mot de passe doit contenir une minuscule, une majuscule, un chiffre, et un caractère non-alphanumérique`;
    }

    if (field.errors['passwordMismatch']) {
      return `Les mots de passe ne correspondent pas`;
    }

    if (field.errors['wrongSignUp']) {
      return "Une erreur est survenue lors de l'inscription";
    }

    return null;
  }
}
