const axios = require('axios');

const getExchangeRateOld = (from, to) => {
    return axios.get('http://data.fixer.io/api/latest?access_key=fbd5b97a2f028ae32490049ce59067af').then((res) => {
      return res.data.rates[to] / res.data.rates[from];
    });
};

const getExchangeRate = async (from, to) => {
  try {
    const res = await axios.get('http://data.fixer.io/api/latest?access_key=fbd5b97a2f028ae32490049ce59067af');
    const rate = res.data.rates[to] / res.data.rates[from];
    if (isNaN(rate)) {
      throw new Error();
    }
    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchage rate for ${from} and ${to}.`);
  }
};

const getCountries = async (currency) => {
  try {
    const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
    const countries = res.data.map((country) => country.name);
    if(!countries || countries.length === 0) {
      throw new Error();
    }
    return countries;
  } catch (e) {
    throw new Error(`Unable to get the countries for the currency ${currency}.`)
  }
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

convertCurrencyAsync('USD', 'GBP', 100).then((result) => console.log(result)).catch((e) => {
  console.log(e.message);
});
