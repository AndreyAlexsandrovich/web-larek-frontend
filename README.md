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


# описания файла Form 
## Описания класса Form

Класс принимает DOM-элементы и ими управляет

```

export class Form extends Component<IForm> {

    .../ Код 

}
```

## Описания интерфейса IForm

Интерфейс имеет значение с типом данных `string`

```
interface IForm {
    value: string;
}
```

## Поля класса

```
  protected inputElementAddress: HTMLInputElement;
    protected inputElementEmail: HTMLInputElement;
    protected inputElementPhone: HTMLInputElement;
    protected SubmitButton: HTMLButtonElement;
    protected buttonCash: HTMLButtonElement;
    protected buttonCard: HTMLButtonElement;
```

## Приватные свойства

```
private currentStep = 0;
    private stepUpdateButton = ['Далее', 'Далее', 'Оформить']
```

## Конструктор 

 
 * @param container - HTML-элемент контейнера, внутри которого расположена форма.
 *
 * Инициализирует основные элементы формы:
 * - Поля ввода адреса, email и телефона.
 * - Кнопки отправки формы, выбора оплаты наличными и оплаты картой.
 *
 * Выполняет начальную настройку интерфейса, вызывая метод updateButtonText(),
 * который обновляет текст кнопки отправки в зависимости от текущего состояния.
 *
 * Добавляет обработчик события клика на кнопку отправки формы (SubmitButton),
 * который запускает метод nextStep() для перехода к следующему шагу оформления заказа.

```
 constructor(container: HTMLElement) {
        super(container)

        this.inputElementAddress = ensureElement('input[name="address"]', this.container) as HTMLInputElement;
        this.inputElementEmail = ensureElement('input[name="email"]', this.container) as HTMLInputElement;
        this.inputElementPhone = ensureElement('input[name="phone"]', this.container) as HTMLInputElement;
        this.SubmitButton = ensureElement('.button', this.container) as HTMLButtonElement;
        this.buttonCash = ensureElement('button[name="cash"]', this.container) as HTMLButtonElement;
        this.buttonCard = ensureElement('button[name="card"]', this.container) as HTMLButtonElement;

        this.updateButtonText();

        this.SubmitButton.addEventListener('click', () => this.nextStep());
    }
```

## сеттер value

* Устанавливает значение поля ввода адреса.
 *
 * @param value - строка с адресом пользователя.

 ```
set value(value: string) {
        this.inputElementAddress.value = value;
    }
 ```

 ## сеттер buttonText

 * Устанавливает текст кнопки отправки формы.
 *
 * @param value - текст, который будет отображён на кнопке.

 ```
 set buttonText(value: string) {
        this.setText(this.SubmitButton, value)
    }
 ```

 ## сеттер checkButtonCash

 * Активирует кнопку оплаты картой и деактивирует кнопку оплаты наличными.
 *
 * @param value - если true, кнопка карты становится активной, иначе неактивной.

 ```
   set checkButtonCash(value: boolean) {
        this.toggleClass(this.buttonCash, 'alt-active', value)
        this.toggleClass(this.buttonCard, 'alt-active', !value)
    }
 ```

## сеттер checkButtonCard

* Активирует кнопку оплаты наличными и деактивирует кнопку оплаты картой.
 *
 * @param value - если true, кнопка наличных становится активной, иначе неактивной.


 ```
set checkButtonCard(value: boolean) {
        this.toggleClass(this.buttonCard, 'alt-active', value)
        this.toggleClass(this.buttonCash, 'alt-active', !value)
    }
 ```

 ## метод updateButtonText

 * Обновляет текст кнопки отправки в зависимости от текущего шага оформления.
 * Использует массив `stepUpdateButton` для выбора текста.
 * Если текст для текущего шага отсутствует, устанавливает значение по умолчанию "Далее".


 ```
private updateButtonText() {
    this.buttonText = this.stepUpdateButton[this.currentStep] || 'Далее';
}
 ```


 ## метод nextStep 

* Переходит к следующему шагу оформления заказа.
 * Если текущий шаг не последний, увеличивает счётчик шага и обновляет текст кнопки.
 * Если шаг последний, вызывает отправку формы методом submitForm().

 ```
private nextStep() {
    if (this.currentStep < this.stepUpdateButton.length - 1) {
        this.currentStep++;
        this.updateButtonText();
    } else {
        this.submitForm();
    }
}
 ```

 ## метод submitForm 

* Обрабатывает отправку формы.
 * В текущей реализации выводит в консоль сообщение о том, что форма отправлена.
 * Здесь можно добавить логику отправки данных на сервер.

 ```
private submitForm() {
    console.log('Форма отправлена');
}
 ```


# Описание файла ModalProduct

## Описание класса ModalProduct

Класс отвечает за отображение подробной информации о товаре в модальном окне, используя шаблон из DOM и методы для установки текста и изображений в соответствующие элементы.

```
export class ModalProduct extends Component<ICardItem> {

    ... // Код

}
```

## Описание интерфейса ICardItem

Интерфейс описывает структуру объекта товара с необходимыми полями, например title, price, category, description, image и др.

```
interface ICardItem {
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    // другие поля по необходимости
}

```
## Поля класса
```
protected templateContainer: HTMLTemplateElement;
protected itemTag: HTMLElement;
protected itemTitle: HTMLElement;
protected itemImage: HTMLImageElement;
protected itemPrice: HTMLElement;
protected buttonPay: HTMLButtonElement;
protected itemDescription: HTMLElement;
```
## Конструктор
@param container - HTML-элемент контейнера, в который будет вставлен клон шаблона модального окна.

Выполняет клонирование содержимого HTML-шаблона с id card-preview и добавляет его в контейнер.

Инициализирует основные элементы модального окна (заголовок, изображение, цена, категория, кнопка оплаты, описание) с помощью функции ensureElement.

```
constructor(container: HTMLElement) {
    super(container);
    this.templateContainer = document.querySelector("#card-preview") as HTMLTemplateElement;

    const templateClone = this.templateContainer.content.cloneNode(true) as DocumentFragment;
    container.appendChild(templateClone);

    this.itemTitle = ensureElement('.card__title', container);
    this.itemImage = ensureElement('.card__image', container) as HTMLImageElement;
    this.itemPrice = ensureElement('.card__price', container);
    this.itemTag = ensureElement('.card__category', container);
    this.buttonPay = ensureElement('.button', container) as HTMLButtonElement;
    this.itemDescription = ensureElement('.card__text', container);
}

```
## Сеттеры
### title — устанавливает заголовок товара.

### image — устанавливает URL изображения товара.

### price — устанавливает цену товара с добавлением текста "спинов".

### category — устанавливает категорию товара.

### description — устанавливает описание товара.

```
set title(value: string) {
    this.setText(this.itemTitle, value);
}

set image(value: string) {
    this.setImage(this.itemImage, value);
}

set price(value: number) {
    this.setText(this.itemPrice, `${value} спинов`);
}

set category(value: string) {
    this.setText(this.itemTag, value);
}

set description(value: string) {
    this.setText(this.itemDescription, value);
}
```