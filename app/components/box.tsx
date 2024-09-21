'use client'

import { MeshProps } from "@react-three/fiber"
import { forwardRef, useCallback, useState } from "react"
import { BufferAttribute, Mesh } from "three"

const positions = new Float32Array(5000 * 3 * 3).map(() => (Math.random() - 0.5) * 5)
const positionsAttribute = new BufferAttribute(positions, 3)

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
            {/* <boxGeometry args={[1, 1, 1, 2, 2, 2]} /> */}
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" {...positionsAttribute} />
            </bufferGeometry>
            <meshStandardMaterial wireframe color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
})
Box.displayName = 'Box'

export default Box
