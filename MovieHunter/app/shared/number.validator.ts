import { Control, AbstractControl } from "angular2/common";

interface ValidationResult {
    [key: string]: boolean;
}

export class NumberValidator {

    static range(min: number, max: number): { (c: AbstractControl): { [key: string]: any }; } {
        return (control: AbstractControl): { [key: string]: any } => {
            // Don't validate if it is empty
            if (control.value && (isNaN(control.value) || control.value < 1 || control.value > 5)) {
                return { 'range': true };
            }
            return null;
        };
    }

    static rangeHardCoded(control: Control): ValidationResult {
        // Don't validate if it is empty
        if (control.value && (isNaN(control.value) || control.value < 1 || control.value > 5)) {
            return { 'range': true };
        }

        return null;
    }
}