export class FormValidator {
    constructor(form, submitBtn, errorMessages) {
        this.form = form;
        this.submitBtn = submitBtn;
        this.errorMessages = errorMessages;
        this.setEventListeners = this.setEventListeners.bind(this);
        this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
    }

    checkInputValidity(input) {
        const errorElem = input.closest('.popup__form').querySelector(`#${input.id}-error`);
        
        input.setCustomValidity("");
            if (input.validity.valueMissing) {
              input.setCustomValidity(errorMessages.empty);
              errorElem.textContent = input.validationMessage;
            }

            if (input.validity.tooShort || input.validity.tooLong) {
              input.setCustomValidity(errorMessages.wrongLength);
              errorElem.textContent = input.validationMessage;
            }

            if (input.validity.typeMismatch && input.type === 'url') {
              input.setCustomValidity(errorMessages.wrongUrl);
              errorElem.textContent = input.validationMessage;
            }

            if (input.checkValidity()) {
              errorElem.textContent = "";
            }

    }

    setSubmitButtonState() {
        if (this.form.checkValidity()) {
            this.submitBtn.removeAttribute('disabled');
            this.submitBtn.classList.add(`popup__button_active`);
            this.submitBtn.classList.remove(`popup__button_nonactive`);
        } else {
            this.submitBtn.setAttribute('disabled', true);
            this.submitBtn.classList.add(`popup__button_nonactive`);
            this.submitBtn.classList.remove(`popup__button_active`);
        }
    }

    clearErrors() {
        const spanErrors = this.form.querySelectorAll('.error');
        const spanErrorsArray = [...spanErrors];
        spanErrorsArray.forEach((item) => {
            item.textContent = "";
        });
    }

    setEventListeners() {
        this.form.addEventListener('input', (event) => this.checkInputValidity(event.target));
        this.form.addEventListener('input', () => this.setSubmitButtonState());
    }
}


import {errorMessages} from './index.js'