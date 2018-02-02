// const axios = require('axios');
const fetch = require('node-fetch');

const getExchangeRate = async (from, to) => {
    try {
        // const res = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        const res = await fetch(`http://api.fixer.io/latest?base=${from}`);
        const rate = res.data.rates[to];
        if (!rate) {
            throw new Error();
        }
        return rate;
    } catch (error) {
        throw new Error(`Unable to get currency for ${from} and/or ${to}`);
    }
};

const getCuntries = async (currencyCode) => {
    try {
        console.log("getCuntries");
        let response = await fetch('https://api.github.com');
        // only proceed once promise is resolved
        let data = await response.json();
        console.log(data);
        // const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        var res = await fetch(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        console.log(res.json());
        return res.data.map((country) => country.name);
    } catch (error) {
        console.log(error);
        throw new Error(`Unable to get country that use ${currencyCode}`, error.message);
    }
};

const convertCurrencyAsync = async (from, to, amount) => {
    let countries = await getCuntries(from);
    let rate = await getExchangeRate(from, to);
    const exchAmm = amount * rate;
    return `Async: ${amount} ${from} is worth ${exchAmm} ${to}. ${from} currency can be used in the following countries: ${countries.join(', ')}`;
};

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCuntries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchAmm = amount * rate;
        return `Standard: ${amount} ${from} is worth ${exchAmm} ${to}. ${to} currency can be used in the following countries: ${countries.join(', ')}`;
    });
};

// convertCurrency('EUR', 'USD', 140).then((status) => console.log(status));
convertCurrencyAsync('EUR', 'USD', 140).then((status) => console.log(status)).catch((e) => {
    console.log(e.message);
});
// getExchangeRate('EUR', 'USD').then((rate) => console.log(rate));
// getCuntries('EUR').then((names) => console.log(names));