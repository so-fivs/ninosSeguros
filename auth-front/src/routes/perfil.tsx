import Portal from "../templates/portal";
import { Input } from "@material-tailwind/react";
 
export default function Perfil() {
    return (
        <Portal>
            <div className="dashboard">
                <h1>Publicaciones</h1>
            </div>
        </Portal>
    );
}

export function InputDefault() {
  return (
    <div className="w-72">
      <Input label="¿Que piensas de esto?" size="lg" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}  />
    </div>
  );
}
