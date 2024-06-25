const { test, expect, describe,beforeEach, beforeAll } = require('@playwright/test');
const { default: MainPage } = require('../integrations/pageObjects/components/mainPage/mainPage');
import User from '../integrations/ data/models/User';


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

        await mainPage.showEmptyNameError();
        await expect(page.locator('div.invalid-feedback')).toHaveText('Name required');
        await expect(page.locator('div.invalid-feedback')).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the invalid name field',async({page})=>{
        await mainPage.showInvalidNameError();
        await expect(page.locator('div.invalid-feedback')).toHaveText('Name is invalid');
        await expect(page.locator('div.invalid-feedback')).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the wrong length name field',async({page})=>{
        await mainPage.showWrongLengthNameError();
        await expect(page.locator('div.invalid-feedback')).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(page.locator('div.invalid-feedback')).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the empty last name field',async({page})=>{
        await mainPage.showEmptyLastnameError();
        await expect(page.locator('div.invalid-feedback')).toHaveText('Last name required');
        await expect(page.locator('div.invalid-feedback')).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the invalid last name field',async({page})=>{
        await mainPage.showInvalidLastnameError();
        await expect(page.locator('div.invalid-feedback')).toHaveText('Last name is invalid');
        await expect(page.locator('div.invalid-feedback')).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the wrong length last name field',async({page})=>{
        await mainPage.showWrongLengthLastnameError();
        await expect(page.locator('div.invalid-feedback')).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(page.locator('div.invalid-feedback')).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the incorrect email field',async({page})=>{
        await mainPage.showIncorrectEmailError();
        await expect(page.locator('div.invalid-feedback')).toHaveText('Email is incorrect');
        await expect(page.locator('div.invalid-feedback')).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the empty email field',async({page})=>{
        await mainPage.showEmptyEmailError();
        await expect(page.locator('div.invalid-feedback')).toHaveText('Email required');
        await expect(page.locator('div.invalid-feedback')).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the empty password field',async({page})=>{
        await mainPage.showEmptyPasswordError();
        await expect(page.locator('div.invalid-feedback')).toHaveText('Password required');
        await expect(page.locator('div.invalid-feedback')).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    test('Test the wrong password field',async({page})=>{
        await mainPage.showWrongPasswordError();
        await expect(page.locator('div.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(page.locator('div.invalid-feedback')).toHaveCSS('border-color','rgb(220, 53, 69)');
    });
});