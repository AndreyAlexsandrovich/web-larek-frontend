import './scss/styles.scss';
import { WebLarekModel } from './components/WebLarekModel';
// import { ICardItem } from './types/index'
import { WebLarekApi } from './components/WebLarekApi'
import { Item } from './components/item'
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
// import { ModalProduct } from './components/ModalProruct';
// import { ICardItem } from './types/index';
import { formCart } from './components/formCart';

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

// const modalContainer = document.querySelector('.modal__container') as HTMLElement;
// const modalProduct = new ModalProduct(modalContainer);

// const template1 = document.createElement('div') as HTMLElement;
// template1.classList.add('modal', 'modal_active');
// document.body.appendChild(template1);

// modalProduct.price = 750;
// modalProduct.category = 'другое'
// modalProduct.title = '+1 час в сутки'

// template1.appendChild(modalContainer)

// console.log(modalContainer);

const cart = new formCart(document.querySelector('.basket'));

cart.items = [
    { title: 'айти', price: 750 },
    { title: 'айти', price: 750 },
    { title: 'айти', price: 750 },
]