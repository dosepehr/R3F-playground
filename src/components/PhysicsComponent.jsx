import { OrbitControls, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
    Physics,
    RigidBody,
    CuboidCollider,
    CylinderCollider,
    InstancedRigidBodies,
    Debug,
    // Debug,
} from '@react-three/rapier';
import { useControls } from 'leva';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
//! try not to use trimesh with dynamic type

const PhysicsComponent = () => {
    useEffect(() => {
        for (let i = 0; i < cubeCount; i++) {
            const matrix = new THREE.Matrix4();
            matrix.compose(
                new THREE.Vector3(i * 2, -0.8, 0),
                new THREE.Quaternion(),
                new THREE.Vector3(1, 1, 1)
            );
            cubes.current.setMatrixAt(i, matrix);
        }
    }, []);
    const cubeCount = 3;
    const [hitSound] = useState(() => new Audio('hit.mp3'));
    const hamburger = useGLTF('hamburger/hamburger.glb');
    const cube = useRef();
    const cubes = useRef();
    const twister = useRef();
    const collisionEnter = () => {
        console.log('collision enter');
        hitSound.currentTime = 0;
        hitSound.volume = Math.random();
        hitSound.play();
    };

    const cubeTransforms = useMemo(() => {
        const positions = [];
        const rotations = [];
        const scales = [];
        for (let i = 0; i < cubeCount; i++) {
            positions.push([
                (Math.random() - 0.5) * 8,
                6 + i * 0.2,
                (Math.random() - 0.5) * 8,
            ]);
            rotations.push([0, 0, 0]);
            scales.push([1, 1, 1]);
        }
        return { positions, rotations, scales };
    }, []);
    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        const eulerRotation = new THREE.Euler(0, time * 3, 0);
        const quatrenionRotation = new THREE.Quaternion();
        quatrenionRotation.setFromEuler(eulerRotation);
        twister.current.setNextKinematicRotation(quatrenionRotation);

        // Translation
        const angle = time;
        const x = Math.cos(angle) * 2;
        const z = Math.sin(angle) * 2;

        twister.current.setNextKinematicTranslation({ x, y: -0.8, z });
    });
    const cubeJump = () => {
        const mass = cube.current.mass();
        cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
        cube.current.applyTorqueImpulse({
            x: Math.random() - 0.5,
            y: 1,
            z: Math.random() - 0.5,
        });
    };
    const { debug } = useControls('physics', {
        debug: true,
    });
    return (
        <>
            <OrbitControls makeDefault />
            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />
            <Physics gravity={[0, -9.08, 0]}>
                {debug && <Debug />}
                <RigidBody colliders='ball' type='dynamic'>
                    <mesh castShadow position={[-2, 4, 0]}>
                        <sphereGeometry />
                        <meshStandardMaterial color='orange' />
                    </mesh>
                </RigidBody>
                <RigidBody
                    colliders={false}
                    ref={cube}
                    gravityScale={1}
                    position={[1.5, 2, 0]}
                    restitution={0}
                    friction={0.7}
                    // onCollisionEnter={collisionEnter}
                    // onCollisionExit={() => console.log('exit')}
                    // onSleep={}
                    // onWake={}
                >
                    <CuboidCollider args={[0.5, 0.5, 0.5]} mass={1} />
                    <mesh castShadow onClick={cubeJump}>
                        <boxGeometry />
                        <meshStandardMaterial color='mediumpurple' />
                    </mesh>
                </RigidBody>
                <RigidBody type='fixed' restitution={0}>
                    <mesh receiveShadow position-y={-1.25}>
                        <boxGeometry args={[10, 0.5, 10]} />
                        <meshStandardMaterial color='greenyellow' />
                    </mesh>
                </RigidBody>

                {/* wall */}
                <RigidBody type='fixed'>
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
                    <CuboidCollider
                        args={[5, 2, 0.5]}
                        position={[0, 1, -5.5]}
                    />
                    <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
                    <CuboidCollider
                        args={[0.5, 2, 5]}
                        position={[-5.5, 1, 0]}
                    />
                </RigidBody>
                <RigidBody
                    ref={twister}
                    position={[0, -0.8, 0]}
                    friction={0}
                    type='kinematicPosition'
                >
                    <mesh scale={[0.4, 0.4, 3]} castShadow>
                        <boxGeometry />
                        <meshStandardMaterial color='red' />
                    </mesh>
                </RigidBody>
                <RigidBody colliders={false} position={[0, 4, 0]}>
                    <primitive object={hamburger.scene} scale={0.25} />
                    <CylinderCollider args={[0.5, 1.25]} />
                </RigidBody>
                {/* <RigidBody
                    colliders={false}
                    position={[0, 1, 0]}
                    rotation-x={Math.PI * 0.5}
                >
                    <CuboidCollider args={[1.5, 1.5, 0.5]} />
                    <BallCollider args={[1.5]}/>
                    <mesh castShadow>
                        <torusGeometry args={[1, 0.5, 16, 32]} />
                        <meshStandardMaterial color='mediumpurple' />
                    </mesh>
                </RigidBody> */}
                <InstancedRigidBodies
                    positions={cubeTransforms.positions}
                    rotations={cubeTransforms.rotations}
                    scales={cubeTransforms.scales}
                >
                    <instancedMesh
                        ref={cubes}
                        castShadow
                        args={[null, null, cubeCount]}
                    >
                        <boxGeometry />
                        <meshStandardMaterial color='tomato' />
                    </instancedMesh>
                </InstancedRigidBodies>
            </Physics>
        </>
    );
};

export default PhysicsComponent;
