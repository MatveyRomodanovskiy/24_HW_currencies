import {getListOfCurrencies} from "./data-manipulation.js";
import {createInfoElement} from "./tools.js";
const parentSelectorsId = 'selectors';
let symbols = undefined;

export class DataForm{
    #currencyFromSelector;
    #currencyToSelector;
    constructor(parentId) {
        this.#currencyFromSelector = buildSelectors('from', parentSelectorsId);
        this.#currencyToSelector = buildSelectors('to', parentSelectorsId);
        this.#fillForm(parentId);
    }

    async #fillForm(parentId) {
        const form = document.createElement("form");
        form.id = 'input-form';
        const divSelectors = document.createElement("div");
        divSelectors.id = parentSelectorsId;
        form.appendChild(divSelectors);
        const label = createInfoElement('Enter amount:', 'label', undefined, 'label-input');
        const amountField = createInfoElement(undefined, 'input', 'number', 'amountField');
        amountField.required = true;
        amountField.min = '0';
        label.appendChild(amountField);
        const submitButton = createInfoElement('Submit', 'button');
        label.appendChild(submitButton);
        form.appendChild(label);
        document.getElementById(parentId).append(form);
    }

  addFormHandler(handlerFunc){
         document.getElementById('input-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const request = {};
            request.currencyFrom = document.getElementById('from').value;
            request.currencyTo = document.getElementById('to').value;
            request.amount = document.getElementById('amountField').value;
            try {
                checkForm(request);
                document.getElementById('from').value = undefined;
                document.getElementById('to').value = undefined;
                document.getElementById('amountField').value = undefined;
                handlerFunc(request);
            }catch (e) {
                alert(e);
            }
        })
    }


}

async function buildSelectors(name, parentName) {
    const select = document.createElement("select");
    select.name = name;
    select.id = name;
    select.size= 12;
    select.required = true;
    if (!symbols){
        symbols = await getListOfCurrencies();
    }
    for (const element in symbols){
        const option = document.createElement("option");
        option.value = element;
        option.text = symbols[element];
        select.appendChild(option);
    }
    const label = createInfoElement(`Choose currency ${name}:`, 'label',undefined,`label-${name}`);
    const input = document.getElementById(parentName);
    input.appendChild(label).appendChild(select);
}
function checkForm(request) {
    let errMess = '';
    if (request.currencyFrom  ===  request.currencyTo){
        errMess = "The currency from can't be equal currency to!\n"
    }
    if (request.amount <= 0){
        errMess+="The amount must be greater than zero!"
    }
    if(errMess){
        throw (errMess);
    }
}