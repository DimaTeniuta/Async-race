import { Winner } from '../types/types';

export const arrBrokenCars: boolean[] = [];
export const arrIsWinner: boolean[] = [false];
export const arrIsCarOnTheWay: number[] = [0];
export const mapDrive = new Map<string, boolean>();
export const mapWinner = new Map<string, Winner>();
export const arrActiveBtnsPrevAndNext: boolean[] = [false, false];
export const INCREASE_PAGE = <number>1;
export const DECREASE_PAGE = <number>(-1);
export const mapUpdate = new Map<string, string>();
export const MINIMAL_COUNT_CARS_FOR_RACE = <number>2;
