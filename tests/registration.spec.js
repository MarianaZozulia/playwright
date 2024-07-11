const { expect ,test,describe,beforeEach,beforeAll,afterAll} = require('@playwright/test');
const MainPage=require('../integrations/pageObjects/pages/mainPage');
const User=require('../integrations/ data/models/User')



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

let mainPage;


describe('Test the registration flow',()=>{
    

    beforeEach(async({ page })=>{
        mainPage = new MainPage(page);
        await mainPage.open();
        await mainPage.openTheRegisterModal();
    });

    test('Positive registration', async({page})=>{
        
        const user=new User(
            'Mariana',
            'Zozulia',
            randomEmail(),
            '12345678Js>',
            '12345678Js>');
            
        await mainPage.successUserRegistration(user);
        await expect(page.locator('div.alert.alert-success')).toHaveText('Registration complete');
    
    });

    test('Test the empty name field',async({page})=>{
        await mainPage.showEmptyFieldError(mainPage.name,mainPage.registerModal);
        await mainPage.checkErrorMessageText('Name required');
    });

    test('Test the invalid name field',async({page})=>{
        await mainPage.showInvalidInputError(mainPage.name,"^^",mainPage.lastname);
        await mainPage.checkErrorMessageText('Name is invalid');
    });

    test('Test the wrong length name field',async({page})=>{
        await mainPage.showInvalidInputError(mainPage.name,"M",mainPage.lastname);
        await mainPage.checkErrorMessageText('Name has to be from 2 to 20 characters long');
    });

    test('Test the empty last name field',async({page})=>{
        await mainPage.showEmptyFieldError(mainPage.lastname,mainPage.registerModal);
        await mainPage.checkErrorMessageText('Last name required');
    });

    test('Test the invalid last name field',async({page})=>{
        await mainPage.showInvalidInputError(mainPage.lastname,"^^",mainPage.email);
        await mainPage.checkErrorMessageText('Last name is invalid');
    });

    test('Test the wrong length last name field',async({page})=>{
        await mainPage.showInvalidInputError(mainPage.lastname,"M",mainPage.email);
        await mainPage.checkErrorMessageText('Last name has to be from 2 to 20 characters long');  
    });

    test('Test the incorrect email field',async({page})=>{
        await mainPage.showInvalidInputError(mainPage.email,"M",mainPage.password);
        await mainPage.checkErrorMessageText('Email is incorrect'); 
    });

    test('Test the empty email field',async({page})=>{
        await mainPage.showEmptyFieldError(mainPage.email,mainPage.password);
        await mainPage.checkErrorMessageText('Email required'); 
    });

    test('Test the empty password field',async({page})=>{
        await mainPage.showEmptyFieldError(mainPage.password,mainPage.repeatPassword);
        await mainPage.checkErrorMessageText('Password required'); 
    });

    test('Test the wrong password field',async({page})=>{
        await mainPage.showInvalidInputError(mainPage.password,"g",mainPage.repeatPassword);
        await mainPage.checkErrorMessageText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'); 
    });
});