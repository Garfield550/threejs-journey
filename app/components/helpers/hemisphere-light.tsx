import { useThree } from "@react-three/fiber"
import { useLayoutEffect } from "react"
import { HemisphereLightHelper, HemisphereLight as HemisphereLightT } from "three"

interface HemisphereLightProps {
  light?: HemisphereLightT | null
}

export default function HemisphereLight({ light }: HemisphereLightProps) {
  const scene = useThree((state) => state.scene)

  useLayoutEffect(() => {
    if (!light) return
    const helper = new HemisphereLightHelper(light, 0.2)
    scene.add(helper)
  }, [light, scene])

  return null
}
