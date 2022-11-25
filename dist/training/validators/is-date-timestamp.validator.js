"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDateTimestamp = void 0;
const class_validator_1 = require("class-validator");
function IsDateTimestamp(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    console.log('propertyName: ', propertyName);
                    console.log('value: ', value);
                    console.log('args.object: ', args.object);
                    return true;
                },
            },
        });
    };
}
exports.IsDateTimestamp = IsDateTimestamp;
//# sourceMappingURL=is-date-timestamp.validator.js.map