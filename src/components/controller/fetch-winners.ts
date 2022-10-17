import { Winner } from '../types/types';
import { serverPath, serverUrl } from '../variables/server';

async function getWinners(url: string, path: string): Promise<Winner[]> {
  const response: Response = await fetch(`${url}${path}`);
  const data: Winner[] = await response.json();
  return data;
}

export async function checkWinnersLength(): Promise<number> {
  const allCars: Winner[] = await getWinners(serverUrl, serverPath.winners);
  return allCars.length;
}

export async function setWinner(url: string, path: string, car: Partial<Winner>): Promise<void> {
  await fetch(`${url}${path}`, {
    method: <string>'POST',
    headers: <HeadersInit>{
      'Content-Type': 'application/json',
    },
    body: <string>JSON.stringify(car),
  });
}

export async function updateWinner(
  url: string,
  path: string,
  id: string,
  car: Partial<Winner>,
): Promise<void> {
  await fetch(`${url}${path}/${id}`, {
    method: <string>'PATCH',
    headers: <HeadersInit>{
      'Content-type': 'application/json',
    },
    body: <string>JSON.stringify(car),
  });
}

export async function updateWinners(
  url: string,
  path: string,
  car: Partial<Winner>,
): Promise<void> {
  await fetch(`${url}${path}`, {
    method: <string>'PATCH',
    headers: <HeadersInit>{
      'Content-type': 'application/json',
    },
    body: <string>JSON.stringify(car),
  });
}

export async function getWinnersForSort(
  url: string,
  path: string,
  value: string,
  type: string,
  page: string,
): Promise<Winner[]> {
  const response: Response = await fetch(`${url}${path}?_sort=${value}&_order=${type}&_limit=10&_page=${page}`);
  const data: Winner[] = await response.json();
  return data;
}

export default getWinners;
