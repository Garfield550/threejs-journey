import { Fragment } from "react";

export default function Lights() {
  return (
    <Fragment>
      <ambientLight color={'#86cdff'} intensity={0.275} />
      <directionalLight
        color={'#86cdff'}
        intensity={1}
        position={[3, 2, -8]}
        castShadow
        shadow-mapSize={[256, 256]}
      >
        <orthographicCamera
          attach="shadow-camera"
          left={-8}
          right={8}
          top={8}
          bottom={-8}
          near={1}
          far={20}
        />
      </directionalLight>
    </Fragment>
  )
}
