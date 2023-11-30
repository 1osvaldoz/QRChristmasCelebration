import { useContext } from "react"
import requestAxios from "./requestAxios";
import AppContext from "../Context/AppContext";


const infoSource = {
  Productos: {
    getProducts: async function ( marcaId,clasificacionId,conceptoNombre,newIndex,qty) {
      const { error, data } = await requestAxios({
        url: `Productos/getProducts?marcaId=${marcaId}&clasificacionId=${clasificacionId}&conceptoNombre=${conceptoNombre}&index=${newIndex}&limit=${qty}`,
        method: "get",
        data: {},
      });
      if (error == "") return data;
      else return [];
    },
    getSingleProducts: async function (conceptoId) {
      const { error, data } = await requestAxios({
        url: `Productos/getSingleProducts?conceptoId=${conceptoId}`,
        method: "get",
        data: {},
      });
      if (error == "") return data;
      else return [];
    }
  },
};

export default infoSource;
