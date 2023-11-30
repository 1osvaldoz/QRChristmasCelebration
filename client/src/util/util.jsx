import ComboBox from "./comboBox";
import currentUserStep from "./currentUserStep";
import getUserDate from "./getUserDate";
import getUserInfo from "./getUserInfo";
import requestAxios from "./requestAxios";
import infoSource from "./infoSource";
const currency = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};
function zfill(number, width) {
  if(number==null) return "";
  var numberOutput = Math.abs(number); /* Valor absoluto del número */
  var length = number.toString().length; /* Largo del número */
  var zero = "0"; /* String de cero */

  if (width <= length) {
      if (number < 0) {
          return ("-" + numberOutput.toString());
      } else {
          return numberOutput.toString();
      }
  } else {
      if (number < 0) {
          return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
      } else {
          return ((zero.repeat(width - length)) + numberOutput.toString());
      }
  }
}
export {
  ComboBox,
  currentUserStep,
  getUserDate,
  getUserInfo,
  requestAxios,
  infoSource,
  zfill,
  currency
};
