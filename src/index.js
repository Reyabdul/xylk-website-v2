import React from "react";
import ReactDOM from "react-dom";
import Client from "shopify-buy";

import App from "./App";

//ACCESSING SHOPIFY
const SHOPIFY_KEY = process.env.REACT_APP_SHOPIFY_KEY;

//establish the client
const client = Client.buildClient({
    domain: 'xylk.myshopify.com',
    storefrontAccessToken: SHOPIFY_KEY
});

ReactDOM.render(<App client={client}/>, document.querySelector("#root"));