# E2E Testing

This project uses playwright to run end-to-end tests. As we are testing a library we need to setup a test environment 
for rendering the component and the test file for each test case.

> [!WARNING]  
> Not all components needs a e2e test. We only want to test specific interaction that are not covered by the unit tests.
> E2E tests can be used for testing a mix of component and see their interaction. Example: select input within a modal and vice versa.

## Structure
```
e2e
├── tests
│   ├── useCase1
│   │   ├── render.tsx # This file will render the component. File name is important!
│   │   └── test.spec.ts # This file will contain the test cases
│   ├── useCase2
│   │   ├── render.tsx
│   │   └── test.spec.ts
└── playwright.config.ts
```

What you need to understand is that for each test case you need to create a file `render.tsx` that will render the component.
And a file `test.spec.ts` that will contain the test cases run by playwright.

## Running the tests

To run the tests you can use the following command:

```bash
pnpm start # This will start the server with all the components

# In another terminal
pnpm test:e2e # This will run the tests
```

> [!NOTE]  
> Test are run on 3 different browsers: `chromium`, `firefox` and `webkit`.

## Writing the tests

To write the tests you can copy and paste the `template` folder in `tests/template`. You can then rename the folder and change the content
of the files to match the test case you want to test.
