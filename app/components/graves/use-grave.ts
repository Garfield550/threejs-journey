import { useTexture } from "@react-three/drei"
import { useLayoutEffect, useMemo } from "react"
import { BoxGeometry, MeshStandardMaterial, SRGBColorSpace } from "three"

import stoneColor from '../../textures/grave/plastered_stone_wall_diff_1k.webp'
import stoneARM from '../../textures/grave/plastered_stone_wall_arm_1k.webp'
import stoneNormal from '../../textures/grave/plastered_stone_wall_nor_gl_1k.webp'

const geometry = new BoxGeometry(0.6, 0.8, 0.2)

interface StoneTextures {
  map: string
  aoMap: string
  normalMap: string
  [key: string]: string
}

export default function useGrave() {
  const textures = useTexture<StoneTextures>({
    map: stoneColor.src,
    aoMap: stoneARM.src,
    normalMap: stoneNormal.src,
  })

  const material = useMemo(() => new MeshStandardMaterial({
    ...textures,
    roughnessMap: textures.aoMap,
    metalnessMap: textures.aoMap,
    toneMapped: false,
  }), [textures])

  useLayoutEffect(() => {
    textures.map.colorSpace = SRGBColorSpace
    textures.map.repeat.set(0.3, 0.4)
    textures.aoMap.repeat.set(0.3, 0.4)
    textures.normalMap.repeat.set(0.3, 0.4)
  }, [textures])

  return { geometry, material }
}
