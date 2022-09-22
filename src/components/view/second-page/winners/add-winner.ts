import { deleteCar } from '../../../controller/fetch-cars';
import getWinners, { updateWinner } from '../../../controller/fetch-winners';
import { Winner } from '../../../types/types';
import { mapWinner } from '../../../variables/general-var';
import { serverPath, serverUrl } from '../../../variables/server';

function checkWinnerInGarage(id: string): void {
  if (mapWinner.has(id)) {
    mapWinner.delete(id);
  }
}

export async function checkWinnersInServer(): Promise<void> {
  const winners: Winner[] = await getWinners(serverUrl, serverPath.winners);

  winners.forEach(async (el: Winner): Promise<void> => {
    const id = <string>String(el.id);

    if (mapWinner.has(id)) {
      const winner = <Winner>mapWinner.get(id);
      const obj: Partial<Winner> = {
        wins: winner.wins,
        time: winner.time,
      };
      await updateWinner(serverUrl, serverPath.winners, id, obj);
    } else {
      await deleteCar(serverUrl, serverPath.winners, id);
    }
  });
}

export default checkWinnerInGarage;
