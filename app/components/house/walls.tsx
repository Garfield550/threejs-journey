import { Box, useTexture } from "@react-three/drei";

import wallColor from '../../textures/wall/castle_brick_broken_06_diff_1k.webp'
import wallNormal from '../../textures/wall/castle_brick_broken_06_nor_gl_1k.webp'
import wallARM from '../../textures/wall/castle_brick_broken_06_arm_1k.webp'
import { useLayoutEffect } from "react";
import { SRGBColorSpace } from "three";

interface WallTextures {
  map: string
  aoMap: string
  roughnessMap: string
  metalnessMap: string
  normalMap: string
  [key: string]: string
}

export default function Walls() {
  const textures = useTexture<WallTextures>({
    map: wallColor.src,
    aoMap: wallARM.src,
    roughnessMap: wallARM.src,
    metalnessMap: wallARM.src,
    normalMap: wallNormal.src,
  })

  useLayoutEffect(() => {
    textures.map.colorSpace = SRGBColorSpace
  }, [textures.map])

  return (
    <Box args={[4, 2.5, 4]} position={[0, 1.25, 0]} castShadow receiveShadow>
      <meshStandardMaterial {...textures} toneMapped={false} />
    </Box>
  )
}
