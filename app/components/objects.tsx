import { Environment, Plane, Sphere, Torus, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Fragment, useRef } from "react";
import { Mesh, NearestFilter, Vector2 } from "three";

import doorColor from '../textures/door/color.jpg'
import doorAlpha from '../textures/door/alpha.jpg'
import doorHeight from '../textures/door/height.jpg'
import doorNormal from '../textures/door/normal.jpg'
import doorRoughness from '../textures/door/roughness.jpg'
import doorMetalness from '../textures/door/metalness.jpg'
import doorAmbientOcclusion from '../textures/door/ambientOcclusion.jpg'

import matcapTexture from '../textures/matcaps/3.png'
import gradientTexture from '../textures/gradients/3.jpg'

export default function Objects() {
  const sphere = useRef<Mesh>(null)
  const plane = useRef<Mesh>(null)
  const torus = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!sphere.current || !plane.current || !torus.current) return

    sphere.current.rotation.y += 0.1 * delta
    plane.current.rotation.y += 0.1 * delta
    torus.current.rotation.y += 0.1 * delta

    sphere.current.rotation.x -= 0.15 * delta
    plane.current.rotation.x -= 0.15 * delta
    torus.current.rotation.x -= 0.15 * delta
  })

  const door = useTexture({
    map: doorColor.src,
    alphaMap: doorAlpha.src,
    displacementMap: doorHeight.src,
    normalMap: doorNormal.src,
    roughnessMap: doorRoughness.src,
    metalnessMap: doorMetalness.src,
    aoMap: doorAmbientOcclusion.src
  },
    // It looks like useTexture use the right color space
    // (textures) => {
    //   textures.map.colorSpace = SRGBColorSpace
    // }
  )

  const matcap = useTexture(matcapTexture.src)

  const gradient = useTexture(gradientTexture.src, (texture) => {
    texture.minFilter = NearestFilter
    texture.magFilter = NearestFilter
    texture.generateMipmaps = false
  })

  return (
    <Fragment>
      <Environment files='/environmentMap/2k.hdr' background />
      <Sphere ref={sphere} args={[0.5, 64, 64]} position={[-3, 0, 0]}>
        <meshMatcapMaterial matcap={matcap} />
      </Sphere>
      <Sphere ref={sphere} args={[0.5, 64, 64]} position={[-1.5, 0, 0]}>
        <meshPhysicalMaterial
          transparent
          metalness={0}
          roughness={0}
          transmission={1}
          ior={1.5}
          thickness={0.5}
        />
      </Sphere>
      <Plane ref={plane} args={[1, 1, 100, 100]} position={[0, 0, 0]}>
        {/* <meshStandardMaterial
          {...door}
          transparent
          metalness={1}
          roughness={1}
          aoMapIntensity={1}
          displacementScale={0.1}
          normalScale={new Vector2(0.5, 0.5)}
        /> */}
        <meshPhysicalMaterial
          {...door}
          transparent
          metalness={1}
          roughness={1}
          aoMapIntensity={1}
          displacementScale={0.1}
          normalScale={new Vector2(0.5, 0.5)}
        />
      </Plane>
      <Torus ref={torus} args={[0.3, 0.2, 64, 128]} position={[1.5, 0, 0]}>
        {/* <meshPhongMaterial shininess={100} specular={new Color(0x1188ff)} /> */}
        <meshToonMaterial gradientMap={gradient} />
      </Torus>
    </Fragment>
  )
}
