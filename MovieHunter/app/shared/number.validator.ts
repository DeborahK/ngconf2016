import { Control } from '@angular/common';

// For simple validation with no parameters.
// Return type is a key/value pair
interface IValidationResult {
    [key: string]: boolean;
}

// For validation with parameters.
// Return type is a function that takes in a control
// and returns a key/value pair
interface IValidationFunction {
    (c: Control): IValidationResult;
}

export class NumberValidator {

    static range(min: number, max: number): IValidationFunction {
        return (control: Control): { [key: string]: boolean } => {
            if (control.value && (isNaN(control.value) || control.value < min || control.value > max)) {
                return { 'range': true };
            }
            return null;
        };
    }

    static rangeHardCoded(control: Control): IValidationResult {
        if (control.value && (isNaN(control.value) || control.value < 1 || control.value > 5)) {
            return { 'range': true };
        }
        return null;
    }
}
