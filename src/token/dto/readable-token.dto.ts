import { ApiProperty } from '@nestjs/swagger';

export class ReadableTokenDto {
  @ApiProperty()
  readonly access: string;
  @ApiProperty()
  readonly refresh: string;
}
