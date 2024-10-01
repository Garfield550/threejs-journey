import { useThree } from '@react-three/fiber';
import { useLayoutEffect } from 'react';
import { RectAreaLight as RectAreaLightT } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

interface RectAreaLightProps {
  light?: RectAreaLightT | null;
}

export default function RectAreaLight({ light }: RectAreaLightProps) {
  const scene = useThree((state) => state.scene);

  useLayoutEffect(() => {
    if (!light) return;
    const helper = new RectAreaLightHelper(light);
    scene.add(helper);
  }, [light, scene]);

  return null;
}
