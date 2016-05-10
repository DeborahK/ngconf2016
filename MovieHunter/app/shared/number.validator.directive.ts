import {Directive, provide, Attribute, forwardRef} from '@angular/core';
import {NG_VALIDATORS, Validator, AbstractControl} from '@angular/common';
import {NumberValidator} from './number.validator';

export const RANGE_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => RangeValidator),
    multi: true
};

@Directive({
    selector: '[range][ngControl]',
    providers: [RANGE_VALIDATOR]
})
export class RangeValidator implements Validator {
    private _validator:(c:AbstractControl)=> any;

    constructor(@Attribute('range') range:string) {
        const [min, max] = range.split(',').map(v => parseInt(v));
        this._validator = NumberValidator.range(min, max);
    }

    validate(c:AbstractControl):{} {
        return this._validator(c)
    }
}