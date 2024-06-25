import BasePage from "../../BasePage";


export default class MainPage extends BasePage{
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
      console.log('Filling user details:', user); 
      await this.fill(this.name, user.name);
      await this.fill(this.lastname, user.lastname);
      await this.fill(this.email, user.email);
      await this.fill(this.password, user.password);
      await this.fill(this.repeatPassword, user.repeatPassword);
      await this.click(this.modalRegisterButton);
        
    }

    async showEmptyNameError(){
      await this.name.click();
      await this.registerModal.click();   
    }

    async showInvalidNameError(){
      await this.name.fill("^^");
      await this.lastname.click(); 
    }

    async showWrongLengthNameError(){
      await this.name.fill("M");
      await this.lastname.click();
    }

    async showEmptyLastnameError(){
      await this.lastname.click();
      await this.registerModal.click();  
    }

    async showInvalidLastnameError(){
      await this.lastname.fill("^^");
      await this.email.click();
    }

    async showWrongLengthLastnameError(){
      await this.lastname.fill("M");
      await this.email.click();
    }

    async showIncorrectEmailError(){
      await this.email.fill("M");
      await this.password.click(); 
    }

    async showEmptyEmailError(){
      await this.email.click();
      await this.password.click();  
    }

    async showEmptyPasswordError(){
      await this.password.click();
      await this.repeatPassword.click();  
    }

    async showWrongPasswordError(){
      await this.password.fill("g");
      await this.repeatPassword.click();  
    }

    



    



}