
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleButtton = (props) => {


  return (
    <>
      {props.isDeletedRequested ? (
       



        <div className="delete-container">
          <div className="delete-row">
            <p className="confirmation-text">Are you sure about this?</p>
          </div>
          <div className="delete-row">
          <button
              className="delete-button-confirm"
              type="button"
              onClick={props.deleteFunction}
            >
              <div className="card-icon-button">
                <FontAwesomeIcon icon="fa-trash-can" />
              </div>
              <div>Delete</div>
            </button>
            <button
              className="cancel-button"
              type="button"
              onClick={() => {
                props.setIsDeletedRequested(false);
              }}
            >
              <div className="card-icon-button">
                <FontAwesomeIcon icon="fa-xmark" />
              </div>
              <div>Cancel</div>
            </button>

          </div>
        </div> 
        
      ) : (
        <div className="delete-container">
          <div className="delete-row"></div>
          <div className="delete-row">
          <button
            className="delete-button"
            type="button"
            onClick={() => {
              props.setIsDeletedRequested(true);
            }}
          >
           <div className="card-icon-button">
              <FontAwesomeIcon icon="fa-trash-can" />
            </div>
            <div>Delete</div>
          </button>
          </div>
        </div>
        
      )}
      
    </>
  );
};

export default DeleButtton;
