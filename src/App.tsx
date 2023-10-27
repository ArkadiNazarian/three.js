import { useState } from 'react';
import './App.css';
import { Three } from './three';
import ASD from './newthree';


function App() {

  const [v, set_v] = useState<string>()
  const handlechange = async (e: any) => {
    const file = await e.target.files[0];
    const blob = URL.createObjectURL(file);
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = blob;
    a.download = "fileName.stl";
    // a.click()
    // console.log(blob)
    // set_v(blob)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      {/* {
        v && <Three stl={v}/>
      } */}
      <Three stl="https://s3.amazonaws.com/minifactory-stl/WALLY_1plate.stl" />
      <input type='file' onChange={(e) => handlechange(e)} title='upload' />
      <ASD/>
    </div>
  );
}

export default App;

// https://d.staging.layers.app/stl/6536819982df3d65319a3f3f/stl/a7ed796f-e9c8-4b4c-ab12-617bb6fdddb8.stl
