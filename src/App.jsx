import { Suspense } from 'react';
import Starter from './components/Starter';
import CustomObject from './components/CustomObject';
import Stats from './components/Stats';
import Model from './components/Model';
import PlaceHolder from './components/PlaceHolder';
const App = () => {
    return (
        <>
            <Stats />
            {/* <CustomObject /> */}
            <Starter />
            <Suspense
                fallback={
                    <>
                        <PlaceHolder/>
                    </>
                }
            >
                <Model />
            </Suspense>
        </>
    );
};

export default App;

