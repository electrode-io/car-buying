# Build your own Car-Buying Experience

 - You need to have NodeJS setup on your machine. 
    Run `node -v` in your terminal to see if you have node installed.
    If not, install nodeJs using [nvm](https://github.com/creationix/nvm)
 - Install Yeoman and electrode-generator 

    ```bash
    npm install -g yo xclap-cli generator-electrode
    ```

 - Generate an electrode app:

    ```bash
    mkdir your-project-name
    cd your-project-name
    yo electrode
    ```

 - Try running the app:

    ```bash
    cd your-project-name
    clap dev
    ```
    You should be able to see an app start and running on localhost.

 - Now modify the apps `src/client/components/home.jsx` file.
    Replace the contents of that file with:
    [Home.jsx](./src/client/components/home.jsx)


 - We now need to create components for the car buyer and the car dealer.
 - Create a file under `src/client/components` called `user.jsx`, with the following content:
    [user.jsx](./src/client/components/user.jsx)

 - Create a file called `dealer.jsx` under the components directory.
   Add the following content:
   [dealer.jsx](./src/client/components/dealer.jsx)

  - We will also create a common component called `car.jsx` used to display information about a car. This will be used both by the user and the dealer component.
    [car.jsx](./src/client/components/car.jsx)

  - Also add another component, `banner.jsx` that serves as a header for the pages.
    [banner.jsx](./src/client/components/banner.jsx)
    
 - Add corresponding css files for the components created:
  [user.css](./src/client/styles/user.css)
  [dealer.css](./src/client/styles/dealer.css)
  [car.css](./src/client/styles/car.css)
  [banner.css](./src/client/styles/banner.css)
  
    Also update:
      
      [section.css](./src/client/styles/section.css)
      [custom.css](./src/client/styles/custom.css)

- Add a few images for the cars from [this directory](./src/client/images). 

- We can now add routes to connect the buttons on the homepage to the appropriate views. Modify the `routes.jsx` file under `src/client` with the following code.

  ```js
  import React from "react";
  import { Router, Route } from "react-router";
  import Home from "./components/home";
  import User from "./components/user";
  import Dealer from "./components/dealer";

  export const routes = (
   <Router>
     <Route path="/" component={Home} />
     <Route path="/user" component={User} />
     <Route path="/dealer" component={Dealer} />
   </Router>
  );
  ```

 - Adding Plugins: 
    The user and dealer pages display a list of cars available in the inventory. We will add an api that reads the available inventory from file.
    
    We will store the vehicles inventory in a file called `vehicles.json` stored under the `data` directory at the root level.
    You can copy the content for the file from [here](./data/vehicles.json).
    
    Create a file called `vehicles.js` under `server/plugins` with content from [here](./src/server/plugins/vehicles.js). This file exposes and API to get the list of vehicles present in the inventory.

    Register this plugin in `config/default.js` under `plugins`:
    ```js
    "./server/plugins/vehicles": {
      "module": "./{{env.APP_SRC_DIR}}server/plugins/vehicles"
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
