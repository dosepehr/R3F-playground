import React from 'react';
import {
    OrbitControls,
    useGLTF,
    Environment,
    Float,
    PresentationControls,
    ContactShadows,
    Html,
    Text,
} from '@react-three/drei';

const Laptop = () => {
    const computer = useGLTF('/laptop/model.gltf');
    return (
        <>
            <Environment preset='city' />
            <color args={['#695b5b']} attach='background' />
            <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]} // vertical
                azimuth={[-1, 0.75]} //herozintal
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
            >
                <Float rotationIntensity={0.4}>
                    <rectAreaLight
                        width={2.5}
                        height={1.65}
                        intensity={65}
                        color={'#000'}
                        rotation={[0.1, Math.PI, 0]}
                        position={[0, 0.55, -1.15]}
                    />
                    <primitive object={computer.scene} position-y={-1.2}>
                        <Html
                            transform
                            wrapperClass='htmlScreen'
                            distanceFactor={1.17}
                            position={[0, 1.56, -1.4]}
                            rotation-x={-0.256}
                        >
                            <iframe
                                src='https://tailwind-portfolio.onrender.com'
                            ></iframe>
                        </Html>
                    </primitive>
                    <Text
                        fontSize={1}
                        position={[2, 0.75, 0.75]}
                        rotation-y={-1.25}
                        maxWidth={2.5}
                        textAlign='center'
                    >
                        SEPEHR DO
                    </Text>
                </Float>
            </PresentationControls>
            <ContactShadows
                position-y={-1.4}
                opacity={0.4}
                scale={5}
                blur={2.4}
            />
        </>
    );
};

export default Laptop;
