import { Cars, Speed } from '../types/types';
import { serverPath, serverUrl } from '../variables/server';

async function getCars(url: string, path: string): Promise<Cars[]> {
  const response: Response = await fetch(`${url}${path}`);
  const data: Cars[] = await response.json();
  return data;
}

export async function setCar(url: string, path: string, car: Partial<Cars>): Promise<void> {
  await fetch(`${url}${path}`, {
    method: <string>'POST',
    headers: <HeadersInit>{
      'Content-type': 'application/json',
    },
    body: <string>JSON.stringify(car),
  });
}

export async function updateCar(
  url: string,
  path: string,
  id: string,
  car: Partial<Cars>,
): Promise<void> {
  await fetch(`${url}${path}/${id}`, {
    method: <string>'PATCH',
    headers: <HeadersInit>{
      'Content-type': 'application/json',
    },
    body: <string>JSON.stringify(car),
  });
}

export async function checkGarageLength(): Promise<number> {
  const allCars: Cars[] = await getCars(serverUrl, serverPath.garage);
  return allCars.length;
}

export async function deleteCar(url: string, path: string, id: string): Promise<void> {
  await fetch(`${url}${path}/${id}`, { method: <string>'DELETE' });
}

export async function getSpeed(url: string, path: string, id: string): Promise<Speed> {
  const response: Response = await fetch(`${url}${path}?id=${id}&status=started`, { method: <string>'PATCH' });
  const data: Promise<Speed> = await response.json();
  return data;
}

export async function sendStopCar(url: string, path: string, id: string): Promise<void> {
  await fetch(`${url}${path}?id=${id}&status=stopped`, { method: <string>'PATCH' });
}

export async function getDrive(url: string, path: string, id: string): Promise<boolean> {
  const res: Response = await fetch(`${url}${path}?id=${id}&status=drive`, { method: <string>'PATCH' });
  if (res.status === 500) {
    return false;
  }
  return true;
}

export default getCars;
