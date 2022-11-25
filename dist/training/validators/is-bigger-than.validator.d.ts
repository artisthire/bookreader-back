import { ValidationOptions } from 'class-validator';
export declare function IsBiggerThan(property: string, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
