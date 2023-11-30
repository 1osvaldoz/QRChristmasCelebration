import { useState } from "react";
import { useCookieStorage } from "./useCookieStorage";
import requestAxios from "../util/requestAxios";
import getUserInfo from "../util/getUserInfo";

const useGlobalState = () => {
  const [activeCount, setActiveCount] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const [
    userSession,
    setUserSession,
    updateCookieStorage,
    deleteCookieStorage,
  ] = useCookieStorage("userSession", {});

  // LOGIN
  const login = async (email, password, loginType) => {
    const userInfo = getUserInfo();

    const { error, data } = await requestAxios({
      url: "Usuario/LoginUsuario",
      method: "post",
      data: {
        Email: email,
        password,
      },
    });
    if (error) {
      return error.response;
    }
    setUserSession(data);
    return true;
  };

  // LogOut
  const logOut = () => {
    deleteCookieStorage();
    window.location.href = "/";
  };

  //  Check User Session
  const checkUserSession = (accessRequired) => {
    if (userSession.bearer_token) {
      if (accessRequired != true) {
        return userSession;
      } else {
        const access = true; //userSession.Accesos.find(x=>x.Url==location.pathname.substring(1))
        if (access == null) return false;
        else return userSession;
      }
    }

    return false;
  };
  //  Update setQtyShoppingCar
  const setQtyShoppingCar = (number) => {
    let QtyShoppingCar = userSession.QtyShoppingCar ? QtyShoppingCar : 0;
    QtyShoppingCar += number;
    updateCookieStorage({
      ...userSession,
      QtyShoppingCar: QtyShoppingCar,
    });
    return true;
  };
  //  Update updateCliente
  const updateCliente = (cliente) => {
    updateCookieStorage({
      ...userSession,
      Cliente: cliente,
    });
    return true;
  };

  //  Update userStepId
  const updatePublicProfile = async (data) => {
    updateCookieStorage({
      ...userSession,
      PublicProfile: data,
    });

    return true;
  };
  const changeLoading = (loading) => setShowLoading(loading);

  return {
    login,
    logOut,
    checkUserSession,
    updateCliente,
    activeCount,
    setActiveCount,
    changeLoading,
    showLoading,
    updatePublicProfile,
    setQtyShoppingCar,
  };
};

export default useGlobalState;
