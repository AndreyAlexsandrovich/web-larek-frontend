import { ICardItem } from '../types/index';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
export class ModalProduct extends Component<ICardItem> {

    protected templateContainer: HTMLTemplateElement;
    protected itemTag: HTMLElement;
    protected itemTitle: HTMLElement;
    protected itemImage: HTMLImageElement;
    protected itemPrice: HTMLElement;
    protected buttonPay: HTMLButtonElement;
    protected itemDescription: HTMLElement;

    constructor(container: HTMLElement) {
        super(container)
        this.templateContainer = document.querySelector("#card-preview") as HTMLTemplateElement; 
        
        const templateClone = this.templateContainer.content.cloneNode(true) as DocumentFragment;
        container.appendChild(templateClone);

        this.itemTitle = ensureElement('.card__title', container);
        this.itemImage = ensureElement('.card__image', container) as HTMLImageElement;
        this.itemPrice = ensureElement('.card__price', container);
        this.itemTag = ensureElement('.card__category', container);
        this.buttonPay = ensureElement('.button', container) as HTMLButtonElement;
        this.itemDescription = ensureElement('.card__text', container);

    }
    set title(value: string) {
        this.setText(this.itemTitle, value);
    }

    set image(value: string) {
        this.setImage(this.itemImage, value);
    }

    set price(value: number) {
        this.setText(this.itemPrice, `${value} спинов`);
    }

    set category(value: string) {
        this.setText(this.itemTag, value);
    }

    set description(value: string) {
        this.setText(this.itemDescription, value);
    }


    


}