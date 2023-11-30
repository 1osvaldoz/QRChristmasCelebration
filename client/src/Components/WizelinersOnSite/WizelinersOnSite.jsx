import { useEffect } from "react";
import { useState } from "react";
import Header from "../Common/Header/Header";
import "./WizelinersOnSite.css";
import requestAxios from "../../util/requestAxios";
import {
  TextInput,
  Button,
  Icon,
  Row,
  Col,
  Card,
  CardTitle,
  Collection,
  CollectionItem,
  Select,
} from "react-materialize";
export default () => {
  const [emailText, setEmailText] = useState("monzon.manuel@wizeline.com");
  const [selectedCityValue, setSelectedCityValue] = useState("");
  const [selectedCityText, setSelectedCityText] = useState("");
  const [wizelinersList, setWizelinersList] = useState([]);
  const searchWizeliner = async (city) => {
    setWizelinersList([]);
    const { error, data } = await requestAxios({
      url: `getWizelinerOnSite/${city}`,
      method: "get",
    });
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
              <Select
                id="select123"
                multiple={false}
                onChange={(x, z) => {
                  setSelectedCityValue(x.target.selectedOptions[0].value);
                  setSelectedCityText(x.target.selectedOptions[0].innerText);
                  searchWizeliner(x.target.selectedOptions[0].value);
                }}
                options={{
                  classes: "searchCityDrop",
                  dropdownOptions: {
                    alignment: "left",
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: true,
                    coverTrigger: true,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250,
                  },
                }}
                value=""
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
              </Select>
              <Button
                className="red"
                node="button"
                style={{
                  maxWidth: "50px",
                }}
                waves="red"
                onClick={()=>searchWizeliner(selectedCityValue)}
              >
                <Icon left>search</Icon>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col m={12} s={12}>
          <h1>{selectedCityText}</h1>
          <Collection>
            {wizelinersList.map((item, i) => (
              <CollectionItem
                style={{ textTransform: "capitalize" }}
                key={`wizelinerItem${item.guid}`}
              >
                {i + 1} - {item.name}
              </CollectionItem>
            ))}
          </Collection>
        </Col>
      </Row>
    </div>
  );
};
