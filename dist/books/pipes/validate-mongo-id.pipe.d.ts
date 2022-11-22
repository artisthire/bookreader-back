import { PipeTransform } from '@nestjs/common';
export declare class ValidateMongoId implements PipeTransform<string, string> {
    transform(value: string): string;
}
