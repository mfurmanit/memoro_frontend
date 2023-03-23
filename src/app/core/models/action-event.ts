import { BaseModel } from '@models/base-model';
import { ActionType } from '../enums/action-type';

export interface ActionEvent<T extends BaseModel> {
  element?: T;
  type: ActionType;
}
