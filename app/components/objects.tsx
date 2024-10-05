import House from "./house";
import Floor from "./floor";
import Bushes from "./bushes";
import Graves from "./graves";
import Ghosts from "./ghosts";

export default function Objects() {
  return (
    <group>
      <House />
      <Floor />
      <Bushes />
      <Graves />
      <Ghosts />
    </group>
  )
}
