import { ICardItem, IUserData } from '../types/index'
import { IEvents } from './base/events';
type PaymentMethod = 'online' | 'cash_on_delivery';

export class WebLarekModel {
    protected items: ICardItem[] = [];
    protected isValid?: boolean = false;
    protected paymentMethod?: PaymentMethod;

    constructor(protected events: IEvents) { }

    totalAmount(): number {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    validationForm(userData: IUserData): boolean {
        const phoneRegex = /^\+?\d{9,15}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isAddressValid = userData.address.trim().length >= 5;


        const isPhoneValid = phoneRegex.test(userData.phone);
        const isEmailValid = emailRegex.test(userData.email);

        this.isValid = isPhoneValid && isEmailValid && isAddressValid;
        return this.isValid
    }

    setPaymentMethod(method: PaymentMethod): void {
        this.paymentMethod = method;
        this.events.emit('method:changed');
    }

    addToCart(item: ICardItem): number {
        this.items.push(item);
        this.events.emit('items:changed');
        this.events.emit('totalAmount:changed');
        return this.items.length;
    }

    deleteItem(item: ICardItem): ICardItem[] {
        this.items = this.items.filter(i => i._id !== item._id)
        this.events.emit('items:changed');
        this.events.emit('totalAmount:changed');
        return this.items;
    }

    getItem(id: string): ICardItem | undefined {
        return this.items.find(item => item._id === id)
    }

    getItems(): ICardItem[] {
        return this.items;
    }

    setItems(items: ICardItem[]): void { 
        this.items = items;
        this.events.emit('items:changed');
    }
}