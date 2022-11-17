import { AbstractControl } from "@angular/forms"

export const ValidateUsername = (control: AbstractControl) => {
  if(!control.value.endsWith('.com')) {
    return {
      invalidFormat: true
    }
  }
  return null
}