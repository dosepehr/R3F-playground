import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { DoubleSide } from 'three';
// import OrbitCTRL from './OrbitCTRL';
import {
    OrbitControls,
    TransformControls,
    PivotControls,
    Html,
} from '@react-three/drei';

function Starter() {
    const BoxRef = useRef();
    const ballRef = useRef();
    const GroupRef = useRef();
    useFrame((state, delta) => {
        // GroupRef.current.rotation.y += delta;
    });
    return (
        <>
            <OrbitControls makeDefault />
            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />
            <group ref={GroupRef}>
                <PivotControls
                    anchor={[0, 0, 0]}
                    depthTest={false}
                    lineWidth={4}
                    // axisColors={[]}
                    scale={1}

                    // fixed={}
                >
                    <mesh position-x={-2} ref={ballRef}>
                        <sphereGeometry />
                        <meshStandardMaterial color='pink' />
                        <Html
                            position={[1, 1, 0]}
                            wrapperClass='label'
                            center
                            distanceFactor={6}
                            occlude={[ballRef, BoxRef]}
                        >
                            <div className='test'>that's a Sphere⚽</div>
                        </Html>
                    </mesh>
                </PivotControls>
                {/* box */}
                <mesh
                    position-x={2}
                    scale={1.5}
                    rotation-y={Math.PI * 0.25}
                    ref={BoxRef}
                >
                    <meshStandardMaterial color='orange' />
                    <boxGeometry />
                </mesh>
                <TransformControls object={BoxRef} />
                {/* box */}
            </group>
            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color='green' side={DoubleSide} />
            </mesh>
        </>
    );
}

export default Starter;
