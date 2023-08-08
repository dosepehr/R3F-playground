import { Suspense } from 'react';
import Starter from './components/Starter';
import CustomObject from './components/CustomObject';
import Stats from './components/Stats';
import Model from './components/Model';
import Hamburger from './components/Hamburger';
import Fox from './components/Fox';
import PlaceHolder from './components/PlaceHolder';
import ThreeDText from './components/ThreeDText';
const App = () => {
    return (
        <>
            <Stats />
            {/* <CustomObject /> */}
            <Starter />
            {/*<Suspense
                fallback={
                    <>
                        <PlaceHolder />
                    </>
                }
            >
                <Model />
                <Hamburger scale={0.35} position-x={0} />
                <Fox />
            </Suspense> */}
            {/* <ThreeDText /> */}
        </>
    );
};

export default App;

