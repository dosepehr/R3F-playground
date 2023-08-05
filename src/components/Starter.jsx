import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { DoubleSide, DirectionalLightHelper } from 'three';
import { useControls, button } from 'leva';
import {
    OrbitControls,
    Html,
    MeshReflectorMaterial,
    useHelper,
    BakeShadows,
    SoftShadows,
    Environment,
} from '@react-three/drei';

const Starter = () => {
    const { position, color, visible, choise } = useControls('font', {
        position: {
            value: { x: 0, y: 0 },
            min: -4,
            max: 4,
            step: 0.01,
            joystick: 'invertY',
        },
        color: '#ff0000',
        visible: true,
        range: {
            min: 0,
            max: 10,
            value: [4, 5],
        },
        log: button(() => {
            console.log('ok');
        }),
        choise: {
            options: [
                'hello there',
                'may the force be with you',
                'the dark side of the force ',
            ],
        },
    });
    const directionalLight = useRef();

    const BoxRef = useRef();
    const ballRef = useRef();
    const GroupRef = useRef();
    useFrame((state, delta) => {
        // GroupRef.current.rotation.y += delta;
    });
    return (
        <>
            <OrbitControls makeDefault />
            <directionalLight
                position={[1, 2, 3]}
                intensity={1.5}
                ref={directionalLight}
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={5}
                shadow-camera-right={5}
                shadow-camera-bottom={-5}
                shadow-camera-left={-5}
            />
            <ambientLight intensity={0.5} />
            <group ref={GroupRef}>
                <mesh position-x={-2} ref={ballRef} castShadow>
                    <sphereGeometry />
                    <meshStandardMaterial color='pink' envMapIntensity={10} />
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
                {/* box */}
                <mesh
                    castShadow
                    position-x={2}
                    scale={1.5}
                    rotation-y={Math.PI * 0.25}
                    ref={BoxRef}
                >
                    <meshStandardMaterial color='orange' envMapIntensity={10} />
                    <boxGeometry />
                </mesh>
                {/* box */}
            </group>
            <mesh
                position-y={-1}
                rotation-x={-Math.PI * 0.5}
                scale={10}
                receiveShadow
            >
                <planeGeometry />
                <meshStandardMaterial
                    color='green'
                    side={DoubleSide}
                    envMapIntensity={10}
                />
            </mesh>
        </>
    );
};

export default Starter;
