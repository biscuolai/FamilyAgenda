import { FormGroup } from '@angular/forms';

export class FormValidators {
  static checkFormValidators(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(fieldName => {
      console.log(fieldName);
      const control = formGroup.get(fieldName);
      control.markAsDirty();
      if (control instanceof FormGroup) {
        this.checkFormValidators(control);
      }
    });
  }

  static checkValidTouched(formGroup: FormGroup, fieldName: string) {
    return !formGroup.get(fieldName).valid && (formGroup.get(fieldName).touched || formGroup.get(fieldName).dirty);
  }

  static checkEmailInvalid(formGroup: FormGroup) {
    const emailField = formGroup.get('email');
    if (emailField.errors) {
      return emailField.errors['email'] && emailField.touched;
    }
  }

  // implements from iform-candeactivate
  static canExitPage(formGroup: FormGroup) {
    if (this.isFormDirty(formGroup)) {
      return confirm('Are you sure you want to exit the page?');
    }
    return true;
  }

  static isFormDirty(formGroup: FormGroup) {
    let result = false;
    Object.keys(formGroup.controls).forEach(name => {
      const control = formGroup.get(name);
      if (control.dirty) {
        result = true;
      }
      if (control instanceof FormGroup && result === false) {
        this.isFormDirty(control);
      }
    });

    return result;
  }
}
