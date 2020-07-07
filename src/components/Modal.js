import React from "react";
import { Modal as ModalB } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { openCloseAddTweetModalAction } from "../actions/modalActions";

export default function Modal(props) {
  const { children } = props;

  //dispatch
  const dispatch = useDispatch();
  const closeModal = (state) => dispatch(openCloseAddTweetModalAction(state));

  //useSelector para acceder al valor en el store
  const isOpenModal = useSelector((state) => state.modals.stateModalAddTweet);

  return (
    <ModalB
      show={isOpenModal}
      onHide={() => closeModal(false)}
      size="lg"
      centered
    >
      {children}
    </ModalB>
  );
}
