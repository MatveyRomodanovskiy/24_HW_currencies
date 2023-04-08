import {getAmount, getListOfCurrencies } from "./data-manipulation.js";
import {DataForm} from "./data-form.js";
import {createInfoElement} from "./tools.js";

const formTitle = createInfoElement('Currency exchange calculator', 'h2');
input.append(formTitle);
const dataForm = new DataForm( 'input');

async function displayResult(request) {
    const result = await getAmount(request);
    console.log(result);
    const resString = `Exchange result of ${result.amount} ${result.currencyFrom} is ${result.result.toFixed(2)} of ${result.currencyTo}`;
    document.getElementById('output').textContent = resString;
}

dataForm.addFormHandler(displayResult);





