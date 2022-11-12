import React, { useEffect, useState } from "react";
import Scene from "./Scene";




    /*
let productObj;

//this is your new "modal" rendering function
const renderData = (product) => {
    //console.log(product)


    productObj = {
        "id": product.id,
        "title": product.title,
        "description": product.description,
        "images": product.images, 
    }

    return (

        <div>
            {productObj["id"]}
            {productObj["title"]}
            {productObj["description"]}
            {productObj["images"]}

        </div>
    )
}
*/

const Products = (productData) => {

    

    //open the store url
    const openProductWindow = (e) => {
        window.location.href = e.target.dataset.url;
    }

    

    return (
        <div>
            {/* 
            {productData.map((product, i) => {
                return (
                    <div   key={product.id}>
                        <img className="image-send"                         
                            data-url={product.onlineStoreUrl}
                            src={product.images[0].src}
                            style={{ width: "10%" }}
                            onClick={(e) => openProductWindow(e)}
                        />
                    </div>
                )
            })}
            */}
           
        </div>
  

    )


}

export default Products;