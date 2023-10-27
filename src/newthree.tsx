import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

function ASD() {
    const [stlFile, setStlFile] = useState<any>();
    const [scene, setScene] = useState<any>();
    const [camera, setCamera] = useState<any>();
    const [renderer, setRenderer] = useState<any>();
    const [mesh, setMesh] = useState<any>();
    const containerRef = useRef<any>(null);
  
    useEffect(() => {
      if (stlFile) {
        initScene();
        loadSTL();
        animate();
      }
    }, [stlFile]);
  
    const initScene = () => {
      const { clientWidth, clientHeight } = containerRef.current;
      const newScene = new THREE.Scene();
      const newCamera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.1, 1000);
      const newRenderer = new THREE.WebGLRenderer({ antialias: true });
      newRenderer.setSize(clientWidth, clientHeight);
      containerRef.current.appendChild(newRenderer.domElement);
      setScene(newScene);
      setCamera(newCamera);
      setRenderer(newRenderer);
    };
  
    const loadSTL = () => {
      const loader = new STLLoader();
      loader.load(stlFile, geometry => {
        const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        const newMesh = new THREE.Mesh(geometry, material);
        newMesh.position.set(0, 0, 0);
        newMesh.rotation.set(-Math.PI / 2, 0, 0);
        newMesh.scale.set(0.1, 0.1, 0.1);
        scene.add(newMesh);
        setMesh(newMesh);
      });
    };
  
    const animate = () => {
      requestAnimationFrame(animate);
      if (mesh) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
      }
      renderer?.render(scene, camera);
    };
  
    const handleFileChange = (e: any) => {
      const file = e.target.files[0];
      setStlFile(URL.createObjectURL(file));
    };
  
    return (
      <div>
        <input type="file" onChange={(e)=>handleFileChange(e)} />
        <div ref={containerRef} />
      </div>
    );
  }
  
  export default ASD;