import React, { useEffect, useState, useRef } from "react";
import Scene from "./Scene";
import Matter from "matter-js";
import "../styles/Product.css"       


const Products = ({productData}) => {

    

    //open the store url
    const openProductWindow = (e) => {
        window.location.href = e.target.dataset.url;
    }

    
    return (
        
            <div>
                {productData.map((product, i) => {
                    return (
                        <div className="bags"  key={product.id}>
                            <img className="image-send"                         
                                data-url={product.onlineStoreUrl}
                                src={product.images[0].src}
                                style={{ width: "20%" }}
                                onClick={(e) => openProductWindow(e)}
                            />
                        </div>
                    )
                })}
            </div>
    )


}

export default Products;