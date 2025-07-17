import { AbstractControl } from "@angular/forms";

export function mustContainQuestionMark (control:AbstractControl)  {
  const value = control.value;
  if(value.includes('?')){
    return null;
  }
  return {mustContainQuestionMark:true};
}