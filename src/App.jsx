import React, { useEffect, useState } from "react";
import Client from "shopify-buy";

//ACCESSING SHOPIFY
const SHOPIFY_KEY = process.env.REACT_APP_SHOPIFY_KEY;

//establish the client
const client = Client.buildClient({
    domain: 'xylk.myshopify.com',
    storefrontAccessToken: SHOPIFY_KEY
});

const App = () => {

    const [productData, setProductData] = useState([]);

    //fetch all products
    const fetchThemProducts = () => {
        let productsArray = [];
        client.product.fetchAll().then((products) => {
            for (let i = 0; i < products.length; i++) {
                if (products[i] !== undefined) {
                    productsArray.push(products[i]);
                }
            }
            setProductData(productsArray);

        }).catch((error) => {
            console.log(error);
        })
     }

     //open the store url
     const openProductWindow = (e) => {
        window.location.href = e.target.dataset.url;
     }
     
     useEffect(() => {
        fetchThemProducts();
     }, []);

    return (
        <div> 
            {productData.map((product, i) => {
                return (
                    <div>
                       <img className = "image-send" 
                            data-url = {product.onlineStoreUrl} 
                            src = {product.images[0].src} 
                            style = {{width:"30%"}} 
                            onClick={(e) => openProductWindow(e)}
                        /> 
                    </div>
                )
            })}
        </div>
    )
}

export default App;