export interface IModal {
  isModalClose: (data: string) => void;
  title: string;
  body: string;
  children?: any
}