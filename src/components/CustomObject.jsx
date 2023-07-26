import { DoubleSide } from 'three';
import { useMemo } from 'react';
const CustomObject = () => {
    const verticesCount = 10 * 3;
    const positions = useMemo(() => {
        const array = new Float32Array(verticesCount * 3);
        for (let i = 0; i < verticesCount * 3; i++) {
            array[i] = (Math.random() - 0.5) * 3;
        }
        return array;
    }, [verticesCount]);

    return (
        <mesh>
            <bufferGeometry>
                <bufferAttribute
                    attach='attributes-position'
                    count={verticesCount}
                    itemSize={3}
                    array={positions}
                />
            </bufferGeometry>
            <meshBasicMaterial color='red' side={DoubleSide} />
        </mesh>
    );
};

export default CustomObject;
