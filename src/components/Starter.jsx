import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { DoubleSide } from 'three';
import OrbitCTRL from './OrbitCTRL';

function Starter() {
    const BoxRef = useRef();
    const GroupRef = useRef();
    useFrame((state, delta) => {
        GroupRef.current.rotation.y += delta;
    });
    return (
        <>
            <OrbitCTRL />
            <directionalLight position={[1, 2, 3]} />
            <group ref={GroupRef}>
                <mesh position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color='pink' />
                </mesh>
                <mesh
                    position-x={2}
                    scale={1.5}
                    rotation-y={Math.PI * 0.25}
                    ref={BoxRef}
                >
                    <meshStandardMaterial color='orange' />
                    <boxGeometry />
                </mesh>
            </group>
            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color='green' side={DoubleSide} />
            </mesh>
        </>
    );
}

export default Starter;
