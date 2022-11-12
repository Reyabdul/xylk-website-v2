import React, { useState, useEffect } from 'react';
import Products from './components/Product';
import Scene from './components/Scene';
import "../src/styles/app.css";

import Matter from 'matter-js';


const App = ({client}) => {


    const imgArr = [];

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

    useEffect(() => {
        fetchThemProducts();
    }, []);

    //console.log(productData)


    useEffect(()=> {
        //console.log(productData);
        productData.map((product, i ) => {
            //console.log(product.images[0].src)
            imgArr.push(product.images[0]);
        })
       console.log(imgArr);
    }, [productData])

    return (
        <>
            <Products productData={productData}/>
            <Scene productData={productData} imgArr={imgArr}/>
        </>
    )

}

export default App;