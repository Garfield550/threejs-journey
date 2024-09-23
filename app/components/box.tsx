'use client'

import { useTexture } from "@react-three/drei"
import { MeshProps } from "@react-three/fiber"
import { forwardRef, useCallback, useState } from "react"
import { Mesh } from "three"

import doorColor from '../textures/door/color.jpg'
import doorAlpha from '../textures/door/alpha.jpg'
import doorHeight from '../textures/door/height.jpg'
import doorNormal from '../textures/door/normal.jpg'
import doorRoughness from '../textures/door/roughness.jpg'
import doorMetalness from '../textures/door/metalness.jpg'
import doorAmbientOcclusion from '../textures/door/ambientOcclusion.jpg'

const Box = forwardRef<Mesh, MeshProps>(function Box(props, ref) {
    const [clicked, setClicked] = useState(false)

    const textures = useTexture({
        map: doorColor.src,
        alphaMap: doorAlpha.src,
        displacementMap: doorHeight.src,
        normalMap: doorNormal.src,
        roughnessMap: doorRoughness.src,
        metalnessMap: doorMetalness.src,
        aoMap: doorAmbientOcclusion.src
    })

    const handleClick = useCallback(() => setClicked((c) => !c), [])

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 2 : 1}
            onClick={handleClick}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial {...textures} />
        </mesh>
    )
})
Box.displayName = 'Box'

export default Box
