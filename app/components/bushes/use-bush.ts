import { MeshStandardMaterial, RepeatWrapping, SphereGeometry, SRGBColorSpace } from "three";
import { useTexture } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";

import leavesColor from '../../textures/bush/leaves_forest_ground_diff_1k.webp'
import leavesARM from '../../textures/bush/leaves_forest_ground_arm_1k.webp'
import leavesNormal from '../../textures/bush/leaves_forest_ground_nor_gl_1k.webp'

const geometry = new SphereGeometry(1, 16, 16);

interface LeavesTextures {
  map: string
  aoMap: string
  normalMap: string
  [key: string]: string
}

export default function useBush() {
  const textures = useTexture<LeavesTextures>({
    map: leavesColor.src,
    aoMap: leavesARM.src,
    normalMap: leavesNormal.src,
  })

  const material = useMemo(() => new MeshStandardMaterial({
    ...textures,
    roughnessMap: textures.aoMap,
    metalnessMap: textures.aoMap,
    color: '#ccffcc',
    toneMapped: true,
  }), [textures])

  useLayoutEffect(() => {
    textures.map.repeat.set(2, 1)
    textures.map.wrapS = RepeatWrapping
    textures.map.colorSpace = SRGBColorSpace

    textures.aoMap.repeat.set(2, 1)
    textures.aoMap.wrapS = RepeatWrapping

    textures.normalMap.repeat.set(2, 1)
    textures.normalMap.wrapS = RepeatWrapping
  }, [textures.aoMap, textures.map, textures.normalMap])

  return { geometry, material }
}
