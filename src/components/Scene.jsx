//Reference:
//Matter.js Docs: 
//https://brm.io/matter-js/docs/classes/Engine.html#methods
//https://github.com/liabru/matter-js/wiki/Getting-started
//Extra Docs:
//https://paulie.dev/posts/2020/08/react-hooks-and-matter-js/
//https://codesandbox.io/s/76c81?file=/src/Scene.js:230-434

import React, { useEffect, useRef, useState } from "react";
import Matter, { Engine, Render, Runner, World, Body, Bodies, Common, Composite, Events, Mouse, MouseConstraint, Query } from "matter-js";
import Products from "./Product";


const Scene = ({ productData }, { id, x, y }) => {
    //console.log(productData);
    //added by akash
    let bodies = [];
    let bodiesDom;

    var VIEW = {};
    VIEW.width    = window.innerWidth;
    VIEW.height   = window.innerHeight;
    VIEW.centerX  = VIEW.width / 2;
    VIEW.centerY  = VIEW.height / 2;
    VIEW.offsetX  = VIEW.width / 2;
    VIEW.offsetY  = VIEW.height / 2;

    //Dimensions use for engine
    const matterWidth = window.innerWidth, matterHeight = window.innerHeight;

    /*
    //Creating background
    const scene = useRef();
    */
   /*
    //new Image array
    const [newP, setNewP] = useState([]);
*/

    //for the position
    const [position, setPosition] = useState([{id: id, x: x, y: y}]);

    const boxRef = useRef(null);
    const canvasRef = useRef(null);

    const newP = productData;

    /*
    //creates an image array called 'newP'
    useEffect(() => {
        //console.log(productData);
        let imgArr = [];
        productData.map((product, i) => {

            imgArr.push(product.images[0].src)

            setNewP(imgArr);
        })
    }, []);

    //console.log(newP);


    //creates an object rendering of productData
    const RenderProductData = () => {
        {
            Object.keys(productData).map((i) => {
                //console.log(productData);
                return (
                    <>
                        <div className="product-images">
                            <h1> {productData[i].id} </h1>
                        </div>
                    </>
                )
            })
        }
    }

    useEffect(() => {
        RenderProductData();
    })
*/

    const init = () => {
        console.log(productData[0]);

        //CREATE 'ENGINE' (physics engine)
        const engine = Engine.create({
            positionIterations: 20, //An integer Number that specifies the number of position iterations to perform each update. The higher the value, the higher quality the simulation will be at the expense of performance.
            gravity: {
                x: 0,
                y: 0,
                scale: 0.01 //The gravity scale factor
            }
        }),
            world = engine.world;
        ;

        //CREATE A 'RENDERER'
        const render = Render.create({
            element: boxRef.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
                width: matterWidth,
                height: matterHeight,
                background: "#FFF",
                wireframes: false,
            }
        });

        //CREATE A 'RUNNER'
        var runner = Runner.create();

        //CREATING BODIES

/*
        //The 'ball'
        let ball1 = Bodies.rectangle(10, 10, 100, 100, {
            label: "ball",
            restitution: 1, //bounciness
            friction: 0,
            frictionAir: 0,
            density: 0.1, //degree of consistency measured by the quantity of mass per unit volume.
            inertia: Infinity,
            render: {
                fillStyle: "blue",
                sprite: {
                    //texture: newP[0],
                    xScale: 0.2,
                    yScale: 0.2,
                }

            }
        });

        //console.log(ball1);

        //The 'ball'
        let ball2 = Bodies.circle(10, 10, 10, {
            label: "ball",
            restitution: 1, //bounciness
            friction: 0,
            frictionAir: 0,
            density: 0.1, //degree of consistency measured by the quantity of mass per unit volume.
            inertia: Infinity,
            render: {
                fillStyle: "#transparent",

            }
        });

*/

        //creating red ball arrays
        //body and bodies were declared on the top
        let bodiesDom = document.getElementsByClassName('bags');
        bodies = [];
        let body;

        for (var i = 0; i < bodiesDom.length; i++) {
            if (bodiesDom[i]) {

                body = Bodies.circle( VIEW.centerX + Math.floor(Math.random() * VIEW.width/2) - VIEW.width/4, VIEW.centerY + Math.floor(Math.random() * VIEW.height/2) - VIEW.height/4, 30, {
                    label: "ball",
                    restitution: 1, //bounciness
                    friction: 0,
                    frictionAir: 0,
                    density: 0.1, //degree of consistency measured by the quantity of mass per unit volume.
                    inertia: Infinity,
                    render: {
                        fillStyle: "red",
                        sprite: {
                            //texture: bodiesDom[0].innerHTML,
                            texture: bodiesDom[i].firstChild.src,
                            xScale: 0.06,
                            yScale: 0.06,
                        }
                    },
                    url: productData[i].onlineStoreUrl,
                })
            }


            //bodiesDom[i].id = body.id;
            bodies.push(body);

            //position for the red floating balls
            //console.log(bodies[i].position.x);
            //console.log(bodies[i].position.y);
            //console.log(body);

            //position for the images
            //console.log(bodiesDom[i].offsetLeft);
            //console.log(bodiesDom[i].offsetTop);
            //console.log(bodiesDom[i].firstChild.src);

            //console.log(Object.keys(bodiesDom));

            //function that should connect the balls and images
            const imgPosition = () => {
                //console.log(bodies[i].position.x);
                //console.log(bodies[i].position.y);
                if(bodiesDom[i].id = newP[i.id]) {
                    setPosition([
                        ...position,
                        {
                            id: bodiesDom[i].id,
                            x: bodies[i].position.x,
                            y: bodies[i].position.y
                        }
                    ]);
                }
                //console.log(bodiesDom[i]);
                //bodiesDom[i].style.position="absolute";
                //bodiesDom[i].style.left = position[i].x;
                //bodiesDom[i].style.top = position[i].y;
                //console.log(position[i]);
            };
            //imgPosition();

  //          console.log(position);


            //console.log(imageOSL);
            //console.log(imageOST);

         /*
            const obtainCurrentPosition = useRef((e) => {
                setPosition((position) => {
                  const xDiff = position.coords.x - e.pageX
                  const yDiff = position.coords.y - e.pageY
                  return {
                    x: position.x - xDiff,
                    y: position.y - yDiff,
                    coords: {
                      x: e.pageX,
                      y: e.pageY,
                    },
                  }
                })
              })

            const handleMove = (bodiesDom) => {
                const bodieDomX = bodiesDom[i].offsetX
                const bodieDomY = bodiesDom[i].offsetY
                setPosition((position) =>
                  Object.assign({}, position, {
                    coords: {
                      x: pageX,
                      y: pageY,
                    },
                  }),
                )
                document.addEventListener('mousemove', )
              }

*/
        }

        //console.log(position);

        //console.log(bodiesDom);
        console.log(bodies);
        //console.log(body);

        //console.log(productData[0].onlineStoreUrl)

        //The 'walls'
        const WALLWIDTH = 20;

        const wallOptions = {
            restitution: 1,
            isStatic: true,
            density: 1,
            render: {
                fillStyle: "orange"

            }
        }


        //ADDING ALL THE BODIES INTO THE WORLD

        //Adding Walls
        World.add(engine.world, [
            //walls (Bodies.rectangle(x, y, width, height, [options]))

            //top
            Bodies.rectangle(0, 0, matterWidth * 2, WALLWIDTH, {
                ...wallOptions,
                label: "wall_top"
            }),

            //Bottom
            Bodies.rectangle(0, matterHeight, matterWidth * 2, WALLWIDTH, {
                ...wallOptions,
                label: "wall_bottom"
            }),

            // Left
            Bodies.rectangle(0, matterHeight, WALLWIDTH, matterWidth * 2, {
                ...wallOptions,
                label: "wall_left"
            }),

            // Right
            Bodies.rectangle(matterWidth, 0, WALLWIDTH, matterWidth * 2, {
                ...wallOptions,
                label: "wall_right"
            })
        ]);



// Create a Mouse-Interactive object & add it to the World
        //sourced from: https://stackoverflow.com/questions/44996124/matter-js-option-to-add-html-to-body
render.mouse = Matter.Mouse.create(render.canvas);
var mouseInteractivity = Matter.MouseConstraint.create(engine, {
                          mouse: render.mouse,
                          constraint: {
                            stiffness: 0.2,
                            render: { visible: false }
                          }
                         });
Matter.World.add(engine.world, mouseInteractivity);

// Create a On-Mouseup Event-Handler
Events.on(mouseInteractivity, 'mouseup', function(event) {
  var mouseConstraint = event.source;
  var bodies = engine.world.bodies;
  if (!mouseConstraint.bodyB) {
    for (i = 0; i < bodies.length; i++) { 
      var body = bodies[i];
      if (Matter.Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
        var bodyUrl = body.url;
        console.log("Body.Url >> " + bodyUrl);
        // Hyperlinking feature
        if (bodyUrl != undefined) {
          window.open(bodyUrl, '_blank');
          console.log("Hyperlink was opened");
        }
        break;
      }
    }
  }
});

        //Adding the ball
       // World.add(world, [ball1]);
        World.add(world, bodies);



        // function following the collisionStart event
        var handleCollision = (e) => {
            //if (this.props.active) {
            const { pairs } = e;
            // loop through the pairs array(s) and update the score if a collision is detected between a ball and a pocket
            pairs.forEach((pair) => {
                const { bodyA, bodyB } = pair;
                // String.includes allows to find if the label contains a certain string of text
                if (bodyA.label.includes("ball") && bodyB.label === "wall_bottom") {
                    //this.props.action();
                }
            });
            // }
        };

        
        //Applying the force to move the ball
        Body.applyForce(body, { x: 0.1, y: 0.1 }, { x: 8.0, y: 4.0 });
        //Body.applyForce(ball1, { x: 0.1, y: 0.1 }, { x: 3.0, y: 3.0 });
        //Body.applyForce(body, { x: 0.1, y: 0.1 }, { x: 0.11, y: 0.11 });


        Events.on(engine, "collisionStart", handleCollision);
        Runner.run(runner, engine);
        Render.run(render);

    };

    //the use effect that activates the matter.js enviornment
    useEffect(() => {
        setTimeout(() => {
            init();
        }, 100)
    })


    return (
        <>
            <div
                ref={boxRef}
                style={{ width: "100vw", height: "100vh" }}
            >
                <canvas ref={canvasRef} />
                <Products productData={productData} />
            </div>


            {/*
                        <div id = "matter-container" ref = {scene} style = {{width: "100vw", height: "100vh"}}>
                            <div id = "product-images-container">
                                {Object.keys(productData).map((i) => {
                                    console.log(productData);
                                    return (
                                        <>
                                            <div className="product-images"> 
                                                <h1> {productData[i].id} </h1>
                                                <img src = {productData[i].images[0].src}/>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    */}
        </>
    )
}

export default Scene;