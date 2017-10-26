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
   npm install npm -g
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

   In this app, we need to use `react-modal` and `react-icons` modules for this app, please stop server running and install these two modules beforehand:

   ```
   $ npm install --save react-modal react-icons
   ```

   Also, in order to convenient all the developers, we've combined css into one single file. You just need create a new file `./src/client/styles/car-buying.css` and copy the following content inside: [car-buying.css](./src/client/styles/car-buying.css)

   ### Build the home page

   Now, let's start build our home page. Looking for the file: `src/client/components/home.jsx`, replace the contents of that file with: [Home.jsx](./src/client/components/home.jsx).

   Now, re-start your server by `clap dev` and switch to your http://localhost:3000/, and you can see:
   ![alt text][home1]

   Yay! You've got your home page done.

   ### Build the user view

   Home.jsx is the main page of your app. It offers the user to pick either buyer or dealer role.
   We now need to create components for the car buyer and dealer role.

   - Let's have a quick peek of whats the components gonna looks like:

     `User` Component is composed by `User Banner` and `Car Inventory` components as below:

     - User Banner:

       ![alt text][user-banner]

     - Car Inventory:

       ![alt text][car-inventory]

   - Let's build!

   Create a file named "user.jsx" under directory `src/client/components`, copy the following content inside: [user.jsx](./src/client/components/user.jsx)

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

    Now, the initial user view should be ready for you.
    Restart the server and wait for your app being re-compiled.
    Open http://localhost:3000/user, you can see:

    ![alt text][user1]

  ### Adding Plugins

    As you can see above, user view is suppose to display a list of cars available in the inventory. We will add an api that reads the available inventory from file.

    We will store the vehicles inventory in a file called `vehicles.json` which is stored under a [mock server](https://gecgithub01.walmart.com/a0d00hf/car-buying-service).

    Create a file called `vehicles.js` under `src/server/plugins` with content from [here](./src/server/plugins/vehicles.js). This file exposes and API to get the list of vehicles present in the inventory.

    Register this plugin in `config/default.js` under `plugins` field:

    ```js
    "./server/plugins/vehicles": {
      "module": "./{{env.APP_SRC_DIR}}server/plugins/vehicles"
    }
    ```

 ### Add data and populate the initial state for the pages

   - In `src/server/views/index-views.jsx`, update with the content here:

   ```
    import ReduxRouterEngine from "electrode-redux-router-engine";
    import { routes } from "../../client/routes";
    import { createStore } from "redux";
    import rootReducer from "../../client/reducers";
    import fs from "fs";
    import path from "path";

    const Promise = require("bluebird");
    const readFileAsync = Promise.promisify(fs.readFile);

    function storeInitializer(req, vehicles) {
      let initialState = {
        cars: vehicles
      };
      return createStore(rootReducer, initialState);
    }
    function createReduxStore(req, match) {

      return Promise.all([
        req.server
          .inject("/vehicles")
          .then(res => {
            return JSON.parse(res.payload);
          })
          .catch(() => {
            return {};
          })
      ]).then(([vehicles]) => storeInitializer(req, vehicles));
    }

    module.exports = req => {
      const app = (req.server && req.server.app) || req.app;
      if (!app.routesEngine) {
        app.routesEngine = new ReduxRouterEngine({ routes, createReduxStore });
      }

      return app.routesEngine.render(req);
    };
   ```

   Since we do not have any actions for now, please delete the contents from the file `src/client/actions/index.js` for now and update the file `src/client/reducers.jsx` with:

   ```
   import {combineReducers} from "redux";
   export default combineReducers({});
   ```

  Re-start the server and go back to your http://localhost:3000/user, you should see:

  ![alt text][user2]

  Congratulations! You've finished the main focus of today's workshop. Now its time to try by your own :-)

  ## Try your own

  Now, you are planning to build a dealer view. From what you've already learned above about how to store the vehicles inventory and display to car inventory page, let's have some practice on storing transactions data for transactions page.

  Here is what you will build:
  ![alt text][transaction-history2]

  And here is what you need to do:

  - Add a `transactions.js` file under server's plugins, you will have api's to get, create and update transactions.
  - Add views `src/client/components` that display our transactions loaded from the file.

  ## Challenge

  - Wow you are doing a great job! If you still have time, let's move on to some challenges. :-)

  If you switch to user view at http://localhost:3000/user, you will realize the `Details` button is not working for now.
  Here is what we planning to have:

  ![alt text][car-details]

  Let's add a route for car details and build the view above!

  ## Thank you

  Again, thank you so much for joining this workshop with Electrode today. We are happy to have you here to program together.
  We create a whole version of the car-buying app [here](https://gecgithub01.walmart.com/a0d00hf/car-buying-service) if you are interested to check it out!

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
