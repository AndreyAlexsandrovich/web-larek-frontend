import './scss/styles.scss';
import { WebLarekModel } from './components/WebLarekModel';
import { ICardItem } from './types/index'
import { WebLarekApi } from './components/WebLarekApi'

const items: ICardItem[] = [
    {
        _id: "854cef69-976d-4c2a-a18c-2aa45046c390",
        title: "+1 час в сутках",
        price: 750,
        category: "софт-скил",
        image: "/5_Dots.svg",
        description: "Если планируете решать задачи в тренажёре, берите два.",
    },

    {
        _id: "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
        title: "HEX-леденец",
        price: 750,
        category: "другое",
        image: "/Shell.svg",
        description: "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
    },
];

const a = new WebLarekModel();


const model = a.getItems(items);
console.log(model)

const model2 = a.getItem("854cef69-976d-4c2a-a18c-2aa45046c390");
console.log(model2)


const b = new WebLarekApi("https://larek-api.nomoreparties.co/api/weblarek");

b.getItems()
    .then(items => console.log(items))
    .catch(err => console.log(err))