import { Component } from '../components/base/Component';
import { ensureElement } from "../utils/utils";

interface IProduct {
    title: string;
    price: number;
}


export class formCart extends Component<IProduct> {
    protected productList: HTMLElement;
    protected buttonCart: HTMLButtonElement;
    protected products: IProduct[] = [];


    constructor(container: HTMLElement) {
        super(container)
        this.buttonCart = ensureElement('.button', this.container) as HTMLButtonElement;
        this.productList = ensureElement('.basket__list', this.container);
    }

    set items(products: IProduct[]) {
        this.products = products;
        this.render();
    }

    public render(data?: Partial<IProduct>): HTMLElement {
        this.productList.innerHTML = '';
        const productsToRender = data ? [data as IProduct] : this.products;
        productsToRender.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.title} — ${product.price} спинов`;
            this.productList.appendChild(li);
        });

        return this.productList;
    }
}