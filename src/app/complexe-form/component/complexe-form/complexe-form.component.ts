import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith, tap } from 'rxjs';
import { ComplexeFormService } from '../../services/complexe-form.service';

export function validValidator(): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (ctrl.value.includes('VALID')) {
      return null;
    } else {
      return {
        validValidator: ctrl.value,
      };
    }
  };
}
export function confirmEqualValidator(
  main: string,
  confirm: string
): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (!ctrl.get(main) || !ctrl.get(confirm)) {
      return {
        confirmEqual: 'Invalid control names',
      };
    }
    const mainValue = ctrl.get(main)!.value;
    const confirmValue = ctrl.get(confirm)!.value;

    return mainValue === confirmValue
      ? null
      : {
          confirmEqual: {
            main: mainValue,
            confirm: confirmValue,
          },
        };
  };
}
@Component({
  selector: 'app-complexe-form',
  templateUrl: './complexe-form.component.html',
  styleUrls: ['./complexe-form.component.css'],
})
export class ComplexeFormComponent implements OnInit {
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  phoneCtrl!: FormControl;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;
  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

  loading = false;
  constructor(
    private fb: FormBuilder,
    private complexFormService: ComplexeFormService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initFormObservables();
  }
  private initFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map((preference) => preference === 'email'),
      tap((showEmailCtrl) => this.setEmailValidators(showEmailCtrl))
    );
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map((preference) => preference === 'phone'),
      tap((showPhoneCtrl) => this.setPhoneValidators(showPhoneCtrl))
    );
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(
        (status) =>
          status === 'INVALID' &&
          this.emailCtrl.value &&
          this.confirmEmailCtrl.value
      )
    );
    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(
        (status) =>
          status === 'INVALID' &&
          this.passwordCtrl.value &&
          this.confirmPasswordCtrl.value &&
          this.loginInfoForm.hasError('confirmEqual')
      )
    );
  }

  private setEmailValidators(showEmailCtrl: boolean) {
    if (showEmailCtrl) {
      this.emailCtrl.addValidators([Validators.required, Validators.email]);
      this.confirmEmailCtrl.addValidators([
        Validators.required,
        Validators.email,
        validValidator(),
      ]);
    } else {
      this.emailCtrl.clearValidators();
      this.confirmEmailCtrl.clearValidators();
    }
    this.emailCtrl.updateValueAndValidity();
    this.confirmEmailCtrl.updateValueAndValidity();
  }

  private setPhoneValidators(showPhoneCtrl: boolean) {
    if (showPhoneCtrl) {
      this.phoneCtrl.addValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]);
    } else {
      this.phoneCtrl.clearValidators();
    }
    this.phoneCtrl.updateValueAndValidity();
  }

  private initForm() {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.contactPreferenceCtrl = this.fb.control('email');
    this.phoneCtrl = this.fb.control('');
    this.emailCtrl = this.fb.control('');
    this.confirmEmailCtrl = this.fb.control('');
    this.emailForm = this.fb.group(
      {
        email: this.emailCtrl,
        confirm: this.confirmEmailCtrl,
      },
      {
        validators: [confirmEqualValidator('email', 'confirm')],
        updateOn: 'blur',
      }
    );
    this.passwordCtrl = this.fb.control('', Validators.required);
    this.confirmPasswordCtrl = this.fb.control('', Validators.required);
    this.loginInfoForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl,
      },
      {
        validators: [confirmEqualValidator('password', 'confirmPassword')],
      }
    );

    this.mainForm = this.fb.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm,
    });
  }
  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return "Merci d'entrer une adresse mail valide";
    } else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
    } else if (ctrl.hasError('validValidator')) {
      return 'Ce texte ne contient pas le mot VALID';
    } else {
      return 'Ce champ contient une erreur';
    }
  }
  onSubmitForm() {
    this.loading = true;
    this.complexFormService
      .saveUserInfo(this.mainForm.value)
      .pipe(
        tap((saved) => {
          this.loading = false;
          if (saved) {
            this.mainForm.reset();
            this.contactPreferenceCtrl.patchValue('email');
          } else {
            console.error("Echec de l'enregistrement");
          }
        })
      )
      .subscribe();
  }
}
