const rp = require('request-promise');



const getExchangeRate = async (from, to) => {
    try {
        var options = {
            uri: `http://api.fixer.io/latest?base=${from}`,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true 
        };
        var response = await rp(options);
        const rate = response.rates[to];
        if (!rate) {
            throw new Error('Non esiste rate');
        }
        return rate;
    } catch (error) {
        throw new Error(`Unable to get currency for ${from} and/or ${to}`);
    }
};

const getCuntries = async (currencyCode) => {
    try {
        var options = {
            uri: `https://restcountries.eu/rest/v2/currency/${currencyCode}`,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true 
        };
        var response = await rp(options);
        return response.map((country) => country.name);
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

// Deprecato
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

convertCurrencyAsync('EUR', 'USD', 140).then((status) => console.log(status)).catch((e) => {
    console.log(e.message);
});