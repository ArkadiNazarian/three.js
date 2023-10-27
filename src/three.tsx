import { useEffect, useRef, useState } from 'react';
import './App.css';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
// Deai - R3F
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';


const Model = (props: { selectedStl: string; ratio: number; set_ratio: any; }) => {
    const meshRef = useRef(null);

    let material = new THREE.MeshLambertMaterial({ color: "#ffffff" });
    // "https://s3.amazonaws.com/minifactory-stl/WALLY_1plate.stl"

    let geometry = useLoader(STLLoader, './file.stl').center();

    useEffect(() => {
        const xSize = geometry.boundingBox!.max.x;
        const ySize = geometry.boundingBox!.max.y;
        const zSize = geometry.boundingBox!.max.z;
        let maxSizeHelper = Math.max(xSize, ySize, zSize);
        // geometry.scale(2 / maxSizeHelper, 2 / maxSizeHelper, 2 / maxSizeHelper);
        props.set_ratio((2 * props.ratio) / maxSizeHelper);

    }, [props])

    useEffect(() => {
        // const exporter = new STLExporter();
        // const options = { binary: true }
        // const b = new THREE.Mesh(geometry, material)
        // const result = exporter.parse(b);
        // console.log(result)
        // var blob = new Blob([result], { type: 'text/plain' }); // Generate Blob from the string
        // var link = document.createElement('a');
        // link.style.display = 'none';
        // document.body.appendChild(link);
        // link.href = URL.createObjectURL(blob);
        // link.download = 'Scene.stl';
        // link.click();
        // ======================================================================================================


        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const plane = new THREE.Mesh(geometry,  new THREE.MeshBasicMaterial({color:"#A2A2A2"}));
        plane.position.z = -100;
        plane.rotateY(-60)
        // plane.rotateZ(20)
        // plane.rotateX(20)
        scene.add(plane);
     
        camera.position.z = 5;
        renderer.setClearColor("#ffffff");
        renderer.render(scene, camera);

        const link = document.createElement('a');
        link.download = 'my-image.png';
        link.href = renderer.domElement.toDataURL();
        link.click();
    }, [geometry])


    return (
        <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]} position={[0, geometry.boundingBox!.max.z, 0]}>
            <mesh
                // scale
                castShadow
                // receiveShadow
                ref={meshRef}
                // raycast
                geometry={geometry}
                material={material}
            />
            {/* {cubes} */}
            {/* {triangles} */}
        </group>
    )
}

export const Three = (props: { stl: string }) => {
    const canvasRef = useRef(null);
    const [ratio, set_ratio] = useState(1)

    return (
        <div
            ref={canvasRef}
            style={{ width: '40.926vw', height: '44.508vw' }}
        >
            {/* Our Scene & Camera is already built into our canvas */}
            <Canvas camera={{ position: [-50, 20, 100], fov: 60 }}>
                {props.stl && (
                    // <gridHelper
                    //     args={[
                    //         100000 * 1 * ratio,
                    //         10000,
                    //         0x444444,
                    //         0x050505,
                    //     ]}
                    // />
                    <gridHelper args={[2000, 200, "#000000"]} />
                )}
                <axesHelper args={[500]} />
                {/* This light makes things look pretty */}
                <ambientLight intensity={0.3} />
                {/* Our main source of light, also casting our shadow */}
                <directionalLight
                    castShadow
                    position={[10, 10, 10]}
                    intensity={1.5}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                {/* A light to help illumnate the spinning boxes */}
                <pointLight position={[-10, 0, -20]} intensity={0.5} />
                <pointLight position={[0, -10, 0]} intensity={1.5} />
                <group>
                    {/* This mesh is the plane (The floor) */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                        {/* <PlaneGeometry attach="geometry" args={[100, 100]} /> */}
                        <shadowMaterial attach="material" opacity={0.3} />
                    </mesh>
                    {/* <SpinningMesh
                position={[0, 1, 0]}
                color='lightblue'
                args={[3, 2, 1]}
                speed={2}
              /> */}
                    {props.stl && (

                        <Model
                            ratio={ratio}
                            set_ratio={set_ratio}
                            // stlColor={props.stlColor}
                            // maxSize={maxSize}
                            // stlBlob={stlBlob}
                            selectedStl={props.stl}
                        />

                    )}
                </group>
                {/* Allows us to move the canvas around for different prespectives */}
                <OrbitControls />
            </Canvas>
        </div>
    );
}