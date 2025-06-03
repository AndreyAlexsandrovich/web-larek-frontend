import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

interface IPage { 
    WebLarekItems: HTMLElement[];
}

export class Page extends Component<IPage> {

    protected webLarekList: HTMLElement;


    constructor(container: HTMLElement) {
        super(container);
        this.webLarekList = ensureElement('.gallery', this.container);
    }

    set WebLarekItems(items: HTMLElement[]) { 
        this.webLarekList.replaceChildren(...items);
    }

}