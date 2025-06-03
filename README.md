# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


# Описания файла WebLarekModel

## класс WebLarekModel: 

Класс модели для управления корзиной товаров и оплатой. В этом классе основная бизнес-логика

```
export class WebLarekModel {
    код.... 
}
```

### поля 

```
protected items: ICardItem[] = []; <!-- массив товаров -->
     protected isValid: boolean = false; <!-- флаг валидности данных  -->
    protected paymentMethod?: PaymentMethod;  <!-- выбранный способ оплаты -->
```

## методы

### метод totalAmount:

Подсчитывает общую сумму всех товаров в корзине

 - ** @returns ** {number} общая сумма товара.

```
totalAmount(): number {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }
```

### метод validationForm:

Проверяет корректность данных веденными пользователям.

 - ** @param ** {userData: IUserData} данные которые ввел пользователь.

 - ** @returns ** {boolean} true, если данные валидны, иначе false.

```
validationForm(userData: IUserData): boolean {
        const phoneRegex = /^\+?\d{9,15}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isAddressValid = userData.address.trim().length >= 5;


        const isPhoneValid = phoneRegex.test(userData.phone);
        const isEmailValid = emailRegex.test(userData.email);

        this.isValid = isPhoneValid && isEmailValid && isAddressValid;
        return this.isValid
    }
```

### метод setPaymentMethod:

Устанавливает выбранный пользователем способ оплаты.

 - ** @param ** {method} method - способо оплаты ('online' или 'cash_on_delivery').

```
 setPaymentMethod(method: PaymentMethod): void {
        this.paymentMethod = method;
    }
```

### метод addToCart:

Добавляет товар в корзину.

 - ** @param ** {item} item - товар который добавяется в корзину.

 - ** @returns ** {number} возращает  количество товаров в корзине.

```
 addToCart(item: ICardItem): number {
        this.items.push(item);
        return this.items.length;
    }
```

### метод deleteItem:

Удаляет товар с корзины по его уникальному id.

 - ** @param ** {item} item - товар для удаления.

 - ** @returns ** {ICardItem[]} обновленный список товаров в корзине.

```
 deleteItem(item: ICardItem): ICardItem[] {
        this.items = this.items.filter(i => i.id !== item.id)
        return this.items;
    }
```


### метод getItem: 

Возращает определенный товар по его индексу, если такого товара нет, возращает undefined

 - ** @returns ** {ICardItem | undefined} возращает товар или undefined .

```
getItem(id: string): ICardItem | undefined {
        return this.items.find(item => item._id === id)
    }
```

### метод getItems:

Возращает текущий список товаров в коризне.

 - ** @returns ** {ICardItem[]} массив товаров в корзине.

```
  getItems(): ICardItem[] { 
        return this.items;
    }
```

# Описания файла WebLarekApi

Класс для работы с товаров с сервера.

## методы 

### метод getItems

- ** @returns ** {Promise<ICardItem[]>} возращает промис и получение список товаров с сервера.

```
getItems(): Promise<ICardItem[]> {
        return this.get<ICardItem[]>('/product');
    }
```

### метод deleteItem

- ** @returns ** {Promise<ICardItem>} возращает промис и удаленный товар пользователям.

```
deleteItem(data: Partial<ICardItem>): Promise<ICardItem> {
        return this.post<ICardItem>('/product', data, 'DELETE')
    }
```

### метод addItem 

- ** @returns ** {Promise<ICardItem>} возращает промис и добавляемый товар пользователям.

```
addItem(data: Partial<ICardItem>): Promise<ICardItem> {
        return this.post<ICardItem>('/product', data)
    }
```


# Описания файла item

## описания класса item

```
import { Component } from '../components/base/Component'
import { ensureElement } from '../utils/utils';
import { ICardItem } from '../types/index'

export class Item extends Component<ICardItem> {

  .../ код
}
```

Класс отвечающий за отображение передаваемых данных.

### Поля класса 

```
protected itemTag: HTMLElement;
    protected itemTitle: HTMLElement;
    protected itemImage: HTMLImageElement;
    protected itemPrice: HTMLElement;
```

Поля содержут имя карточки, категорию, изображение, цену.

### конструктов

Конструктов принимает на вход контейнер. В нем вызывается метод super чтобы при создании карточки объявился новый объект с новыми данными.
Находит все динамические элементы чтобы в дальнейшем внести в них данные.

```
constructor(container: HTMLElement) {
        super(container);
        this.itemTitle = ensureElement('.card__title', this.container);
        this.itemImage = ensureElement('.card__image', this.container) as HTMLImageElement;
        this.itemPrice = ensureElement('.card__price', this.container);
        this.itemTag = ensureElement('.card__category', this.container);
    }
```

### set title 

На вход принимает значение, название карточки и его подставляет. 

```
    set title(value: string) {
        this.setText(this.itemTitle, value);
    }
```


### set image 

На вход принимает значение, изображение карточки и его подставляет. 

```
     set image(value: string) {
        this.setImage(this.itemImage, value);
    }
```

### set price

На вход принимает значение, цену карточки и его подставляет. 

```
    set price(value: number) {
        this.setText(this.itemPrice, value);
    }
```

### set category

На вход принимает значение, категорию карточки и его подставляет. 

```
    set category(value: string) {
        this.setText(this.itemTag, value);
    }
```

# Описания файла item 

## Класс Item 

Класс отвечает за отображение списка товаров на странице. Он принимает контейнер, внутри которого находится элемент с классом `.gallery`, и управляет его содержимым.

```
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

interface IPage { 
    WebLarekItems: HTMLElement[];
}

export class Page extends Component<IPage> {

.../ Код

}
```

## Поля класса 

webLarekList - Поле которое сожержит контейнер в котором будет список товаров

```
protected webLarekList: HTMLElement;

```

# Конструктор 

@param {HTMLElement} container - Родительский контейнер страницы, внутри которого будет искаться элемент с классом `.gallery`.
 * 
 * Инициализирует экземпляр класса, вызывая конструктор базового класса с контейнером.
 * Затем ищет и сохраняет в свойство `webLarekList` элемент с классом `.gallery` внутри переданного контейнера.
 * Если элемент не найден, выбрасывается ошибка (через функцию ensureElement).

```
constructor(container: HTMLElement) {
        super(container);
        this.webLarekList = ensureElement('.gallery', this.container);
    }
```

# Сеттер для свойства WebLarekItems.
 * 
 * @param {HTMLElement[]} items - Массив HTML-элементов, представляющих товары для отображения.
 * 
 * Заменяет текущее содержимое элемента `webLarekList` на переданный массив элементов.
 * Использует метод `replaceChildren` для эффективного обновления DOM без лишних перерисовок.
 */

 ```
set WebLarekItems(items: HTMLElement[]) { 
    this.webLarekList.replaceChildren(...items);
}
```