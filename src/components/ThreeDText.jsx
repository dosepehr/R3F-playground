import { useRef, useState } from 'react';
import {
    Text3D,
    OrbitControls,
    Center,
    useMatcapTexture,
} from '@react-three/drei';
import { useControls } from 'leva';
import { useFrame } from '@react-three/fiber';

const ThreeDText = () => {
    const [torusGeometry, setTorusGeometry] = useState();

    const donuts = useRef();
    const [matcap, url] = useMatcapTexture('3F4441_D1D7D6_888F87_A2ADA1', 256);
    const { size } = useControls({
        size: {
            value: 0.75,
            min: 0,
            max: 4,
            step: 0.01,
        },
    });

    useFrame((state, delta) => {
        for (const donut of donuts.current.children) {
            donut.rotation.y += delta * 0.5;
        }
    });
    return (
        <>
            <OrbitControls />
            <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />

            <Center>
                <Text3D
                    font='/fonts/helvetiker_regular.typeface.json'
                    size={size}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    HELLO R3F
                    <meshMatcapMaterial matcap={matcap} />
                </Text3D>
            </Center>
            <group ref={donuts}>
                {[...Array(100)].map((_, i) => (
                    <mesh
                        key={i}
                        geometry={torusGeometry}
                        position={[
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10,
                        ]}
                        scale={0.2 + Math.random() * 0.2}
                        rotation={[
                            Math.random() * Math.PI,
                            Math.random() * Math.PI,
                            Math.random() * Math.PI,
                        ]}
                    >
                        <meshMatcapMaterial matcap={matcap} />
                        {/* torus geometry */}
                    </mesh>
                ))}
            </group>
        </>
    );
};

export default ThreeDText;
