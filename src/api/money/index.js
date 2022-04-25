import { BASE_URL, fetchCreator } from './baseAPI';

export function getExchangeRates() {
  return fetchCreator(BASE_URL);
}
