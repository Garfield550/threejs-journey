import useGrave from "./use-grave"

interface Grave {
  angle: number
  pX: number
  pY: number
  pZ: number
  rX: number
  rY: number
  rZ: number
}

const graves = new Array(30).fill(undefined).map<Grave>(() => {
  const angle = Math.random() * Math.PI * 2
  const radius = 3 + Math.random() * 4
  const pX = Math.sin(angle) * radius
  const pY = Math.random() * 0.4
  const pZ = Math.cos(angle) * radius
  const rX = (Math.random() - 0.5) * 0.34
  const rY = (Math.random() - 0.5) * 0.34
  const rZ = (Math.random() - 0.5) * 0.34
  return { angle, pX, pY, pZ, rX, rY, rZ }
})

export default function Graves() {
  const { geometry, material } = useGrave()

  return (
    <group>
      {graves.map(({ pX, pY, pZ, rX, rY, rZ }, i) => (
        <mesh key={i} geometry={geometry} material={material} position={[pX, pY, pZ]} rotation={[rX, rY, rZ]} castShadow receiveShadow />
      ))}
    </group>
  )
}
