import { Cone, useTexture } from "@react-three/drei";

import roofColor from '../../textures/roof/roof_slates_02_diff_1k.webp'
import roofARM from '../../textures/roof/roof_slates_02_arm_1k.webp'
import roofNormal from '../../textures/roof/roof_slates_02_nor_gl_1k.webp'
import { useLayoutEffect } from "react";
import { RepeatWrapping, SRGBColorSpace } from "three";

interface RoofTextures {
  map: string
  aoMap: string
  normalMap: string
  [key: string]: string
}

export default function Roof() {
  const textures = useTexture<RoofTextures>({
    map: roofColor.src,
    aoMap: roofARM.src,
    normalMap: roofNormal.src,
  })

  useLayoutEffect(() => {
    textures.map.repeat.set(3, 1)
    textures.map.wrapS = RepeatWrapping
    textures.map.colorSpace = SRGBColorSpace

    textures.aoMap.repeat.set(3, 1)
    textures.aoMap.wrapS = RepeatWrapping

    textures.normalMap.repeat.set(3, 1)
    textures.normalMap.wrapS = RepeatWrapping
  }, [textures.aoMap, textures.map, textures.normalMap])

  return (
    <Cone args={[3.5, 1.5, 4]} position={[0, 3.25, 0]} rotation={[0, Math.PI * 0.25, 0]} castShadow>
      <meshStandardMaterial
        {...textures}
        roughnessMap={textures.aoMap}
        metalnessMap={textures.aoMap}
        toneMapped={false}
      />
    </Cone>
  )
}
