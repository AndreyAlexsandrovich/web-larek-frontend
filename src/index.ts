import './scss/styles.scss';
import { WebLarekModel } from './components/WebLarekModel';
// import { ICardItem } from './types/index'
import { WebLarekApi } from './components/WebLarekApi'
import { Item } from './components/item'
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';

const events = new EventEmitter();

const api = new WebLarekApi("https://larek-api.nomoreparties.co/api/weblarek");

const model = new WebLarekModel(events);
const page = new Page(document.querySelector('.page__wrapper') as HTMLElement);

api.getItemsData()
    .then((data) => { 
         const itemsArray = data.items;
        model.setItems(itemsArray);
    })
    .catch(err => console.log(err));



const template = document.querySelector("#card-catalog") as HTMLTemplateElement;



events.on('items:changed', () => {
    const items = model.getItems(); 
    const itemsHTMLArray = items.map(item => new Item(cloneTemplate(template)).render(item));
    page.WebLarekItems = itemsHTMLArray;
});