import { Control } from '@angular/common';


export class NumberValidator {

    static range(min, max){
        return (control: Control): { [key: string]: boolean } => {
            if (control.value < min ) {
                return { 'min': true };
            }
            else if(control.value > max){
                return { 'max' : true }
            }
            else if(isNaN(control.value)){
                return { 'NaN': true }
            }
            return null;
        };
    }

    static rangeHardCoded(control: Control){
        if (control.value && (isNaN(control.value) || control.value < 1 || control.value > 5)) {
            return { 'range': true };
        }
        return null;
    }
}
