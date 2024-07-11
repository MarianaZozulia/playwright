const { expect } = require('@playwright/test');
const BasePage=require('../basePage')

class MainPage extends BasePage{
    constructor(page){
        super(page,'/');
        this.signInButton=page.locator('button.btn.btn-outline-white.header_signin',{hasText:'Sign In'});
        this.signInmodal=page.locator('div.modal-content');
        this.homeRegisterButton=this.signInmodal.locator('button.btn.btn-link',{hasText:'Registration'});
        this.registerModal=page.locator('div.modal-content');
        this.name=this.registerModal.locator('#signupName');
        this.lastname=this.registerModal.locator('#signupLastName');
        this.email=this.registerModal.locator('#signupEmail');
        this.password=this.registerModal.locator('#signupPassword');
        this.repeatPassword=this.registerModal.locator('#signupRepeatPassword');
        this.modalRegisterButton=this.registerModal.locator('button.btn.btn-primary',{hasText:'Register'});
        this.validationMessage=page.locator('div.invalid-feedback');
        
    }

    async open() {
      await super.open(this.url);
    }

    async openTheRegisterModal(){
      await this.signInButton.click();
      await this.homeRegisterButton.click(); 
    }

    async successUserRegistration(user){  
      await this.fill(this.name, user.name);
      await this.fill(this.lastname, user.lastname);
      await this.fill(this.email, user.email);
      await this.fill(this.password, user.password);
      await this.fill(this.repeatPassword, user.repeatPassword);
      await this.click(this.modalRegisterButton);
        
    }

    async showInvalidInputError(selector, invalidValue, nextSelector) {
      await selector.fill(invalidValue);
      await nextSelector.click();
    } 

    async showEmptyFieldError(selector, nextSelector){
      await selector.click();
      await nextSelector.click();
    }

    async checkErrorMessageText(expectedText) {
      await expect(this.validationMessage).toHaveText(expectedText);
      await expect(this.validationMessage).toHaveCSS('border-color','rgb(220, 53, 69)');
    }
}
module.exports=MainPage;