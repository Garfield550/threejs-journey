import Walls from "./walls";
import Roof from "./roof";
import Door from "./door";

export default function House() {
  return (
    <group>
      <Roof />
      <Walls />
      <Door />
    </group>
  )
}
