//Reference:
    //Matter.js Docs: 
        //https://brm.io/matter-js/docs/classes/Engine.html#methods
        //https://github.com/liabru/matter-js/wiki/Getting-started
    //Extra Docs:
        //https://paulie.dev/posts/2020/08/react-hooks-and-matter-js/
        //https://codesandbox.io/s/76c81?file=/src/Scene.js:230-434

import React, { useEffect, useRef, useState }  from "react";
import Matter from "matter-js";
import Products from "./Product";




const Scene = ({productData, imgArr}) => {

    //Dimensions use for engine
    const matterWidth = window.innerWidth, matterHeight = window.innerHeight;
    
    //Creating background
    const scene = useRef(null);


    //console.log(imgArr);
    //console.log(productData);

    useEffect(() => {
        
        //MODULES ALIAS
        let Engine = Matter.Engine;
        let Runner = Matter.Runner; //The Matter.Runner module is an optional utility which provides a game loop, that handles continuously updating a Matter.Engine for you within a browser
        let Render = Matter.Render;
        let World = Matter.World;
        let Body = Matter.Body;
        let Bodies = Matter.Bodies;
        let Composite = Matter.Composite;
        let Events = Matter.Events;//module contains methods to fire and listen to events on other objects.

        //CREATE 'ENGINE' (physics engine)
        let engine = Engine.create({
            positionIterations: 20, //An integer Number that specifies the number of position iterations to perform each update. The higher the value, the higher quality the simulation will be at the expense of performance.
            gravity: {
                x: 0,
                y: 0,
                scale: 0.01 //The gravity scale factor
            }
        });

        //CREATE A 'RENDERER'
        let render = Render.create({
            element: scene.current,
            engine: engine,
            options: {
                width: matterWidth,
                height: matterHeight,
                background: "#FFF",
                wireframes: false,
                wireframeBackground: "transparent",
            }
        });

        //CREATING BODIES




        console.log(imgArr);

        //The 'ball'
        let ball1 = Bodies.rectangle( 10, 10, 100, 100, {
            label: "ball",
            restitution: 1, //bounciness
            friction: 0,
            frictionAir: 0,
            density: 0.1, //degree of consistency measured by the quantity of mass per unit volume.
            inertia: Infinity,
            render: {
                fillStyle: "blue",
                sprite: {
                    texture: imgArr[1].src,
                    xScale: 0.2,
                    yScale: 0.2,
                }

            }
        });

        //console.log(ball1);

            //The 'ball'
            let ball2 = Bodies.circle( 10, 10, 10, {
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


        //The 'walls'
        const WALLWIDTH = 10;

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
            //walls (Bodies.rectangle(x, y, width, height, [options]))
            
            //top
            Bodies.rectangle(0, 0, matterWidth * 2,  WALLWIDTH, {
                ...wallOptions,
                label: "wall_top"
            }),

            //Bottom
            Bodies.rectangle(0, matterHeight, matterWidth * 2, WALLWIDTH, {
                ...wallOptions,
                label: "wall_bottom"
            }),
      
            // Left
            Bodies.rectangle(0, matterHeight, WALLWIDTH, matterWidth, {
              ...wallOptions,
              label: "wall_left"
            }),
      
            // Right
            Bodies.rectangle(matterWidth, 0, WALLWIDTH, matterWidth, {
              ...wallOptions,
              label: "wall_right"
            })
        ]);

        //Adding the ball
        World.add(engine.world, [ball1]);

/*

        // function following the collisionStart ev
        const handleCollision = (e) => {

                const {pairs} = e;
                // loop through the pairs array(s) and update the score if a collision is detected between a ball and a pocket
                pairs.forEach((pair) => {
                    const { bodyA, bodyB } = pair;
                    // String.includes allows to find if the label contains a certain string of text
                    if(bodyA.label.includes("ball", "square") && bodyB.label === "wall_bottom") {
                        this.prop.action();
                        console.log(this.prop.action())
                    }
                });
              
            };
*/
            Body.applyForce(ball1, { x: 0.1, y: 0.1 }, { x: 3.0, y: 3.0 });
            Body.applyForce(ball2, { x: 0.1, y: 0.1 }, { x: 0.11, y: 0.11 });



         //  Events.on(engine, "collisionStart", handleCollision);
            Runner.run(engine); 
            Render.run(render);
        }, []);

        return (
            <>
            
                <div id = "matter-container" ref = {scene} style = {{width: "100vw", height: "100vh"}}>
                </div>
                
            </>
        )
    }

export default Scene;