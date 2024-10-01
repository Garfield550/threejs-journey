import { useThree } from '@react-three/fiber'
import { useLayoutEffect } from 'react'
import { PointLightHelper, PointLight as PointLightT } from 'three'

interface PointLightProps {
  light?: PointLightT | null
}

export default function PointLight({ light }: PointLightProps) {
  const scene = useThree((state) => state.scene)

  useLayoutEffect(() => {
    if (!light) return
    const helper = new PointLightHelper(light, 0.2)
    scene.add(helper)
  }, [light, scene])

  return null
}
