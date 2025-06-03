import { Component } from '../components/base/Component'
import { ensureElement } from '../utils/utils';
import { ICardItem } from '../types/index'

export class Item extends Component<ICardItem> {

    protected itemTag: HTMLElement;
    protected itemTitle: HTMLElement;
    protected itemImage: HTMLImageElement;
    protected itemPrice: HTMLElement;


    constructor(container: HTMLElement) {
        super(container);
        this.itemTitle = ensureElement('.card__title', this.container);
        this.itemImage = ensureElement('.card__image', this.container) as HTMLImageElement;
        this.itemPrice = ensureElement('.card__price', this.container);
        this.itemTag = ensureElement('.card__category', this.container);
    }

    set title(value: string) {
        this.setText(this.itemTitle, value);
    }

    set image(value: string) {
        this.setImage(this.itemImage, value);
    }

    set price(value: number) {
        this.setText(this.itemPrice, value);
    }

    set category(value: string) {
        this.setText(this.itemTag, value);
    }
}