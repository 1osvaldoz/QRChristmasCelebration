import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Button } from "react-materialize";

export default forwardRef(({ header, body, footer, onCloseEnd, className="", classNameFooter="" }, ref) => {
  const modalRef = useRef(null);
  const openRef = useRef(null);
  const closRef = useRef(null);

  useEffect(() => {
    if (modalRef) {
      const options = {
        onOpenStart: () => {
          console.log("Open Start");
        },
        onOpenEnd: () => {
          console.log("Open End");
        },
        onCloseStart: () => {
          console.log("Close Start");
        },
        onCloseEnd: () => {
          onCloseEnd();
        },
        inDuration: 250,
        outDuration: 250,
        opacity: 0.5,
        dismissible: false,
        startingTop: "4%",
        endingTop: "10%",
      };
      M.Modal.init(modalRef.current, options);
    }
  }, [modalRef]);
  useImperativeHandle(ref, () => ({
    openModal() {
      openRef.current.click();
    },
    closeModal() {
      closRef.current.click();
    },
  }));
  return (
    <div>
      {/* <a
        className="waves-effect waves-light btn modal-trigger"
        data-target="modal1"
      >
        Modal
      </a> */}
      <div ref={modalRef} id="modal1" className={`modal ${className}`}>
        <div className="modal-content">
          {header}
          {body}
        </div>
        <div className={`modal-footer ${classNameFooter}`}>{footer}</div>
        <div style={{ display: "none" }}>
          <button
            ref={openRef}
            className="waves-effect waves-light btn modal-trigger"
            data-target="modal1"
          >
            open
          </button>
          <button ref={closRef} className="red modal-close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
});
