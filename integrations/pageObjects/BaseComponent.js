class BaseComponent{
    constructor(page,container){
        this.page=page;
        this.container=container;
    }

    async waitLoaded(){
        await this.container.waitFor();
    }

    async click(locator) {
        await this.page.click(`${this.container} ${locator}`);
    }

}
module.exports=BaseComponent;