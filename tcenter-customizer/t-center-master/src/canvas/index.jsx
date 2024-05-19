import { Canvas } from '@react-three/fiber'
import { Center, OrbitControls, ContactShadows } from '@react-three/drei';


import Shirt from './shirt';

function CanvasBody(){
    return (
        // display 3d object 
        <Canvas style={{height: "100vh"}} className="canvas" >
            {/* <ContactShadows opacity={0.5} /> */}
            <OrbitControls />
            <Center>
                <Shirt />
            </Center>
        </Canvas>
    );
}

export default CanvasBody;