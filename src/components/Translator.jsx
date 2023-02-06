import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const devKey = process.env.REACT_APP_CRYPTO_KEY_DES;
const devIv = process.env.REACT_APP_CRYPTO_IV_DES;

const testKey = process.env.REACT_APP_CRYPTO_KEY_TEST;
const testIv = process.env.REACT_APP_CRYPTO_IV_TEST;

const prodKey = process.env.REACT_APP_CRYPTO_KEY_PROD;
const prodIv = process.env.REACT_APP_CRYPTO_IV_PROD;

function Translator() {
  const [ambiente, setAmbiente] = useState("desarrollo");
  const [key, setKey] = useState(devKey);
  const [iv, setIv] = useState(devIv);
  const [encryptedData, setEcryptedData] = useState("");
  const [plainData, setPlainData] = useState("");

  const handleChangeEncryptedData = (event) => {
    event.preventDefault();
    setEcryptedData(event.target.value);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setAmbiente(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const rawData = CryptoJS.enc.Base64.parse(encryptedData);
    setPlainData(
      CryptoJS.AES.decrypt({ ciphertext: rawData }, key, { iv: iv }).toString(
        CryptoJS.enc.Utf8
      )
    );
  };

  useEffect(() => {
    if (ambiente === "desarrollo") {
      setIv(CryptoJS.enc.Utf8.parse(devIv));
      setKey(CryptoJS.enc.Utf8.parse(devKey));
    } else if (ambiente === "test") {
      setIv(CryptoJS.enc.Utf8.parse(testIv));
      setKey(CryptoJS.enc.Utf8.parse(testKey));
    } else if (ambiente === "produccion") {
      setIv(CryptoJS.enc.Utf8.parse(prodIv));
      setKey(CryptoJS.enc.Utf8.parse(prodKey));
    }
  }, [ambiente]);

  const titleStyle = { color: "white" };
  const textAreaStyle = {
    width: "100%",
    height: "440px",
    minHeight: "100px",
    padding: "8px",
    fontSize: "18px",
    resize: "both",
    border: "solid 1px",
    borderRadius: "10px",
    outline: "none",
  };
  const divContainerStyle = {
    padding: "10%",
  };

  return (
    <>
      <div className="container overflow-hidden">
        <div className="row gx-5">
          <div className="col-4 col xs-4 col-sm-4 col-md-4 col-lg-4">
            <h4 style={titleStyle}>Ambiente</h4>
            <Form.Select value={ambiente} onChange={handleChange}>
              <option selected value="desarrollo">
                Desarrollo
              </option>
              <option value="test">Test</option>
              <option value="produccion">Producción</option>
            </Form.Select>
          </div>
        </div>
      </div>
      <div className=" containter">
        <div className="row gx-5" style={divContainerStyle}>
          <div className=" col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <h3 style={titleStyle}>Input Trama</h3>
            <textarea
              cols="50"
              rows="15"
              style={textAreaStyle}
              value={encryptedData}
              onChange={handleChangeEncryptedData}
            />
            <div className="col-4 col-sm-4 col-md-4 col-lg-4">
              <Button variant="warning" type="submit" onClick={handleSubmit}>
                Aceptar
              </Button>
            </div>
          </div>
          <div className=" col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <h4 style={titleStyle}>Out Put</h4>
            <textarea
              cols="50"
              rows="15"
              style={textAreaStyle}
              value={plainData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Translator;
