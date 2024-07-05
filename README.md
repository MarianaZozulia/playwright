# Automated Test Project with Playwright

This project contains automated tests written using Playwright. The following instructions will guide you on how to install and run these tests.

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/MarianaZozulia/playwright.git
    cd playwright
    ```

2. **Create a `.env` file**:
    - Copy the `.env.example` file to `.env` and fill in the necessary environment variables:
    ```sh
    cp .env.example .env
    ```
    - Example `.env` file:
    ```
    BASE_URL_STAGING=
    BASE_URL_PRODUCTION=
    HTTP_USERNAME=
    HTTP_PASSWORD=
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

4. **Install Playwright browsers**:
    ```sh
    npx playwright install
    ```

## Running Tests

1. **Run all tests**:
    ```sh
    npx playwright test
    ```

2. **Run a registration test**:
    ```sh
    npx playwright test tests/registration.spec.js
    ```

3. **Generate test report**:
    ```sh
    npx playwright show-report
    ```

## Project Structure

- `tests/`: Directory containing test files.
- `playwright.config.js`: Configuration file for Playwright.
- `package.json`: Project metadata and dependencies.
- `.env.example`: Example environment file to configure necessary environment variables.

