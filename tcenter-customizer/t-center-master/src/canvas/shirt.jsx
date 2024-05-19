import { useSnapshot } from "valtio";
import { useLoader } from "@react-three/fiber";
import { useGLTF, Decal } from "@react-three/drei";
import { TextureLoader } from "three";
import state from "../config/store";
import { useState } from "react";
function Shirt() {
  const snap = useSnapshot(state);
  const texture = useLoader(TextureLoader, snap.texture);
  // import 3d object
  const { nodes, materials } = useGLTF("/shirt.glb");

  const [st, setSt] = useState(false);

  return (
    // use 3d object
    <group scale={7}>
      {/* shirt  */}
      <mesh
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* for texture management  */}
        <Decal
          debug={st}
          position={snap.position}
          rotation={snap.rotation}
          scale={snap.range}
          map={texture}
          depthTest={true}
          onClick={(e) => setSt(!st)}
        />

        {/* model  */}
        <meshBasicMaterial color={snap.color} />
      </mesh>
    </group>
  );
}

export default Shirt;
