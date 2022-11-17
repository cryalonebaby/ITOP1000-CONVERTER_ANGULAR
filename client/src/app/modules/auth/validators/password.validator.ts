import { AbstractControl } from "@angular/forms";

export const ValidatePassword = (control: AbstractControl) => {
  if(!control.value.match(/[@\_\-\!\?\#]/gi)) {
    return {
      invalidFormat: true
    }
  }
  return null
}