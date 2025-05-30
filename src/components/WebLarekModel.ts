import { ICardItem } from '../types/index'
type PaymentMethod = 'online' | 'cash_on_delivery';

export class WebLarekModel {
    protected items: ICardItem[] = [];
    protected isValid: boolean = false;
    protected paymentMethod?: PaymentMethod;

    constructor() { }

    totalAmount(): number {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    validationForm(form: any): boolean {
        this.isValid = true;
        return this.isValid
    }

    setPaymentMethod(method: PaymentMethod): void {
        this.paymentMethod = method;
    }

    addToCart(item: ICardItem): number {
        this.items.push(item);
        return this.items.length;
    }

    deleteItem(item: ICardItem): ICardItem[] {
        this.items = this.items.filter(i => i.id !== item.id)
        return this.items;
    }

    getItems(): ICardItem[] { 
        return this.items;
    }
}