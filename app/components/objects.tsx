import { Center, FontData, Text3D, Torus, useFont, useTexture } from "@react-three/drei";
import { Fragment } from "react";

import droidSans from '../fonts/droid/droid_sans_regular.typeface.json' with { type: 'json' };

import matcapTexture from '../textures/matcaps/1.png'

const object100 = new Array(100).fill(null)

export default function Objects() {
  const droidFont = useFont(droidSans as unknown as FontData)
  const matcap = useTexture(matcapTexture.src)

  return (
    <Fragment>
      <Center>
        <Text3D
          font={droidFont.data}
          size={0.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Text 3D
          <meshMatcapMaterial matcap={matcap} />
        </Text3D>
      </Center>
      {object100.map((_, index) => {
        const scale = Math.random()
        return (
          <Torus
            key={index}
            args={[0.3, 0.2, 20, 45]}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              0
            ]}
            scale={[scale, scale, scale]}
          >
            <meshMatcapMaterial matcap={matcap} />
          </Torus>
        )
      })}
    </Fragment>
  )
}
