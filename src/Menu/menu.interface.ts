export interface IMenu {
  type: string;
  text: string;
  code: string;
  url: string;
  parent?: string | null;
  ancestors?: string[];
  children?: IMenu[];
}
