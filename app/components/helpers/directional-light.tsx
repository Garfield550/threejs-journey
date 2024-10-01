import { useThree } from "@react-three/fiber"
import { useLayoutEffect } from "react"
import { DirectionalLightHelper, DirectionalLight as DirectionalLightT } from "three"

interface DirectionalLightProps {
  light?: DirectionalLightT | null
}

export default function DirectionalLight({ light }: DirectionalLightProps) {
  const scene = useThree((state) => state.scene)

  useLayoutEffect(() => {
    if (!light) return
    const helper = new DirectionalLightHelper(light, 0.2)
    scene.add(helper)
  }, [light, scene])

  return null
}
