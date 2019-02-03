const axios = require('axios');

const getExchangeRateOld = (from, to) => {
  return axios.get('http://data.fixer.io/api/latest?access_key=fbd5b97a2f028ae32490049ce59067af').then((res) => {
    return res.data.rates[to] / res.data.rates[from];
  });
};

const getExchangeRate = async (from, to) => {
  const res = await axios.get('http://data.fixer.io/api/latest?access_key=fbd5b97a2f028ae32490049ce59067af');
  return res.data.rates[to] / res.data.rates[from];
};

const getCountries = async (currency) => {
  const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
  return res.data.map((country) => country.name);
};

const convertCurrency = (from, to, amount) => {
  let convertedAmount;
  return getExchangeRate(from, to).then((rate) => {
    _rate = rate;
    convertedAmount = (amount * rate).toFixed(2);
    console.log(convertedAmount);
    return getCountries(to);
  }).then((countries) => {
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
  });
};

const convertCurrencyAsync = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const convertedAmount = (amount * rate).toFixed(2);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
}

convertCurrencyAsync('USD', 'CNY', 100).then((result) => console.log(result));
