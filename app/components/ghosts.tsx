import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { PointLight } from "three"

export default function Ghosts() {
  const ghost1 = useRef<PointLight>(null)
  const ghost2 = useRef<PointLight>(null)
  const ghost3 = useRef<PointLight>(null)

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    if (ghost1.current) {
      const angle = elapsedTime * 0.5
      ghost1.current.position.x = Math.cos(angle) * 4
      ghost1.current.position.z = Math.sin(angle) * 4
      ghost1.current.position.y = Math.sin(angle) * Math.sin(angle * 2.34) * Math.sin(angle * 3.45)
    }

    if (ghost2.current) {
      const angle = -elapsedTime * 0.38
      ghost2.current.position.x = Math.cos(angle) * 5
      ghost2.current.position.z = Math.sin(angle) * 5
      ghost2.current.position.y = Math.sin(angle) * Math.sin(angle * 2.34) * Math.sin(angle * 3.45)
    }

    if (ghost3.current) {
      const angle = elapsedTime * 0.23
      ghost3.current.position.x = Math.cos(angle) * 6
      ghost3.current.position.z = Math.sin(angle) * 6
      ghost3.current.position.y = Math.sin(angle) * Math.sin(angle * 2.34) * Math.sin(angle * 3.45)
    }
  })

  return (
    <group>
      <pointLight
        ref={ghost1}
        color={'#8800ff'}
        intensity={6}
        castShadow
        shadow-mapSize={[256, 256]}
      >
        <orthographicCamera attach="shadow-camera" far={10} />
      </pointLight>
      <pointLight
        ref={ghost2}
        color={'#ff0088'}
        intensity={6}
        castShadow
        shadow-mapSize={[256, 256]}
      >
        <orthographicCamera attach="shadow-camera" far={10} />
      </pointLight>
      <pointLight
        ref={ghost3}
        color={'#ff0000'}
        intensity={6}
        castShadow
        shadow-mapSize={[256, 256]}
      >
        <orthographicCamera attach="shadow-camera" far={10} />
      </pointLight>
    </group>
  )
}
