import { Injectable } from '@angular/core';

@Injectable()
export class StaticData {
  static clientModules:any = [
    {
      name: "Solicitar Viaje",
      path: "/home/solicitar-viaje"
    },
    {
      name: "Historial de Viajes",
      path: "/home/mi-historial"
    }

    ]
}
