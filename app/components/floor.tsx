import { Plane, useTexture } from "@react-three/drei";

import floorAlpha from '../textures/floor/alpha.webp'
import rocksARM from '../textures/floor/coast_sand_rocks_02_arm_1k.webp'
import rocksDiff from '../textures/floor/coast_sand_rocks_02_diff_1k.webp'
import rocksDisp from '../textures/floor/coast_sand_rocks_02_disp_1k.webp'
import rocksNorm from '../textures/floor/coast_sand_rocks_02_nor_gl_1k.webp'
import { RepeatWrapping, SRGBColorSpace } from "three";
import { useLayoutEffect } from "react";

interface FloorTextures {
  map: string
  alphaMap: string
  aoMap: string
  normalMap: string
  displacementMap: string
  [key: string]: string
}

export default function Floor() {
  const textures = useTexture<FloorTextures>({
    map: rocksDiff.src,
    alphaMap: floorAlpha.src,
    aoMap: rocksARM.src,
    normalMap: rocksNorm.src,
    displacementMap: rocksDisp.src,
  })

  useLayoutEffect(() => {
    textures.map.repeat.set(8, 8)
    textures.map.wrapS = textures.map.wrapT = RepeatWrapping
    textures.map.colorSpace = SRGBColorSpace

    textures.aoMap.repeat.set(8, 8)
    textures.aoMap.wrapS = textures.aoMap.wrapT = RepeatWrapping

    textures.normalMap.repeat.set(8, 8)
    textures.normalMap.wrapS = textures.normalMap.wrapT = RepeatWrapping

    textures.displacementMap.repeat.set(8, 8)
    textures.displacementMap.wrapS = textures.displacementMap.wrapT = RepeatWrapping
  }, [textures.aoMap, textures.displacementMap, textures.map, textures.normalMap])

  return (
    <Plane args={[20, 20, 100, 100]} rotation={[-Math.PI * 0.5, 0, 0]} position={[0, 0, 0]} receiveShadow>
      {/**
       * Turn off tone mapping to prevent the texture from being darker than the original picture.
       * https://github.com/pmndrs/react-three-fiber/issues/1691
       * https://www.reddit.com/r/threejs/comments/ut1bbr/texture_darker_than_original_picture_react_three/
       */}
      <meshStandardMaterial
        {...textures}
        roughnessMap={textures.aoMap}
        metalnessMap={textures.aoMap}
        // metalness={1}
        transparent
        toneMapped={false}
        displacementScale={0.3}
        displacementBias={-0.2}
      />
    </Plane>
  )
}
