import BasePage from "../../BasePage";
import MainPage from "../mainPage/mainPage";

export default class GuestLoginPage extends BasePage{
    constructor(page){
        super(page,'/',page.locator('button',{hasText: 'Guest log in'}));
        this.loginButton=page.locator('button',{hasText: 'Guest log in'});
    }

    async clickGuestLogin(){
        await this.loginButton.click();
        return new MainPage(this.page);

    }
}