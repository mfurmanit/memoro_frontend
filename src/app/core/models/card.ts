import { BaseModel } from '@models/base-model';

export interface Card extends BaseModel {
  front: string;
  back: string;
  favorite: boolean;
}
