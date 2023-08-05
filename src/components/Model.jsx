import { useGLTF,Clone } from '@react-three/drei';
const Model = () => {
    const model = useGLTF('/FlightHelmet/glTF/FlightHelmet.gltf');
    return (
        <>
            <Clone object={model.scene} scale={5} position-x={5}/>
            <Clone object={model.scene} scale={5} position-x={0}/>
            <Clone object={model.scene} scale={5} position-x={-5}/>
        </>
    );
};
useGLTF.preload('/FlightHelmet/glTF/FlightHelmet.gltf')
export default Model;
