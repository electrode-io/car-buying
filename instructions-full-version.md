# Welcome to Women Who Code Workshop!
We are here to Build your own Car-Buying Experience Application

  ## Setting up

 - For the development on your local machine, please install the latest [node](https://nodejs.org/en/) in your machine. (>=6 recommended)

 - To ensure you have everything working together, we have [electrode-ignite](https://docs.electrode.io/chapter1/quick-start/start-with-ignite.html) here for you to help you starting the development with the Electrode platform.

    ```bash
    $ npm install -g electrode-ignite
    ```

 - Please run the electrode environment check in your terminal before you start the app.

   ```bash
   $ ignite check-nodejs
   ```
   ![alt text][check-nodejs]

   If you didn't have your node ready, please install nodeJS using [nvm](https://github.com/creationix/nvm)

   If you didn't have your npm ready, please install npm using

   ```bash
   npm install npm@latest -g
   ```

   > Note: Please avoid using npm version v5.4.x, it may cause an incorrect installation.

 - Generate an electrode app using ignite:

    ```bash
    $ ignite generate-app
    ```

    And follow the prompts.

 - Try running the app:

    ```bash
    cd your-project-name
    clap dev
    ```

    You should be able to see an app start and running on http://localhost:3000/.

    ![alt text][initial-app]

    Congratulations on the success of your Electrode Application running!


  ## Start building your car-buying app

 - From here, you can develop further based on the generated the electrode app.
   Let's start building our own car-buying app.

   Clean up your `src/client/component` folder, add add below modules under your `package.json` dependencies filed.

   ```
   "react-icons": "^2.2.7",
   "react-modal": "^3.0.4"
   ```
   Re-install.

   Create a new file: `src/client/components/home.jsx`.
   Replace the contents of that file with: [Home.jsx](./src/client/components/home.jsx).

   Now, switch to your localhost, and you can see:
   ![alt text][home1]

 - Home.jsx is the main page of the app. It offers the user to pick the buyer/dealer role.
   We now need to create components for the car buyer and dealer role.
   <br/>
   Create a file named "user.jsx" under directory `src/client/components`, copy the following content inside: [user.jsx](./src/client/components/user.jsx)
   <br/>
   Add corresponding css files for it at directory `src/client/styles`, copy the following content inside: [user.css](./src/client/styles/user.css)
   <br/>

   `User` Component is composed by `User Banner` and `Car Inventory` sections as below:
   `User Banner`:
   ![alt text][user-banner]

   `Car Inventory`:
   ![alt text][car-inventory]

  - Now lets build these two components!

    User Banner serves as a header for the user page. Create a file named "banner.jsx" under directory `src/client/components`, copy the following content inside: [banner.jsx](./src/client/components/banner.jsx)

    Add corresponding css files for it at directory `src/client/styles`, copy the following content inside: [banner.css](./src/client/styles/banner.css)


    Car Inventory is a collection of `Car` Component. It used to display information about a car. This will be used both by the user and the dealer component. Create a file named "car.jsx" under directory `src/client/components`, copy the following content inside: [car.jsx](./src/client/components/car.jsx)
    <br/>
    Add corresponding css files for it at directory `src/client/styles`, copy the following content inside: [car.css](./src/client/styles/car.css)


    Add a few images for the cars from [this directory](./src/client/images). And add & update these css for common css styles:
    <br/>
    [section.css](./src/client/styles/section.css)
    [custom.css](./src/client/styles/custom.css)
    [skeleton.css](./src/client/styles/skeleton.css)

  - We can now add routes to connect the buttons on the homepage to the appropriate views. Modify the `routes.jsx` file under `src/client` with the following code.

    ```js
    import React from "react";
    import { Router, Route } from "react-router";
    import Home from "./components/home";
    import User from "./components/user";

    export const routes = (
     <Router>
       <Route path="/" component={Home} />
       <Route path="/user" component={User} />
     </Router>
    );
    ```

    Since `Car` component is used by both user and dealer component, to preview the app, you can add [dealer.css](./src/client/styles/dealer.css) to the app in advance.

    Now, the initial user view should be ready for you. Once you run `clap dev` in your terminal and open http://localhost:3000, you can see:

    ![alt text][user1]

  - Adding Plugins

    As you can see above, user view is suppose to display a list of cars available in the inventory. We will add an api that reads the available inventory from file.

    We will store the vehicles inventory in a file called `vehicles.json` stored under the `data` directory at the root level. You can copy the content for the file from [here](./data/vehicles.json) to your directory `data/vehicles.json`.

    Create a file called `vehicles.js` under `src/server/plugins` with content from [here](./src/server/plugins/vehicles.js). This file exposes and API to get the list of vehicles present in the inventory.

    Register this plugin in `config/default.js` under `plugins` field:

    ```js
    "./server/plugins/vehicles": {
      module: "./{{env.APP_SRC_DIR}}server/plugins/vehicles"
    }
    ```

  - Add another component to display the details of a vehicle and contact the dealer using a form.
    Add component file, [car-details.jsx](./src/client/components/car-details.jsx) and its corresponding [css](./src/styles/car-details.css).
    Also update `client/routes.jsx` with the new Route:

    ```
    import CarDetails from "./components/car-details";
    <Router>
     ..
     ..
     <Route path="/car-details" component={CarDetails} />
    </Router>
    ```

    Inside `car-details` component, we are using `Modalbox` for prompting messages feedback dialog.
    Add [modal-box.jsx](./src/client/components/modal-box.jsx) and its corresponding [css](./src/styles/modal.css) here.

 - Add data and populate the initial state for the pages.
   In `src/server/views/index-views.jsx`, modify the createRedux Store function to read from the data file we had created:

   ```js
   import fs from "fs";
   import path from "path";
   const readFileAsync = Promise.promisify(fs.readFile);

   function createReduxStore(req, match) {
     return Promise.all([
       readFileAsync(path.resolve("data", "transactions.json"))
         .then(JSON.parse)
         .catch(() => {
           return {};
         }),
       readFileAsync(path.resolve("data", "vehicles.json"))
         .then(JSON.parse)
         .catch(() => {
           return {};
         })
     ]).then(([transactions, vehicles]) => storeInitializer(req, transactions, vehicles));
   }
   ```

    add a function to initialize the redux store.

    ```js
    function storeInitializer(req, transactions, vehicles) {
      let initialState = {
        transactions: transactions,
        cars: vehicles,
        visibilityFilter: "SHOW_ALL"
      };
      return createStore(rootReducer, initialState);
    }
    ```

- Add the corresponding Reducer and Actions:
  In order to correctly map the transactions, car inventory and the visibilityFilter, we need to define them in the  actions and reducer.

  The `src/clients/actions/index.js` file can be updated with :

  ```js
    export const visibilityFilters = {
      SHOW_ALL: "SHOW_ALL",
      SHOW_NEGOTIATIONS: "NEGOTIATIONS",
      SHOW_ACCEPTED: "ACCEPTED"
    };

    export const setVisibilityFilter = filter => {
      return { type: "SET_VISIBILITY_FILTER", filter };
    };
  ```

  And the reducer `src/client/reducers/index.js` should be updated :

  ```js
    import { combineReducers } from "redux";
    import { setVisibilityFilter, visibilityFilters } from "../actions";

    const initialState = {
      visibilityFilter: visibilityFilters.SHOW_ALL,
      transactions: []
    };

    const visibilityFilter = (state = "SHOW_ALL", action) => {
      switch (action.type) {
        case "SET_VISIBILITY_FILTER":
          return action.filter;
        default:
          return state;
      }
    };

    let cars = (store = {}, action) => {
      return store;
    };

    let transactions = (store = {}, action) => {
      return store;
    };

    export default combineReducers({
      cars,
      transactions,
      visibilityFilter
    });
  ```

  And now, your user view is complete!
  Go back to your http://localhost:3000/user and refresh the page, you should see:


 - Now add the transactions plugin, which contains the api for modifying transactions.
   Add a file named `transactions.js` under `src/server/plugins` with the content from [here](./src/server/plugins/transactions.js).
   You will have api's to Get, create and update transactions. There is also an API that filters and updates transactions of a specific type.
   Also add this plugin to the `default.js` file.

   ```js
    "./server/plugins/transactions": {
      "module": "./{{env.APP_SRC_DIR}}server/plugins/transactions"
    }
    ```

 - We can now add views that display our transactions loaded from the file.
   Create a component file called `transaction-history.jsx`. This is the view for the user to update the transactions.
   Create the file under `src/client/components` with content from [here](./src/client/components/transaction-history.jsx).

- Also add a file, `filter.jsx` under `src/client/components/` with [content](./src/client/components/filter.jsx) .We use this for diplaying Links that filter transactions based on their status.

- We also add a component called `negotiation-box.jsx` which provides the UI for updating transactions and communicating between the user and the dealer.
  Add this file under `src/client/components/` with content from [here](./src/client/components/negotiation-box.jsx).

- Now link the component via routes to the other pages. Add the following to the `routes.jsx` file.

  ```js
    import TransactionHistory from "./components/transaction-history";
    ..
    ..
    <Route path="/history" component={TransactionHistory} />
  ```

- Similarly on the dealer flow, we will add a view component called `dealer-transactions.jsx` under `src/client/components` with [content](./src/client/components/dealer-transactions.jsx).

- Also add the route to `routes.jsx` for the new component.

  ```js
    import DealerTransactions from "./components/dealer-transactions";
    ..
    ..
    <Route path="/dealer-transactions" component={DealerTransactions} />
  ```

 -  Your app is now complete and you should be able to update and create transactions and negotiations.

 [initial-app]: instructions_img/initial-app.png
 [check-nodejs]: instructions_img/check-nodejs.png
 [home1]: instructions_img/home1.png
 [user-banner]: instructions_img/user-banner.png
 [car-inventory]: instructions_img/car-inventory.png
 [user1]: instructions_img/user1.png
 [user2]: instructions_img/user2.png
