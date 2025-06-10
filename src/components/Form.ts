import { Component } from '../components/base/Component';
import { ensureElement } from "../utils/utils";

interface IForm {
    value: string;
}

export class Form extends Component<IForm> {

    protected inputElementAddress: HTMLInputElement;
    protected inputElementEmail: HTMLInputElement;
    protected inputElementPhone: HTMLInputElement;
    protected SubmitButton: HTMLButtonElement;
    protected buttonCash: HTMLButtonElement;
    protected buttonCard: HTMLButtonElement;


    private currentStep = 0;
    private stepUpdateButton = ['Далее', 'Далее', 'Оформить']

    constructor(container: HTMLElement) {
        super(container)

        this.inputElementAddress = ensureElement('input[name="address"]', this.container) as HTMLInputElement;
        this.inputElementEmail = ensureElement('input[name="email"]', this.container) as HTMLInputElement;
        this.inputElementPhone = ensureElement('input[name="phone"]', this.container) as HTMLInputElement;
        this.SubmitButton = ensureElement('.button', this.container) as HTMLButtonElement;
        this.buttonCash = ensureElement('button[name="cash"]', this.container) as HTMLButtonElement;
        this.buttonCard = ensureElement('button[name="card"]', this.container) as HTMLButtonElement;

        this.updateButtonText();

        this.SubmitButton.addEventListener('click', () => this.nextStep());
    }

    set value(value: string) {
        this.inputElementAddress.value = value;
    }

    set buttonText(value: string) {
        this.setText(this.SubmitButton, value)
    }

    set checkButtonCash(value: boolean) {
        this.toggleClass(this.buttonCash, 'alt-active', value)
        this.toggleClass(this.buttonCard, 'alt-active', !value)
    }

    set checkButtonCard(value: boolean) {
        this.toggleClass(this.buttonCard, 'alt-active', value)
        this.toggleClass(this.buttonCash, 'alt-active', !value)
    }

    private updateButtonText() {
        this.buttonText = this.stepUpdateButton[this.currentStep] || 'Далее';
    }

    private nextStep() {
        if (this.currentStep < this.stepUpdateButton.length - 1) {
            this.currentStep++;
            this.updateButtonText();
        } else {
            this.submitForm();
        }
    }

    private submitForm() {
        console.log('Форма отправлена')
    }

}