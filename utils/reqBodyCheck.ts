import {StringArray} from "../types/user-entity";
import {ValidationError} from "./errors";

export const isReqBodyCorrect = (array: StringArray) => {
    if (array.length !== 5) {
        throw new ValidationError('Something went wrong..');
    }
    const uniqueColros = new Set(array);

    if (uniqueColros.size !== 5) {
        throw new ValidationError('Something went wrong');
    }

    const allowedColors = ['grey', 'green', 'red', 'blue', 'orange', 'purple', 'pink', 'yellow'];

    for (const color of array) {
        if (!allowedColors.includes(color)) {
            throw new ValidationError('Something went wrong');
        }
    }
    return true;
};