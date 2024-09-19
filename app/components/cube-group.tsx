import { GroupProps } from "@react-three/fiber";
import Box from "./box";

export default function CubeGroup(props: GroupProps) {
    return (
        <group {...props}>
            <Box position={[-2, 0, 0]} />
            <Box position={[0, 0, 0]} />
            <Box position={[2, 0, 0]} />
        </group>
    )
}
