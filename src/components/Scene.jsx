//Reference:
//Matter.js Docs: 
//https://brm.io/matter-js/docs/classes/Engine.html#methods
//https://github.com/liabru/matter-js/wiki/Getting-started
//Extra Docs:
//https://paulie.dev/posts/2020/08/react-hooks-and-matter-js/
//https://codesandbox.io/s/76c81?file=/src/Scene.js:230-434

import React, { useEffect, useRef, useState, useCallback } from "react";
import Matter, { Engine, Render, Runner, World, Body, Bodies, Common, Composite, Events, Mouse, MouseConstraint, Query, Sleeping } from "matter-js";
import Products from "./Product";

const Scene = ({ productData }) => {


    //Matter.js Bodies
    let bodies = [];
    let body;
    let bodiesDom;

    //for Button that stops the bags that movie
    //console.log(active);
    const [buttonText, setButtonText] = useState("stop");

    //Dimensions use for engine
    const VIEW = {};
    VIEW.width    = window.innerWidth;
    VIEW.height   = window.innerHeight;
    VIEW.centerX  = VIEW.width / 2;
    VIEW.centerY  = VIEW.height / 2;
    VIEW.offsetX  = VIEW.width / 2;
    VIEW.offsetY  = VIEW.height / 2;

    const matterWidth = window.innerWidth, matterHeight = window.innerHeight - 70;

    //Canvas
    const boxRef = useRef(null);
    const canvasRef = useRef(null);

    const init = () => {

        //CREATE 'ENGINE' (physics engine)
        const engine = Engine.create({
            enableSleeping: false,
            positionIterations: 20, //An integer Number that specifies the number of position iterations to perform each update. The higher the value, the higher quality the simulation will be at the expense of performance.
            gravity: {
                x: 0,
                y: 0,
                scale: 0.01 //The gravity scale factor
            }
        }), world = engine.world;

        //CREATE A 'RENDERER'
        const render = Render.create({
            element: boxRef.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
                width: matterWidth,
                height: matterHeight,
                background: "transparent",
                wireframes: false,
            }
        });

        //CREATE A 'RUNNER'
        var runner = Runner.create();

        //CREATING BODIES
        //creating red ball arrays
        //body and bodies were declared on the top
        bodiesDom = document.getElementsByClassName('bags');

        for (var i = 0; i < bodiesDom.length; i++) {
            if (bodiesDom[i]) {
                body = Bodies.circle( VIEW.centerX + Math.floor(Math.random() * VIEW.width/2) - VIEW.width/4, VIEW.centerY + Math.floor(Math.random() * VIEW.height/2) - VIEW.height/4, 30, {
                    label: "ball",
                    restitution: 1, //bounciness,
                    isStatic: false,
                    friction: 0,
                    frictionAir: 0,
                    density: 0.1, //degree of consistency measured by the quantity of mass per unit volume.
                    inertia: Infinity,
                    render: {
                        fillStyle: "transparent",
                        sprite: {
                            texture: bodiesDom[i].firstChild.src,
                            xScale: 0.06,
                            yScale: 0.06,
                        }
                    },
                    url: productData[i].onlineStoreUrl,
                })
            }
              //Applying the force to move the ball
            Body.applyForce(body, 
                { x: 100, y: 100 }, 
                { x: Math.random() * 1.2, y: -Math.random() * 1.2 }
            );
            bodies.push(body);
            console.log(bodies[i]);
        }

        //Wall options'
        const WALLWIDTH = 20;

        const wallOptions = {
            restitution: 1,
            isStatic: true,
            density: 1,
            render: {
                fillStyle: "transparent"

            }
        }

        //ADDING ALL THE BODIES INTO THE WORLD

        //Adding Walls
        World.add(engine.world, [
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

        // Create a On-Mouseup Event-Handler (for url)
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
        World.add(world, bodies);

        //Events.on(mouseInteractivity, "mouseup", handleCollision);
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
            <div ref={boxRef} style={{ width: "100vw", height: "100vh" }}>
                <canvas ref={canvasRef} />
                <Products productData={productData} />
                <button id="stop-button" onClick={(e) => {
                    bodies.forEach((b) => {
                        if ((!b.isStatic)) {
                            b.isStatic = true;    
                        } else {
                            b.isStatic = false;     
                        }

                        if (b.isStatic) {
                            e.target.innerHTML = "Start";
                        } else if (!b.isStatic) {
                            e.target.innerHTML = "Stop";
                        }
                    })
                }}>
                    Stop
                </button>
            </div>
        </>
    )
}

export default Scene;