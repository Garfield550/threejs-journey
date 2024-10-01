import { useThree } from "@react-three/fiber"
import { useLayoutEffect } from "react"
import { AxesHelper } from "three"

const axesHelper = new AxesHelper(10)

export default function Axes() {
  const scene = useThree((state) => state.scene)

  useLayoutEffect(() => {
    scene.add(axesHelper)
  }, [scene])

  return null
}
