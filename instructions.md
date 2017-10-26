# Welcome to Women Who Code Workshop!
We are here to Build your own Car-Buying Experience Application

  ## Setting up

 - For the development on your local machine, please install the latest [node](https://nodejs.org/en/) in your machine. (Recommended >=6)

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

    And you can see:
    ![alt text][generator-prompts]

 - Try running the app:

    ```bash
    cd your-project-name
    clap dev
    ```

    You should be able to see an app start and running on http://localhost:3000/.

    ![alt text][initial-app]

    Congratulations to the success of your Electrode application running!


  ## Start building your car-buying app

   From here, you can develop further based on the generated the electrode app.
   Let's start building our own car-buying app.

   ### Get ready with

   In this app, we need to use `react-modal` and `react-icons` modules for this app, please install these two modules beforehand:

   ```
   $ npm install --save react-modal react-icons
   ```

   Also, in order to convenient all the developers, we've combined css into one single file. You can import css file at directory `src/client/styles`, create a new file called `car-buying.css` and copy the following content inside: [car-buying.css](./src/client/styles/car-buying.css)

   ### Build the home page

   Now, let's start build our home page. Looking for the file: `src/client/components/home.jsx`, replace the contents of that file with: [Home.jsx](./src/client/components/home.jsx).

   Now, switch to your localhost, and you can see:
   ![alt text][home1]

   ### Build the user view

   Home.jsx is the main page of your app. It offers the user to pick either buyer or dealer role.
   We now need to create components for the car buyer and dealer role.

   Create a file named "user.jsx" under directory `src/client/components`, copy the following content inside: [user.jsx](./src/client/components/user.jsx)

   `User` Component is composed by `User Banner` and `Car Inventory` components as below:

   - User Banner:

     ![alt text][user-banner]

   - Car Inventory:

     ![alt text][car-inventory]

  ### Build the user banner

  User Banner serves as a header for the user page.

  Create a file named "banner.jsx" under directory `src/client/components`, copy the following content inside: [banner.jsx](./src/client/components/banner.jsx)

  ### Build the car inventory

  Car Inventory is a collection of `Car` Component. It used to display information about a car. This will be used both by the user and the dealer component. Create a file named "car.jsx" under directory `src/client/components`, copy the following content inside: [car.jsx](./src/client/components/car.jsx)


  Add a few images for the cars from [this directory](./src/client/images).

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

    Now, the initial user view should be ready for you. Open http://localhost:3000/user, you can see:

    ![alt text][user1]

  ### Adding Plugins
    As you can see above, user view is suppose to display a list of cars available in the inventory. We will add an api that reads the available inventory from file.

    We will store the vehicles inventory in a file called `vehicles.json` stored under the `data` directory at the root level. You can copy the content for the file from [here](./data/vehicles.json) to your directory `data/vehicles.json`.

    Create a file called `vehicles.js` under `src/server/plugins` with content from [here](./src/server/plugins/vehicles.js). This file exposes and API to get the list of vehicles present in the inventory.

    Register this plugin in `config/default.js` under `plugins` field:

    ```js
    "./server/plugins/vehicles": {
      "module": "./{{env.APP_SRC_DIR}}server/plugins/vehicles"
    }
    ```

  ### Add car-details component to display the details of a vehicle and contact the dealer using a form

    Add component file, [car-details.jsx](./src/client/components/car-details.jsx) under `src/component` directory.
    Also update `client/routes.jsx` with the new Route:

    ```
    import CarDetails from "./components/car-details";
    <Router>
     ..
     ..
     <Route path="/car-details" component={CarDetails} />
    </Router>
    ```

    And add [modal-box.jsx](./src/client/components/modal-box.jsx) here.


 ### Add data and populate the initial state for the pages

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

 ### Add the corresponding Reducer and Actions

  In order to correctly map the transactions, car inventory and the visibilityFilter, we need to define them in the actions and reducer.

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

  ![alt text][user2]


  Also, if you switch to your http://localhost:3000/car-details and refresh the page, you should see:

  ![alt text][car-details]

  ## Challenge

  - Now, let's move on to some challenges. :-)
  Since you've already known how to store the vehicles inventory and display to car inventory page, let's have some practice on storing transactions data for transactions page.

  - Add a file named `transactions.js` under `src/server/plugins` with the content from [here](./src/server/plugins/transactions.js).
   You will have api's to Get, create and update transactions. There is also an API that filters and updates transactions of a specific type.

  - We can now add views that display our transactions loaded from the file.
    Create a component file called `transaction-history.jsx`. This is the view for the user to update the transactions.
    Create the file under `src/client/components` with content from [here](./src/client/components/transaction-history.jsx).

  - Also add a file, `filter.jsx` under `src/client/components/` with [content](./src/client/components/filter.jsx) .We use this for diplaying Links that filter transactions based on their status.

  - We also add a component called `negotiation-box.jsx` which provides the UI for updating transactions and communicating between the user and the dealer.
  Add this file under `src/client/components/` with content from [here](./src/client/components/negotiation-box.jsx) and its css [here](./src/client/styles/negotiation.css).

  negotiation-box is composed by `ReplyBlock` component and `VehicleInfoBlock` component. Which can be found [here](./src/client/components/reply-block.jsx) and [here](./src/client/components/vehicle-info.jsx)

  - Now link the component via routes to the other pages. Add the following to the `routes.jsx` file.

    ```js
      import TransactionHistory from "./components/transaction-history";
      ..
      ..
      <Route path="/history" component={TransactionHistory} />
    ```

    And now, your user transaction history view is complete!
    Go back to your http://localhost:3000/transaction-history and refresh the page, you should see:

    ![alt text][transaction-history]

  - Similarly on the dealer flow, we will add a view component called `dealer-transactions.jsx` under `src/client/components` with [content](./src/client/components/dealer-transactions.jsx).

  - Also add the route to `routes.jsx` for the new component.

    ```js
      import DealerTransactions from "./components/dealer-transactions";
      ..
      ..
      <Route path="/dealer-transactions" component={DealerTransactions} />
    ```

    And now, your dealer transaction history view is complete!
    Go back to your http://localhost:3000/transaction-history and refresh the page, you should see:

    ![alt text][transaction-history2]

 -  Your app is now complete and you should be able to update and create transactions and negotiations.

 [initial-app]: instructions_img/initial-app.png
 [generator-prompts]: instructions_img/generator-prompts.png
 [check-nodejs]: instructions_img/check-nodejs.png
 [home1]: instructions_img/home1.png
 [user-banner]: instructions_img/user-banner.png
 [car-inventory]: instructions_img/car-inventory.png
 [user1]: instructions_img/user1.png
 [user2]: instructions_img/user2.png
 [car-details]: instructions_img/car-details.png
 [transaction-history]: instructions_img/transaction-history1.png
 [transaction-history2]: instructions_img/transaction-history2.png
