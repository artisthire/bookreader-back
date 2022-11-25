"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBiggerThan = void 0;
const class_validator_1 = require("class-validator");
function IsBiggerThan(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    if (typeof value !== 'number' ||
                        typeof relatedValue !== 'number' ||
                        value < relatedValue) {
                        return false;
                    }
                    return true;
                },
            },
        });
    };
}
exports.IsBiggerThan = IsBiggerThan;
//# sourceMappingURL=is-bigger-than.validator.js.map