import React, { useState, useEffect } from 'react';
import Scene from './components/Scene';
import "./styles/app.css";

import ModelScene from './components/ModelScene';

const App = ({client}) => {

    //Shopify product data
    const [productData, setProductData] = useState([]);

    //fetch all products
    useEffect(() => {
        client.product.fetchAll()
        .then((data) => setProductData(data))
        .catch((error) => {
            console.log(error);
        })
    }, []); 

    return (
        <>
            <div id = "bags-canvas">
                <Scene productData={productData}/>
            </div>
            
            <div id = "figure-canvas">
                <ModelScene />
            </div>
        </>

            
    )
}

export default App;