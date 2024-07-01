import BaseComponent from "./BaseComponent";

export default class BasePage extends BaseComponent{
    constructor(page, url, container){
        const wrapper=container ?? page.locator('html');
        super(page,wrapper);
        this.url=url;
    }

    async open(url){
        await this.page.goto(url);
        await this.waitLoaded(this.wrapper);
    }

    async click(locator) {
        await locator.click(); 
    }

    async fill(locator, text) {
        await locator.fill(text);
      }
}