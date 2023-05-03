import { Answer } from '@enums/answer';

export interface AnswerRequest {
  cardId: string;
  answer: Answer;
}
