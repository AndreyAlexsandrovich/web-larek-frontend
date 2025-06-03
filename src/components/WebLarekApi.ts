import { Api } from '../components/base/api';
import { ICardItem } from '../types/index';

interface IItemsResponse { 
    total: number,
    items: ICardItem[],
}

export class WebLarekApi extends Api {

    constructor(baseUrl: string) {
        super(baseUrl)
    }

    getItemsData(): Promise<IItemsResponse> {
        return this.get<IItemsResponse>('/product');
    }

    deleteItem(data: Partial<ICardItem>): Promise<ICardItem> {
        return this.post<ICardItem>('/product', data, 'DELETE')
    }

    addItem(data: Partial<ICardItem>): Promise<ICardItem> {
        return this.post<ICardItem>('/product', data)
    }
}