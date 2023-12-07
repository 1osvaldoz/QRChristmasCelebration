import QRCode from "react-qr-code";
import { useState } from "react";
import Header from "../Common/Header/Header";
import "./FindWizeliner.css";
import requestAxios from "../../util/requestAxios";
import { Button, Form, Row, Col, Card, CardTitle } from "react-bootstrap";
import { useEffect } from "react";
export default () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [emailText, setEmailText] = useState(urlParams.get("email"));
  const [qrValue, setQrValue] = useState();

  const searchWizeliner = async () => {
    if (emailText) {
      const { error, data } = await requestAxios({
        url: `getWizelinerByEmail/${emailText.toLowerCase().trim()}`,
        method: "get",
      });
      setQrValue(data);
    }
  };
  useEffect(() => {
    searchWizeliner();
  }, []);
  return (
    <div className="FindWizeliner__container">
      <Header />
      <h2>
        <b>Welcome to the Wizeline Posada 2023!</b>
      </h2>
      <h5>
        Add your email to generate your QR code and show it to access the party.
      </h5>
      <br />
      <div className="inputSearch">
        <Form.Control
          label="Email"
          value={emailText ? emailText : ""}
          onChange={(input) => setEmailText(input.target.value.trim())}
        />{" "}
        <Button variant="danger" onClick={() => searchWizeliner()}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </Button>
      </div>

      <div className="FindWizelinerQR__container">
        {qrValue ? (
          <>
            <Card className="QRResult__container">
              <QRCode
                className="QRCodeImage"
                size={256}
                value={`${qrValue.guid}|${qrValue.email}|${qrValue.city}`}
                viewBox={`0 0 256 256`}
              />
              <Card.Body>
                <Card.Title>
                  {" "}
                  <h2 className="QRCard__containerHeader">
                    Hi <span className="capitalize">{qrValue.name}</span>!
                  </h2>
                </Card.Title>
                <Card.Text>
                  <p>
                    Show this code to access to the Posada in {" "}
                    {qrValue.city}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        ) : (
          <Row>
            <Col m={12} s={12}>
              {qrValue == "" && (
                <Card className="QRResult__container">
                  <Card.Title>
                    {" "}
                    <h2 className="QRCard__containerHeader">Oops!</h2>
                  </Card.Title>
                  <Card.Body>
                    <Card.Text>
                      <p>We can't find you </p>
                      <img
                        width="450px"
                        src="https://i5.walmartimages.com.mx/mg/gm/3pp/asr/aa3dce21-2c61-4131-b796-77b1c8075736.0421e3fcf37d2faf90d3a39ff48ff8d8.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
                      />
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};
