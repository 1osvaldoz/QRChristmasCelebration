import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { QrReader } from "react-qr-reader";
import Header from "../Common/Header/Header";
import requestAxios from "../../util/requestAxios";
import imgSanta from "../../assets/img/santaconfirm.jpg";
import "./ReadQR.css";
export default () => {
  const [emailText, setEmailText] = useState("");
  const childRef = useRef(null);
  const [wizeLinerData, setWizeLinerData] = useState();
  const [showModal, setShowModal] = useState(false);
  const readQR = async (result, error) => {
    if (!!result && !showModal) {
      const { error, data } = await requestAxios({
        url: `getWizelinerByGUID/${result?.text.split("|")[0]}`,
        method: "get",
      });
      setWizeLinerData(data);
      openModal();
    }

    if (!!error) {
      console.info(error);
    }
  };
  const searchWizeliner = async () => {
    const { error, data } = await requestAxios({
      url: `getWizelinerByEmail/${emailText}`,
      method: "get",
    });
    setWizeLinerData(data);
    openModal();
  };
  const confirmVisit = async () => {
    const { error, data } = await requestAxios({
      url: `registerAttendance/${wizeLinerData.guid}`,
      method: "get",
    });
    setWizeLinerData(null);
    closeModal();
  };
  const openModal = () => {
    setShowModal(true);
    childRef.current.openModal();
  };
  const closeModal = () => {
    setShowModal(false);
    childRef.current.closeModal();
  };
  return (
    <div className="ReadQr__container">
      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName='confirmVisitModal__dialog'>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="modalBodyVisit">
          <h2>
            <b>Welcome to Wizeline Posada 2023!</b>
          </h2>
          <img className="imgSanta" src={imgSanta} />
          <h2>
            <b>
              Hi
              <span className="capitalize" style={{ color: "#90191B" }}>
                {" "}
                {wizeLinerData?.name}
              </span>
              !
            </b>
          </h2>
          <div className="confirmVisitModal__BodyContainer">
            <h3>Welcome to posada 2023</h3>
            {wizeLinerData?.arrived && (
              <h2>You already registered your visit</h2>
            )}
            <h5> Enjoy the party.</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!wizeLinerData?.arrived && (
            <Button variant="success" onClick={() => confirmVisit()}>
              Add visit
            </Button>
          )}{" "}
          <Button variant="danger" onClick={() => closeModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Header />

      <h5>Please show me your QR Code to register your visit</h5>
      <div className="Qr__container">
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => readQR(result, error)}
          style={{ width: "100%" }}
        />
        <div className="inputSearch">
          <Form.Control
            label="Email"
            value={emailText}
            onChange={(input) => setEmailText(input.target.value)}
          />
        </div>
        <Button
          variant="danger"
          waves="light"
          onClick={() => searchWizeliner()}
        >
          Search
        </Button>
      </div>
    </div>
  );
};
