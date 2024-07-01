import BaseComponent from "../BaseComponent";

export default class Footer extends BaseComponent{
    constructor(page){
        super(page,page.locator('footer'));
    }

}