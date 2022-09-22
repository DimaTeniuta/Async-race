import { Path } from '../types/types';

export const serverUrl = <string>'http://127.0.0.1:3000';

export const serverPath: Path = {
  garage: '/garage',
  firstPage: '/garage?_limit=7&_page=1',
  somePage: '/garage?_limit=7&_page=',
  somePageWinner: '/winners?_limit=10&_page=',
  speed: '/engine',
  winners: '/winners/',
  wins: 'wins',
  time: 'time',
  id: 'id',
  up: 'ASC',
  down: 'DESC',
};

export const DURATION = <number>3000;
export const MAX_LENGTH_PAGE = <number>7;
export const MAX_LENGTH_WINNERS = <number>10;
