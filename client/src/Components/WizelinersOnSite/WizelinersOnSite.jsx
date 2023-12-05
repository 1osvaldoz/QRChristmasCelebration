import { useEffect } from "react";
import { useState } from "react";
import Header from "../Common/Header/Header";
import "./WizelinersOnSite.css";
import requestAxios from "../../util/requestAxios";
import { Button, Row, Col, Dropdown, Form, Table } from "react-bootstrap";
export default () => {
  const [emailText, setEmailText] = useState("monzon.manuel@wizeline.com");
  const [selectedCityValue, setSelectedCityValue] = useState("GDL");
  const [selectedCityText, setSelectedCityText] = useState("GUADALAJARA");
  const [wizelinersList, setWizelinersList] = useState([]);
  const searchWizeliner = async (city) => {
    setWizelinersList([]);
    const { error, data } = await requestAxios({
      url: `getWizelinerOnSite/${city}`,
      method: "get",
    });
    debugger;
    setWizelinersList(data);
  };

  return (
    <div className="FindWizeliner__container">
      <Header />
      <Row>
        <Col m={12} s={12}>
          <div className="selectCity__container">
            <h3>City</h3>
            <div className="selectContainer">
              <Form.Control
                as="select"
                onChange={(x, z) => {
                  setSelectedCityValue(x.target.selectedOptions[0].value);
                  setSelectedCityText(x.target.selectedOptions[0].innerText);
                  searchWizeliner(x.target.selectedOptions[0].value);
                }}
              >
                <option disabled value="">
                  Choose your option
                </option>
                <option value="GDL" className="searchCityItem">
                  Guadalajara
                </option>
                <option value="CDMX" className="searchCityItem">
                  Mexico
                </option>
              </Form.Control>

              <Button
                className="red"
                node="button"
                style={{
                  maxWidth: "50px",
                }}
                variant="danger"
                onClick={() => searchWizeliner(selectedCityValue)}
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col m={12} s={12}>
          {/* <h1>{selectedCityText}</h1> */}
          <Table striped bordered hover className="tblWizeliners">
            <thead>
              <tr>
                <td>#</td>
                <td>Wizeliner</td>
              </tr>
            </thead>
            <tbody>
              {wizelinersList.map((item, i) => (
                <tr key={`wizelinerItem${item.guid}`}>
                  <th>{i + 1}</th>
                  <th className="capitalize">{item.name}</th>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};
