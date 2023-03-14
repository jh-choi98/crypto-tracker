const BASE_URL = "https://api.coinpaprika.com/v1";
const CUR_API_KEY = process.env.REACT_APP_CUR_API_KEY!;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((response) => response.json());
}

export function fetchCurrencyExchange(currency: string) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": CUR_API_KEY,
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  return fetch(
    `https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=${currency}&q=1.0`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
