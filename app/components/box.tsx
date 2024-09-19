'use client'

import { MeshProps } from "@react-three/fiber"
import { forwardRef, useCallback, useState } from "react"
import { Mesh } from "three"

const Box = forwardRef<Mesh, MeshProps>(function Box(props, ref) {
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)

    const handleClick = useCallback(() => setClicked((c) => !c), [])
    const handlePointerOver = useCallback(() => setHovered(true), [])
    const handlePointerOut = useCallback(() => setHovered(false), [])

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 2 : 1}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
})
Box.displayName = 'Box'

export default Box
