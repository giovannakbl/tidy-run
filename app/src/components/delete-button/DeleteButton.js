
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleButtton = (props) => {


  return (
    <>
      {props.isDeletedRequested ? (
        <div className="flex-column-end">
          <div>
            <p className="confirmation-text">Are you sure about this?</p>
          </div>
          <div className="flex-row-end">
          <button
              className="delete-button-confirm"
              type="button"
              onClick={props.deleteFunction}
            >
              <div>
                <FontAwesomeIcon icon="fa-trash-can" />
              </div>
              <div>Yes, Delete</div>
            </button>
            <button
              className="cancel-button"
              type="button"
              onClick={() => {
                props.setIsDeletedRequested(false);
              }}
            >
              <div>
                <FontAwesomeIcon icon="fa-xmark" />
              </div>
              <div>Cancel</div>
            </button>

          </div>
        </div>
      ) : (
        <div className="flex-column-end">
          <button
            className="delete-button"
            type="button"
            onClick={() => {
              props.setIsDeletedRequested(true);
            }}
          >
            <div>
              <FontAwesomeIcon icon="fa-trash-can" />
            </div>
            <div>Delete</div>
          </button>
        </div>
      )}
    </>
  );
};

export default DeleButtton;
