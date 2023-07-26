import { DoubleSide } from 'three';
import { useMemo, useRef, useEffect } from 'react';
const CustomObject = () => {
    const geometryRef = useRef();
    useEffect(() => {
        geometryRef.current.computeVertexNormals();
    }, []);

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
            <bufferGeometry ref={geometryRef}>
                <bufferAttribute
                    attach='attributes-position'
                    count={verticesCount}
                    itemSize={3}
                    array={positions}
                />
            </bufferGeometry>
            <meshStandardMaterial color='red' side={DoubleSide} />
        </mesh>
    );
};

export default CustomObject;
