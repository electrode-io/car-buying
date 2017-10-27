# Welcome to Women Who Code Workshop!
We are here to build a Car-Buying Experience Application

  ## Set up

 - For development on your local machine, please install the latest [nodejs](https://nodejs.org/en/). (Recommended >=6)

 - Use [electrode-ignite](https://docs.electrode.io/chapter1/quick-start/start-with-ignite.html) to start your development environment with the Electrode platform.

    ```bash
    $ npm install -g electrode-ignite
    ```

 - Run the electrode environment checker to ensure your environment is at the appropriate versions.

   ```bash
   $ ignite check-nodejs
   ```

   ![alt text][check-nodejs]

   If you do not have the current nodejs version, please install nodeJS using [nvm](https://github.com/creationix/nvm)

   If you do not have the current npm version, please install npm using

   ```bash
   npm install npm -g
   ```

   > Note: Please avoid using npm version v5.4.x, it may cause an incorrect installation.

 - Let's get started by generating an Electrode app using Ignite:

    ```bash
    $ mkdir working-folder
    $ cd working-folder
    $ ignite generate-app
    ```

    You will be prompted for information about your app.  Enter the information or press <Enter> to use the defaults.
    ![alt text][generator-prompts]

 - Try running the app:

    ```bash
    cd your-project-name
    clap dev
    ```

    You can see your app running on http://localhost:3000/.

    ![alt text][initial-app]

    Congratulations on running your first Electrode application!


  ## Building your car-buying app

   Let's build our car-buying app.

   ### Installing prerequisites

   In this app, we will be using the `react-modal` and `react-icons` modules for modal dialogs and icons.  Please stop the server and install these two modules:

   ```
   $ npm install --save react-modal react-icons
   ```

   Also, for the convenience of the developers, we've combined all the css into one single file. You just need create a new file `./src/client/styles/car-buying.css` and copy the following content inside: [car-buying.css](./src/client/styles/car-buying.css)

   ### Building the home page

   Now, let's build our home page. In your project folder, look for the file: `src/client/components/home.jsx`, replace the contents of that file with: [Home.jsx](./src/client/components/home.jsx).  Home.jsx is the main page of your app.  It allows the user to pick either buyer or dealer role.  We will return a React component that contains the Buyer and Dealer buttons.

   Now, restart your server by `clap dev` and switch to your http://localhost:3000/, and you can see:
   ![alt text][home1]

   Yay! You've got your home page done.

   ### Building the user view

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

  Car Inventory component is a collection of `Car` Component. It is used to display information about a car. We will use this component in both User and the Dealer components. Create a file named "car.jsx" under directory `src/client/components`, copy the following content inside: [car.jsx](./src/client/components/car.jsx)


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

    Now, the initial User view should be ready for you.
    Restart the server and wait for your app to recompile.
    Open http://localhost:3000/user, you can see:

    ![alt text][user1]

  ### Adding Plugins

    As you can see above, User view is suppose to display a list of cars available in the inventory. We will add an api that reads the available inventory from file.

    We will store the vehicles inventory in a file called `vehicles.json` which is stored under a [mock server](https://gecgithub01.walmart.com/a0d00hf/car-buying-service).

    Create a file called `vehicles.js` under `src/server/plugins` with content from [here](./src/server/plugins/vehicles.js). This file exposes an API to get the list of vehicles present in the inventory.

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

   Since we do not have any actions for now, please delete the contents from the file `src/client/actions/index.js` and update the file `src/client/reducers.jsx` with:

   ```
   import {combineReducers} from "redux";
   export default combineReducers({});
   ```

  Re-start the server and go back to your http://localhost:3000/user, you should see:

  ![alt text][user2]

  Congratulations! You've finished the main focus of today's workshop. Now its time to try some coding your own :-)

  ## Going on your own

  Now, you are planning to build a dealer view. From what you've already learned above on how to store the vehicles inventory and displaying to car inventory page, let's have some practice on storing transactions data for transactions page.

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
