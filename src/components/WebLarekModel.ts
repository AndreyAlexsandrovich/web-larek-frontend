import { ICardItem, IUserData } from '../types/index'
type PaymentMethod = 'online' | 'cash_on_delivery';

export class WebLarekModel {
    protected items: ICardItem[] = [];
    protected isValid?: boolean = false;
    protected paymentMethod?: PaymentMethod;

    // constructor() { }

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
    }

    addToCart(item: ICardItem): number {
        this.items.push(item);
        return this.items.length;
    }

    deleteItem(item: ICardItem): ICardItem[] {
        this.items = this.items.filter(i => i._id !== item._id)
        return this.items;
    }

    getItem(id: string): ICardItem | undefined {
        return this.items.find(item => item._id === id)
    }

    getItems(items: Array<ICardItem>): ICardItem[] {
        this.items.push(...items);
        return this.items;
    }
}