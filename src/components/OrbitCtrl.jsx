import { useThree, extend } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

extend({ OrbitControls });

const OrbitCTRL = () => {
    const { camera, gl } = useThree();

    return (
        <>
            <orbitControls args={[camera, gl.domElement]} />
        </>
    );
};

export default OrbitCTRL;
