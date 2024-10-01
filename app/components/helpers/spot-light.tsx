import { useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useMemo } from 'react';
import { SpotLightHelper, SpotLight as SpotLightT } from 'three';

interface SpotLightProps {
  light?: SpotLightT | null;
}

export default function SpotLight({ light }: SpotLightProps) {
  const helper = useMemo(() => light && new SpotLightHelper(light), [light]);
  const scene = useThree((state) => state.scene);

  useLayoutEffect(() => {
    if (!helper) return;
    scene.add(helper);
  }, [helper, scene]);

  useFrame(() => {
    // if (!helper) return;
    // helper.update();
  })

  return null;
}
