import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ValidateMongoId implements PipeTransform<string, string> {
  transform(value: string): string {
    if (ObjectId.isValid(value)) {
      if (String(new ObjectId(value)) === value) {
        return value;
      }

      throw new BadRequestException(`Invalid parameter 'id'`);
    }
    throw new BadRequestException(`Invalid parameter 'id'`);
  }
}
