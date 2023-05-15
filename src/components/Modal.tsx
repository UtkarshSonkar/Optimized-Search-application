import React from "react";
import "./Modal.css";

type Props = {
  open: boolean;
  modal_src: string;
  onClose: () => void;
};

const Modal = ({ open, modal_src, onClose }: Props) => {
  if (!open) return null;
  return (
    <div className="overlay">
      Modal
      <div className="modal-container">
        <img src={modal_src} />
        <div className="modalRight">
          <p className="close-button" onClick={onClose}>
            Close
          </p>
          {/* <div className="content">Content text</div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
