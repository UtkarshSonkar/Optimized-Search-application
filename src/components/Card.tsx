import React, { useState } from "react";
import "./Card.css";
import Modal from "./Modal";

type Props = {
  images: any;

  //price: number;
};

const Card = ({ images }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const image_src: string = `http://farm${images.farm}.staticflickr.com/${images.server}/${images.id}_${images.secret}.jpg`;
  return (
    <div className="card-body">
      <div>
        <img className="card-image" src={image_src} alt="" />
      </div>
      <button className="card-button" onClick={() => setOpenModal(true)}>
        View
      </button>
      <Modal
        open={openModal}
        modal_src={image_src}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Card;
