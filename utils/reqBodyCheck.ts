import {StringArray} from "../types/user-entity";
import {ValidationError} from "./errors";

export const isReqBodyCorrect = (array: StringArray) => {
    if (array.length !== 5) {
        throw new ValidationError('Something went wrong..');
    }
    const uniqueColors = new Set(array);

    if (uniqueColors.size !== 5) {
        throw new ValidationError('Something went wrong');
    }

    const allowedColors = ['brown', 'green', 'red', 'blue', 'orange', 'purple', 'dgreen', 'yellow'];

    for (const color of array) {
        if (!allowedColors.includes(color)) {
            throw new ValidationError('Something went wrong');
        }
    }
    return true;
};