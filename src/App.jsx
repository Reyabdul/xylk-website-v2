import React, { useState, useEffect } from 'react';
import Products from './components/Product';
import Scene from './components/Scene';
import "./styles/App.css";


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
            <div>

                <Scene productData={productData}/>
                
                

            </div>
    )
}

export default App;