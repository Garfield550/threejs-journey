import useBush from "./use-bush"

interface Bush {
  position: [x: number, y: number, z: number]
  scale: [x: number, y: number, z: number]
}

const bushes: Bush[] = [
  { position: [0.8, 0.2, 2.2], scale: [0.5, 0.5, 0.5] },
  { position: [1.4, 0.1, 2.1], scale: [0.25, 0.25, 0.25] },
  { position: [-0.8, 0.1, 2.2], scale: [0.4, 0.4, 0.4] },
  { position: [-1, 0.05, 2.6], scale: [0.15, 0.15, 0.15] },
]

export default function Bushes() {
  const { geometry, material } = useBush()

  return (
    <group>
      {bushes.map(({ position, scale }, index) => (
        <mesh
          key={index}
          geometry={geometry}
          material={material}
          position={position}
          scale={scale}
          rotation={[-0.75, 0, 0]}
        />
      ))}
    </group>
  )
}
