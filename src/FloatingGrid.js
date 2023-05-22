import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";
import { useState } from "react";

export function FloatingGrid() {
  const diffuse = useLoader(TextureLoader, process.env.PUBLIC_URL + "/textures/grid-texture.png");
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    diffuse.wrapS = RepeatWrapping;
    diffuse.wrapT = RepeatWrapping;
    diffuse.anisotropy = 4;
    diffuse.repeat.set(30, 30);
    diffuse.offset.set(0, 0);
    const handleKeyPress = (event) => {
      if (event.key === "i") {
        setIsReversed(!isReversed);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [diffuse, isReversed]);

  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.68;
    if (isReversed) {
      t = -t;
    }
    diffuse.offset.set(0, t);
  });

  return <>
    <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.425, 0]}>
      <planeGeometry args={[35, 35]} />
      <meshBasicMaterial
        color={[1, 1, 1]}
        opacity={0.15}
        map={diffuse}
        alphaMap={diffuse}
        transparent={true}
      />
    </mesh>
  </>
}