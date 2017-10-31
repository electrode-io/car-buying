# FAQ for car-buying app development

## Why I cannot start the server by `clap dev` for the app?

If you seen the issues similar to

```
m-C02SL0GSG8WM:~ s0d00px$ clap dev
Cannot find the module xclap at CWD /Users/s0d00px
Please install it with 'npm install xclap'
```

or

```
npm ERR! code E401
npm ERR! 401 Unauthorized: electrode-archetype-react-app@^4.0.0

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/s0d00px/.npm/_logs/2017-10-31T00_00_48_129Z-debug.log
```

The above error is caused by `npm/lifecycle` module with npm@5.4.x which leads to an incorrect npm installation.
Please verify your npm version. If you are under npm@5.4.x, please either downgrade to npm@5.3.x or a more stable version npm@5.5.x.


## What tools can we use when developing this car-buying app?

You can use Electrode [webpack-reporter](https://github.com/electrode-io/electrode/tree/master/packages/electrode-webpack-reporter). Electrode Webpack Reporter is a HTML based reporter for webpack-dev-server. While you are developing, you may see some error messages in your terminal saying:

```
webpack bundle is now VALID but has ERRORS

webpack report is served from http://localhost:2992/reporter
 > isomorphic-loader extend require: webpack dev server mode - waiting for config to become valid.
 > isomorphic-loader extend require: file watcher config is now invalid
```

You can switch to your browser, and open a new tab `http://localhost:2992/reporter`. You shall see the detailed information of the issue under the `Error` section. Electrode webpack reporter can also tracking the sizes of the assets, modules by packages and legacy for your app. For more detailed information, please check [here](https://github.com/electrode-io/electrode/tree/master/packages/electrode-webpack-reporter).
