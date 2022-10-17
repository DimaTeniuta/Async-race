type DomElements =
  | HTMLElement
  | HTMLBodyElement
  | HTMLDivElement
  | HTMLButtonElement
  | HTMLInputElement
  | HTMLSpanElement;

export type ArrStr = string[];

export interface Cars {
  name: string;
  color: string;
  id: number;
}

export interface Path {
  garage: string;
  firstPage: string;
  somePage: string;
  somePageWinner: string;
  speed: string;
  winners: string;
  wins: string;
  time: string;
  id: string;
  up: string;
  down: string;
}

export interface Speed {
  velocity: number;
  distance: number;
}

export interface Shift {
  curPosition: number;
  shift: number;
  valueStop: number;
  flag: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
  color: string;
  name: string;
}

export interface ObjForRequest {
  sort: string;
  type: string;
}

export default DomElements;
