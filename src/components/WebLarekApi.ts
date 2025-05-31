import { Api } from '../components/base/api';
import { ICardItem } from '../types/index';

export class WebLarekApi extends Api {

    constructor(baseUrl: string) {
        super(baseUrl)
    }

    getItems(): Promise<ICardItem[]> {
        return this.get<ICardItem[]>('/product');
    }

    deleteItem(data: Partial<ICardItem>): Promise<ICardItem> {
        return this.post<ICardItem>('/product', data, 'DELETE')
    }

    addItem(data: Partial<ICardItem>): Promise<ICardItem> {
        return this.post<ICardItem>('/product', data)
    }
}