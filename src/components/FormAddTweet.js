import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { validationFormAddTweetAction } from "../actions/validationsActions";
import { addTweetsActions } from "../actions/tweetsActions";
import { openCloseAddTweetModalAction } from "../actions/modalActions";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export default function FormAddTweet() {
  const [formValue, setFormValue] = useState({
    name: "",
    tweet: "",
  });

  // inicializacion del dispatch
  const dispatch = useDispatch();
  const errorForm = (state) => dispatch(validationFormAddTweetAction(state));
  const addTweet = (state) => dispatch(addTweetsActions(state));
  const closeModal = (state) => dispatch(openCloseAddTweetModalAction(state));

  //obtener estado de la validacion del formulario
  const errorFormValue = useSelector(
    (state) => state.validations.errorFormAddTweet
  );

  const onChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, tweet } = formValue;

    if (!name || !tweet) {
      errorForm(true);
    } else {
      errorForm(false);
      addTweet({
        id: uuidv4(),
        name,
        tweet,
        date: moment(),
      });
      closeModal(false);
    }
  };

  return (
    <Form className="m-3" onChange={onChange} onSubmit={onSubmit}>
      <Form.Group className="text-center">
        <h1>Nuevo Tweet</h1>
      </Form.Group>
      <Form.Group>
        <Form.Control type="text" name="name" placeholder="Escribe tu Nombre" />
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="textarea"
          name="tweet"
          row="3"
          placeholder="Escriba su Tweet"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Enviar Tweet
      </Button>
      {errorFormValue && (
        <Alert variant="danger" className="mt-4">
          Todos los campos son obligatorios
        </Alert>
      )}
    </Form>
  );
}
