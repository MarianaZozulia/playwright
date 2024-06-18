const { test, expect, describe,beforeEach, afterAll } = require('@playwright/test');

function randomEmail(){
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let prefix = 'mar';
    let domain = 'mariana.com';

    let randomString = '';
    for (let i = 0; i < 6; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    let email = `${prefix}${randomString}@${domain}`;
    return email;
}


describe('Test the registration flow',()=>{

    beforeEach(async({page})=>{
        await page.goto('/');
        const signInButton=page.locator('button.btn.btn-outline-white.header_signin',{hasText:'Sign In'});
        await signInButton.click();

        const signInmodal=page.locator('div.modal-content');
        const registerButton=signInmodal.locator('button.btn.btn-link',{hasText:'Registration'});
        await registerButton.click();
    })

    test('Positive registration', async({page})=>{
        const registerModal=page.locator('div.modal-content');
        const name=registerModal.locator('#signupName');
        const lastName=registerModal.locator('#signupLastName');
        const email=registerModal.locator('#signupEmail');
        const passsword=registerModal.locator('#signupPassword');
        const repeatPassword=registerModal.locator('#signupRepeatPassword');
        const registerButton=registerModal.locator('button.btn.btn-primary',{hasText:'Register'});

        await name.fill('Mariana');
        await lastName.fill('Zozulia');
        await email.fill(randomEmail());
        await passsword.fill('12345678Js>');
        await repeatPassword.fill('12345678Js>');
        await registerButton.click();
        await expect(page.locator('div.alert.alert-success')).toHaveText('Registration complete');
    
    });

    test('Test the empty name field',async({page})=>{
        const registerModal=page.locator('div.modal-content');
        const name=registerModal.locator('#signupName');
        const validationMessage=page.locator('div.invalid-feedback');

        await name.click();
        await registerModal.click();
        await expect(validationMessage).toHaveText('Name required');
        await expect(validationMessage).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the invalid name field',async({page})=>{
        const registerModal=page.locator('div.modal-content');
        const name=registerModal.locator('#signupName');
        const lastName=registerModal.locator('#signupLastName');
        const validationMessage=page.locator('div.invalid-feedback');

        await name.fill("^^");
        await lastName.click();
        await expect(validationMessage).toHaveText('Name is invalid');
        await expect(validationMessage).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the wrong length name field',async({page})=>{
        const registerModal=page.locator('div.modal-content');
        const name=registerModal.locator('#signupName');
        const lastName=registerModal.locator('#signupLastName');
        const validationMessage=page.locator('div.invalid-feedback');

        await name.fill("M");
        await lastName.click();
        await expect(validationMessage).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(validationMessage).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the empty last name field',async({page})=>{
        const registerModal=page.locator('div.modal-content');
        const lastName=registerModal.locator('#signupLastName');
        const validationMessage=page.locator('div.invalid-feedback');

        await lastName.click();
        await registerModal.click();
        await expect(validationMessage).toHaveText('Last name required');
        await expect(validationMessage).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the invalid last name field',async({page})=>{
        const registerModal=page.locator('div.modal-content');
        const lastName=registerModal.locator('#signupLastName');
        const email=registerModal.locator('#signupEmail');
        const validationMessage=page.locator('div.invalid-feedback');

        await lastName.fill("^^");
        await email.click();
        await expect(validationMessage).toHaveText('Last name is invalid');
        await expect(validationMessage).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the wrong length last name field',async({page})=>{
        const registerModal=page.locator('div.modal-content');
        const lastName=registerModal.locator('#signupLastName');
        const email=registerModal.locator('#signupEmail');
        const validationMessage=page.locator('div.invalid-feedback');

        await lastName.fill("M");
        await email.click();
        await expect(validationMessage).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(validationMessage).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the incorrect email field',async({page})=>{
        const registerModal=page.locator('div.modal-content');
        const email=registerModal.locator('#signupEmail');
        const passsword=registerModal.locator('#signupPassword');
        const validationMessage=page.locator('div.invalid-feedback');

        await email.fill("M");
        await passsword.click();
        await expect(validationMessage).toHaveText('Email is incorrect');
        await expect(validationMessage).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the empty email field',async({page})=>{
        const registerModal=page.locator('div.modal-content');
        const email=registerModal.locator('#signupEmail');
        const passsword=registerModal.locator('#signupPassword');
        const validationMessage=page.locator('div.invalid-feedback');

        await email.click();
        await passsword.click();
        await expect(validationMessage).toHaveText('Email required');
        await expect(validationMessage).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the empty password field',async({page})=>{
        const registerModal=page.locator('div.modal-content');
        const passsword=registerModal.locator('#signupPassword');
        const repeatPassword=registerModal.locator('#signupRepeatPassword');
        const validationMessage=page.locator('div.invalid-feedback');

        await passsword.click();
        await repeatPassword.click();
        await expect(validationMessage).toHaveText('Password required');
        await expect(validationMessage).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the wrong password field',async({page})=>{
        const registerModal=page.locator('div.modal-content');
        const passsword=registerModal.locator('#signupPassword');
        const repeatPassword=registerModal.locator('#signupRepeatPassword');
        const validationMessage=page.locator('div.invalid-feedback');

        await passsword.fill("g");
        await repeatPassword.click();
        await expect(validationMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(validationMessage).toHaveCSS('border-color','rgb(220, 53, 69)');
    });
});