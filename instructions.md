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

    ```
    import React from "react";
    import { ReactRouter, browserHistory } from "react-router";
    import "../styles/normalize.css";
    import "../styles/raleway.css";
    import skeleton from "../styles/skeleton.css";
    import custom from "../styles/custom.css";
    import electrodePng from "../images/electrode.png";

    export default () => (
      <div className={custom.container}>
        <section className={custom.header}>
        <h2 className={skeleton.title}>Hello from Electrode Workshop</h2>
        <h4 className={skeleton.title}>Please select your role:</h4>

        <div>
          <button
            className={`${custom.user} ${custom.roleButton}`}
            onClick={() => {
              browserHistory.push("/user");
            }}
          >
          Buyer
          </button>
          <button
            className={`${custom.dealer} ${custom.roleButton}`}
            onClick={() => {
              browserHistory.push("/dealer");
            }}
          >
          Dealer
          </button>
        </div>
      </section>
    </div>
    );
    ```


 - We now need to create components for the car buyer and the car dealer.
 - Create a file under `src/client/components` called `user.jsx`, with the following content:

    ```js
    USER FILE CONTENT HERE
    ```

 - Create a file called `dealer.jsx` under the components directory.
   Add the following content:

    ```js
    DEALER FILE CONTENT

    ```

  - We will also create a common component called `car.jsx` used to display information about a car. This will be used both by the user and the dealer component.

    ```js
    Car JS file content
    ```

  - Also add another component, `banner.jsx` that serves as a header for the pages.
    
    ```js
    Banner content
    ```
 - Add corresponding css files for the components created:
  [banner.css](./src/client/styles/banner.css)
  [user.css](./src/client/styles/user.css)
  [dealer.css](./src/client/styles/dealer.css)
  [car.css](./src/client/styles/car.css)
  [banner.css](./src/client/styles/banner.css)
  
    Also update:
    [section.css](./src/client/styles/section.css)
    [custom.css](./src/client/styles/custom.css)

- Add a few images for the cars.

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
    
    We will store the inventory in a file called `vehicles.json` stored under the `data` directory at the root level.
    You can copy the content for the file from [here](./data/vehicles.json).
    
    Create a file called `vehicles.js` under `server/plugins` with content from [here](./src/server/plugins/vehicles.js)

    Register this plugin in `config/default.js` under `plugins`:
    ```js
    "./server/plugins/vehicles": {
      module: "./{{env.APP_SRC_DIR}}server/plugins/vehicles"
    }
    ```

 - Now add another component, `car-details.jsx` and its corresponding    css.
   Also update `client/routes.jsx` with the new Route:
   ```
   import CarDetails from "./components/car-details";
   <Router>
    ..
    ..
    <Route path="/car-details" component={CarDetails} />
   </Router>
  ```
