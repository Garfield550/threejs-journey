import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import { useRef } from "react";
import { Box } from "@react-three/drei";

export default function CubeGroup(props: GroupProps) {
  const cube1 = useRef<Mesh>(null);
  const cube2 = useRef<Mesh>(null);
  const cube3 = useRef<Mesh>(null);

  const camera = useThree((state) => state.camera);
  const clock = useThree((state) => state.clock);

  useFrame(() => {
    if (!cube1.current || !cube2.current || !cube3.current) return;

    const elapsed = clock.getElapsedTime() * Math.PI * 2;

    camera.position.y = Math.sin(elapsed);
    camera.position.x = Math.cos(elapsed);
    camera.lookAt(cube2.current.position);

    cube1.current.position.x = Math.sin(elapsed);
    cube2.current.position.z = Math.cos(elapsed);
    cube3.current.position.y = Math.sin(elapsed);
    cube3.current.position.x = Math.cos(elapsed);

    cube1.current.rotation.x = elapsed;
    cube2.current.rotation.z = elapsed;
    cube3.current.rotation.y = elapsed;
  })

  return (
    <group {...props}>
      <Box position={[-2, 0, 0]} args={[1, 1, 1]} ref={cube1} />
      <Box position={[0, 0, 0]} args={[1, 1, 1]} ref={cube2} />
      <Box position={[2, 0, 0]} args={[1, 1, 1]} ref={cube3} />
    </group>
  )
}
