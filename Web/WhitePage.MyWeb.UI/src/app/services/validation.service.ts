import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationService {
    public validateNumber(input: AbstractControl): { valid: boolean } | null {

        if (input.value == null || input.value == "") {

            return null
        }
        return input.value > 0 && input.value < 99.01 ? null : { valid: false };
    };

    public emailValidator(input: AbstractControl) {

        var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (input.value == null) {
            return null;
        }

        if (input.value != "" && (input.value.length <= 5 || !emailRegExp.test(input.value))) {
            return { 'Please provide a valid email': true };
        }

        return null;
    }

    public validateYears(input: AbstractControl) {

        if (input.value == null || input.value == "") {
            return null;
        }

        return input.value >= 0 && input.value <= 99 ? null : { valid: false };
    }

    public numericValidator(input: AbstractControl) {

        var numericPattern = /^[0-9]*$/;

        if (input.value == null || input.value == "") {
            return null;
        }
        if (!numericPattern.test(input.value)) {
            return { 'Please provide a valid PIN': true };
        }
    }

    public mobileValidator(input: AbstractControl) {

        var mobilePattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

        if (input.value == null || input.value == "") {
            return null;
        }

        if (!mobilePattern.test(input.value)) {
            return { 'Please provide a valid phone': true };
        }

        return null;
    }
    public validateTime(input: AbstractControl) {
        var timePattern = /^\d+([/.]\d{1,2})?$/;

        if (input.value == null || input.value == "") {
            return null;
        }
        if (!timePattern.test(input.value)) {
            return { 'Please provide valid Hours': true };
        }
        return null;
    }
    public nameValidator(input: AbstractControl) {
        var namePattern = /^[A-z  /]+$/g

        if (input.value == null || input.value == "") {
            return null;
        }
        if (!namePattern.test(input.value)) {
            return { 'Please provide valid name': true };
        }
        return null;
    }
}