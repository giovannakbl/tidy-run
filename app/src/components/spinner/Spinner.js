import styles from "./Spinner.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Spinner() {
  return (
    <>
      <div className="spinner-icon">
        <div className=" fa-spin fa-spinner-moving">
          <FontAwesomeIcon icon="fa-spray-can-sparkles" />
        </div>
        <div className="fa-spinner-fixed">
          <FontAwesomeIcon icon="fa-house" />
        </div>
      </div>
    </>
  );
}

export default Spinner;
