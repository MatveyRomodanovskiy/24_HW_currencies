const url = 'https://api.apilayer.com/fixer';
const apiKey = 'dpEm9NINFvKF6yDhrHmwY4SGHt9gwg4W';
const header = new Headers();
header.append("apikey", apiKey);
const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: header
};

export async function getAmount(request) {
    const {currencyFrom} = request;
    const {currencyTo} = request;
    const {amount} = request;
    try {
        const response = await fetch(`${url}/convert?to=${currencyTo}&from=${currencyFrom}&amount=${amount}`, requestOptions);
        if (response.ok) {
            const result = await response.json();
            request.result = result.result;
            return request;
        } else {
            throw new Error(response.status);
        }

    }catch (e) {
        console.log(e);
        return e;
    }
}
export async function getListOfCurrencies() {
    try {
        const response = await fetch(`${url}/symbols`, requestOptions);
        if (response.ok) {
            const result = await response.json();
//            console.log(result)
            return result.symbols;
        } else {
            throw new Error(response.status);
        }

    } catch (e) {
        console.log(e);
        return e;
    }
}

