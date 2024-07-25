const { test, expect, request, describe, beforeAll, afterAll } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL_STAGING;
const HTTP_USERNAME = process.env.HTTP_USERNAME;
const HTTP_PASSWORD = process.env.HTTP_PASSWORD;

describe('Car API Tests', () => {
  let apiContext;

  beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: BASE_URL,
      httpCredentials: {
        username: HTTP_USERNAME,
        password: HTTP_PASSWORD,
      }
    });
  });

  afterAll(async () => {
    await apiContext.dispose();
  });

  const createCar = async (data) => {
    const response = await apiContext.post('api/cars', { data });
    const responseBody = await response.json();
    return { response, responseBody };
  };

  test('Positive car creation', async () => {
    const { response, responseBody } = await createCar({
      carBrandId: 1,
      carModelId: 1,
      mileage: 122
    });

    expect(response.ok()).toBeTruthy();
    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data.carBrandId).toBe(1);
    expect(responseBody.data.carModelId).toBe(1);
    expect(responseBody.data.mileage).toBe(122);
  });

  test('Create car with missed car brand id', async () => {
    const { response, responseBody } = await createCar({
      carModelId: 1,
      mileage: 122
    });

    expect(response.status()).toBe(400);
    expect(responseBody.message).toContain('Car brand id is required');
  });

  test('Create a car with not valid mileage', async () => {
    const { response, responseBody } = await createCar({
      carBrandId: 2,
      carModelId: 2,
      mileage: -505
    });

    expect(response.status()).toBe(400);
    expect(responseBody.message).toContain('Mileage has to be from 0 to 999999');
  });

});
