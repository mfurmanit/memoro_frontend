import { BaseModel } from '@models/base-model';

export interface CardCollection extends BaseModel {
  name: string;
  icon: string;
  size: number;
}
