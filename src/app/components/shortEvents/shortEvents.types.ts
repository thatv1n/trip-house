export interface TypeParticipating {
  [count: string]: number;
}

export interface PropsShortEvents {
  id: string;
  imgEventsUrl: string;
  title: string;
  tags: string[];
  desc: string;
  date: string;
  place: string;
  participating: TypeParticipating;
}
