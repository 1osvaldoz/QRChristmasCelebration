import requestAxios from "./requestAxios";

const cmbFunction = {
  cmbMarcas: async function () {
    const { error, data } = await requestAxios({
      url: `InfoCrol/getMarca`,
      method: "get",
      data: {},
    });
    if (error == "") return data;
    else return [];
  },
  cmbClasificaciones: async function () {
    const { error, data } = await requestAxios({
      url: `InfoCrol/getClasificacion`,
      method: "get",
      data: {},
    });
    if (error == "") return data;
    else return [];
  }
  ,
  cmbClientes: async function () {
    const { error, data } = await requestAxios({
      url: `Clientes/getClientes`,
      method: "get",
      data: {},
    });
    if (error == "") return data;
    else return [];
  }
};
export default cmbFunction;
