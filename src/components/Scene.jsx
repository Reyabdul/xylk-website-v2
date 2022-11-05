import React, { useEffect, useRef}  from "react";
import Matter from "matter-js";
import { responsiveFontSizes } from "@mui/material";


const HEIGHT = 256;
const WIDTH = 512;


//Reference:
    //Matter.js Docs: 
        //https://brm.io/matter-js/docs/classes/Engine.html#methods
        //https://github.com/liabru/matter-js/wiki/Getting-started
    //Extra Docs:
        //https://paulie.dev/posts/2020/08/react-hooks-and-matter-js/
        //https://codesandbox.io/s/76c81?file=/src/Scene.js:230-434


const Scene = () => {

    const boxRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        
        //MODULES ALIAS
        let Engine = Matter.Engine;
        let Runner = Matter.Runner;
        let Render = Matter.Render;
        let World = Matter.World;
        let Body = Matter.Body;
        let Bodies = Matter.Bodies;
        let Events = Matter.Events;

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
            element: boxRef.current,
            engine: engine,
            options: {
                width: WIDTH,
                height: HEIGHT,
                wireframes: false
            }
        });

        //CREATING BODIES

        //The 'ball'
        let ball = Bodies.circle( 10, 10, 10, {
            label: "ball",
            restitution: 1, //bounciness
            friction: 0,
            frictionAir: 0,
            density: 0.1, //degree of consistency measured by the quantity of mass per unit volume.
            inertia: Infinity
        });

        //The 'walls'
        const WALLWIDTH = 10;

        const wallOptions = {
            restitution: 1,
            isStatic: true,
            density: 1,
            render: {
                fillStyle: "white"
            }
        }


        //ADDING ALL THE BODIES INTO THE WORLD
        
        //Adding Walls
        World.add(engine.world, [
            //walls (Bodies.rectangle(x, y, width, height, [options]))
            
            //top
            Bodies.rectangle(0, 0, WIDTH * 2,  WALLWIDTH, {
                ...wallOptions,
                label: "wall_top"
            }),

            //Bottom
            Bodies.rectangle(0, HEIGHT, WIDTH * 2, WALLWIDTH, {
                ...wallOptions,
                label: "wall_bottom"
            }),
      
            // Left
            Bodies.rectangle(0, HEIGHT, WALLWIDTH, WIDTH, {
              ...wallOptions,
              label: "wall_left"
            }),
      
            // Right
            Bodies.rectangle(WIDTH, 0, WALLWIDTH, WIDTH, {
              ...wallOptions,
              label: "wall_right"
            })
        ]);

        //Adding the ball
        World.add(engine.world, [ball]);

        // function following the collisionStart ev
        const handleCollision = (e) => {
            if(this.props.active) {
                const {pairs} = e;
                // loop through the pairs array(s) and update the score if a collision is detected between a ball and a pocket
                pairs.forEach((pair) => {
                    const { bodyA, bodyB } = pair;
                    // String.includes allows to find if the label contains a certain string of text
                    if(bodyA.label.includes("ball") && bodyB.label === "wall_bottom") {
                        this.prop.action();
                    }
                });
              }
            };

            Body.applyForce(ball, { x: 0.1, y: 0 }, { x: 0.11, y: 0.11 });

            Events.on(engine, "collisionStart", handleCollision);
            Runner.run(engine);
            Render.run(render);
        }, []);

        return (
            <div
              ref={boxRef}
              style={{
                width: 300,
                height: 300
              }}
            >
              <canvas ref={canvasRef} />
            </div>
          );
    }

export default Scene;