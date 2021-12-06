import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';
import {formatDate} from "@angular/common";

export interface AllValidationErrors {
  controlName: string;
  errorName: string;
  errorValue: any;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

export function checkUser(control: AbstractControl): { [key: string]: boolean } | null {
    let value = null;
    if (control && control.value != null) {
      value = control.value;
      if (value == null || value.trim().length === 0) {
        return {'required': true};
      }
      if (value.trim().length > 50) {
        return {'usersmaxlength': true};
      }
      return null;
    }
  }

export function notSpaceLogin(control: AbstractControl): { [key: string]: boolean } | null {
    let value = null;
    if (control && control.value != null) {
      value = control.value.trim();
      const regex = /^.*\s+.*$/;
      if (regex.test(value)) {
        return {'space': true};
      }
    }
    return null;
  }