import { useState } from 'react';
import './App.css';
import { Three } from './three';


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
      <Three stl="https://firebasestorage.googleapis.com/v0/b/dgenius-fd899.appspot.com/o/image%2Fe.stl?alt=media&token=30879c73-c6be-44da-87e8-cab8f8ab833f&_gl=1*71e2ln*_ga*MjA0MjIwNTEwMi4xNjc2ODI0ODky*_ga_CW55HF8NVT*MTY5ODMzMjg1OS44MS4xLjE2OTgzMzMwODEuNDUuMC4w" />
      <input type='file' onChange={(e) => handlechange(e)} title='upload' />
    </div>
  );
}

export default App;

// https://d.staging.layers.app/stl/6536819982df3d65319a3f3f/stl/a7ed796f-e9c8-4b4c-ab12-617bb6fdddb8.stl
