import { useThree } from "@react-three/fiber"
import { useLayoutEffect } from "react"
import { CameraHelper, Camera as CameraT } from "three"

interface CameraProps {
  camera?: CameraT | null
}

export default function Camera({ camera }: CameraProps) {
  const scene = useThree((state) => state.scene)

  useLayoutEffect(() => {
    if (!camera) return
    const helper = new CameraHelper(camera)
    scene.add(helper)
  }, [camera, scene])

  return null
}
