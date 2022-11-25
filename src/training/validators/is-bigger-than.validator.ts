import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsBiggerThan(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          if (
            typeof value !== 'number' ||
            typeof relatedValue !== 'number' ||
            value < relatedValue
          ) {
            return false;
          }

          return true;
        },
      },
    });
  };
}
