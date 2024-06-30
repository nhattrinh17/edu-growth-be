import { PartialType } from '@nestjs/mapped-types';
import { CreateEduLevelDto } from './create-edu-level.dto';

export class UpdateEduLevelDto extends PartialType(CreateEduLevelDto) {}
