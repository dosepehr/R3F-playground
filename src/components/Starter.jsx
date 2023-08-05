import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { DoubleSide } from 'three';
import { useControls, button } from 'leva';
import {
    OrbitControls,
    TransformControls,
    PivotControls,
    Html,
    Text,
    Float,
    MeshReflectorMaterial,
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
                {/* <PivotControls
                    anchor={[0, 0, 0]}
                    depthTest={false}
                    lineWidth={4}
                    // axisColors={[]}
                    scale={1}

                    // fixed={}
                > */}
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
                {/* </PivotControls> */}
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
                {/* <TransformControls object={BoxRef} /> */}
                {/* box */}
            </group>
            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <MeshReflectorMaterial color='green' side={DoubleSide} />
            </mesh>
            {/* <Float speed={5}>
                <Text
                    visible={visible}
                    // font=''
                    fontSize={1}
                    color={color}
                    position={[position.x, position.y, 3]}
                    maxWidth={3}
                    textAlign='left'
                >
                    <meshNormalMaterial />
                    {choise}
                </Text>
            </Float> */}
        </>
    );
};

export default Starter;
