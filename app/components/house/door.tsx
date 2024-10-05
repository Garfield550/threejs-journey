import { Plane, useTexture } from "@react-three/drei";

import doorColor from '../../textures/door/color.webp'
import doorAlpha from '../../textures/door/alpha.webp'
import doorHeight from '../../textures/door/height.webp'
import doorNormal from '../../textures/door/normal.webp'
import doorRoughness from '../../textures/door/roughness.webp'
import doorMetalness from '../../textures/door/metalness.webp'
import doorAmbientOcclusion from '../../textures/door/ambientOcclusion.webp'
import { useLayoutEffect } from "react";
import { SRGBColorSpace } from "three";

export default function Door() {
  const textures = useTexture({
    map: doorColor.src,
    alphaMap: doorAlpha.src,
    displacementMap: doorHeight.src,
    normalMap: doorNormal.src,
    roughnessMap: doorRoughness.src,
    metalnessMap: doorMetalness.src,
    aoMap: doorAmbientOcclusion.src
  })

  useLayoutEffect(() => {
    textures.map.colorSpace = SRGBColorSpace
  }, [textures.map])

  return (
    <group>
      <Plane args={[2.2, 2.2, 100, 100]} position={[0, 1, 2.001]}>
        <meshStandardMaterial
          {...textures}
          transparent
          toneMapped={false}
          displacementScale={0.15}
          displacementBias={-0.04}
        />
      </Plane>
      <pointLight color={'#ff7d46'} intensity={5} position={[0, 2.2, 2.5]} />
    </group>
  )
}
