import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { getMessageByError } from '../validation-map';

@Pipe({ name: 'customError' })
export class CustomErrorPipe implements PipeTransform {

    transform(errors: ValidationErrors | null): string | null {
        if (errors) {
            const arr = Object.keys(errors ?? []);
            return arr.map(error => {
                if (error === 'customError') {
                    return getMessageByError(errors[error]) ?? errors[error];
                }
                return getMessageByError(error);
            }).join(', ');
        }
        return null;
    }
}
