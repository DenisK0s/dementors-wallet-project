import { toast } from 'react-toastify';

export const BASE_URL =
  'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';

export async function fetchCreator(url = '', option = {}) {
  try {
    const response = await fetch(url, option);

    if (response.ok) {
      const data = await response.json();
     
      return data.filter(item => item.ccy !== 'BTC');
    } else {
      toast('Something wrong');
    }
  } catch (error) {
    toast(error.message);
  }
}
