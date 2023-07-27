import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Canvas } from '@react-three/fiber';
import { CineonToneMapping, SRGBColorSpace } from 'three';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Canvas
            // dpr={[1, 2]}
            // flat // no tone mapping
            // orthographic
            gl={{
                antialias: true,
                // toneMapping: CineonToneMapping,
                // outputColorSpace:SRGBColorSpace
            }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [3, 2, 6],
                // zoom: 100,
            }}
        >
            <App />
        </Canvas>
    </React.StrictMode>
);
