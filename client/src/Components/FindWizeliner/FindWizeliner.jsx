import QRCode from "react-qr-code";
import { useState } from "react";
import Header from "../Common/Header/Header";
import "./FindWizeliner.css";
import requestAxios from "../../util/requestAxios";
import {
  TextInput,
  Button,
  Icon,
  Row,
  Col,
  Card,
  CardTitle,
} from "react-materialize";
import { useEffect } from "react";
export default () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [emailText, setEmailText] = useState(urlParams.get("email"));
  const [qrValue, setQrValue] = useState();

  const searchWizeliner = async () => {
    const { error, data } = await requestAxios({
      url: `getWizelinerByEmail/${emailText}`,
      method: "get",
    });
    setQrValue(data);
  };
  useEffect(()=>{
    searchWizeliner();
  },[])
  return (
    <div className="FindWizeliner__container">
      <Header />
      <h2>
        <b>Welcome to Wizeline Posada 2023!</b>
      </h2>
      <h5>Add your email to generate your QR Code</h5>
      <br />
      <div className="inputSearch">
        <TextInput
          email
          label="Email"
          validate
          value={emailText}
          onChange={(input) => setEmailText(input.target.value)}
        />
      </div>
      <Button className="red" waves="light" onClick={() => searchWizeliner()}>
        Search
        <Icon left>search</Icon>
      </Button>
      <div className="FindWizelinerQR__container">
        {qrValue ? (
          <Row>
            <Col m={12} s={12}>
              <Card
                className="QRCard__container"
                header={
                  <h2 className="QRCard__containerHeader">
                    Hi <span className="capitalize">{qrValue.name}</span>!
                  </h2>
                }
                revealIcon={<Icon>more_vert</Icon>}
                title={
                  <QRCode
                    className="QRCodeImage"
                    size={256}
                    value={`${qrValue.guid}|${qrValue.email}|${qrValue.city}`}
                    viewBox={`0 0 256 256`}
                  />
                }
              >
                <p>
                  With this code you will register your visit on the posada on{" "}
                  {qrValue.city}
                </p>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col m={12} s={12}>
              {qrValue == "" && (
                <Card
                  className="QRCard__container"
                  header={
                    <CardTitle
                      image="https://i5.walmartimages.com.mx/mg/gm/3pp/asr/aa3dce21-2c61-4131-b796-77b1c8075736.0421e3fcf37d2faf90d3a39ff48ff8d8.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
                      reveal
                      waves="light"
                    />
                  }
                  revealIcon={<Icon>more_vert</Icon>}
                  title="Oops!"
                >
                  <p>We can't find you</p>
                </Card>
              )}
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};
