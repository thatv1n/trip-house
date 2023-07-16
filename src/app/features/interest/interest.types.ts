import { InterestEntity } from '@/types';

export interface InterestState {
  interests: Record<string, InterestEntity>;
  interestIds: string[];
}
