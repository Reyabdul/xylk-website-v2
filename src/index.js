import React from "react";
import ReactDOM from "react-dom";
import Client from "shopify-buy";
import { createRoot } from 'react-dom/client';


import App from "../src/App"

//ACCESSING SHOPIFY
const SHOPIFY_KEY = process.env.REACT_APP_SHOPIFY_KEY;

//establish the client
const client = Client.buildClient({
    domain: 'xylk.myshopify.com',
    storefrontAccessToken: SHOPIFY_KEY
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  
  <App client={client}/>
)
