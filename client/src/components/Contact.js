import React, { useState, useEffect, useRef, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faSpinner, faEnvelopeOpen, faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Alert, Col, Form, InputGroup, Button } from 'react-bootstrap';

const rules = {
  required: { validator: (value) => value.length > 0, message: { id: 'word', date: new Date(), status: 'error', text: 'Required.' } },
  word: { validator: (value) => /^[a-zA-Z_-]{3,32}$/.test(value), message: { id: 'word', date: new Date(), status: 'error', text: 'Invalid word.' } },
  nope: { validator: (value) => !/^(boss|god|lord)$/i.test(value), message: { id: 'nope', date: new Date(), status: 'error', text: '... nope' } },
  words: { validator: (value) => /^([a-zA-Z _-]{3,32})$/.test(value), message: { id: 'words', date: new Date(), status: 'error', text: 'Invalid words.' } },
  email: { validator: (value) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value), message: { id: 'email', date: new Date(), status: 'error', text: 'Invalid Email.' } },
  phone: { validator: (value) => /^\+?[0-9 -]{10,16}$/.test(value), message: { id: 'phone', date: new Date(), status: 'error', text: 'Invalid Phone.' } },
  text: { validator: (value) => /^[a-zA-Z0-9 \.,;!?#@%&*()-]{3,256}$/.test(value), message: { id: 'text', date: new Date(), status: 'error', text: 'Invalid Text.' } },
};

const initialFields = {
  name: { rules: [{ ...rules.words, message: { ...rules.words.message, text: 'Alphabetic characters (incl space).\nNo less than 3, no more than 32.' } }, rules.nope], status: 'inert', value: '', messages: {} },
  email: { rules: [{ ...rules.email, message: { ...rules.email.message, text: 'Invalid email.' } }], status: 'inert', value: '', messages: {} },
  query: { rules: [{ ...rules.text, message: { ...rules.text.message, text: 'Alphanumeric, space and punctuation (excl quotes).\nNo less than 3, no more than 256.' } }], status: 'inert', value: '', messages: {} },
};

const Feedback = ({ messages, ...props }) =>
  Object.keys(messages).map((key) => (
    <Form.Control.Feedback key={`message-${key}`} type={messages[key].status === 'error' ? 'invalid' : 'valid'} style={{ whiteSpace: 'pre-line' }} className="text-left" {...props}>
      {' '}
      {messages[key].text}{' '}
    </Form.Control.Feedback>
  ));

const Messages = ({ messages }) => {
  const statusMap = { error: 'danger', warning: 'warning', success: 'success' };
  return [
    Object.keys(messages).map((key) => (
      <Alert key={`message-${messages[key].id}`} variant={statusMap[messages[key].status]} style={{ whiteSpace: 'pre-line' }}>
        {messages[key].text}
      </Alert>
    )),
  ];
};

export default () => {

  const contactFormRef = useRef();
  const contactSubmitButtonRef = useRef();
  const [fields, setFields] = useState(initialFields);
  const [validated, setValidated] = useState(false);
  const validateField = (field) =>
    field.rules.reduce((accumulator, rule) => ({ ...accumulator, ...(!rule.validator(field.value) ? { messages: { ...accumulator.messages, [rule.message.id]: rule.message }, status: 'error' } : {}) }), { ...field, messages: {}, status: 'success' });
  const validateFields = (fields) => Object.keys(fields).reduce((accumulator, key) => ({ ...accumulator, [key]: validateField(accumulator[key]) }), fields);

  const [contactSubmitMessages, setContactSubmitMessages] = useState({});
  const [contactSubmitIcon, setContactSubmitIcon] = useState(faEnvelopeOpen);
  const [contactSubmitSpin, setContactSubmitSpin] = useState(false);
  const [contactSubmitClassList, setContactSubmitClassList] = useState(['inert']);

  const reset = (event) => {
    setFields(initialFields);
    setValidated(false);
    setContactSubmitIcon(faEnvelopeOpen);
    setContactSubmitSpin(false);
    setContactSubmitClassList(['inert']);
    setContactSubmitMessages({});
    if (event.target) event.target.reset();
    else if (contactFormRef.current) contactFormRef.current.reset();
  };

  useEffect(() => {
    const contactResetHandler = (event) => reset(event);

    const contactSubmitHandler = (event) => {
      event.preventDefault();

      const postFields = validateFields(fields);
      setFields(postFields);

      const validated = Object.keys(postFields).every((key) => postFields[key].status === 'success');
      setValidated(validated);
      if (!validated) return false;

      setContactSubmitIcon(faSpinner);
      setContactSubmitSpin(true);
      setContactSubmitClassList(['warning']);

      const http = `${process.env.REACT_APP_HTTP_PROTOCOL}://${process.env.REACT_APP_HTTP_HOST}:${process.env.REACT_APP_HTTP_PORT}`;
      fetch(`${http}/contact`, {
        method: 'POST',
        // mode: 'cors',
        headers: {
          'Content-Type': 'Application/json',
          charset: 'utf-8',
        },
        body: JSON.stringify(Object.fromEntries(new FormData(event.target))),
      })
        .then((response) => {
          response.json().then((json) => {
            if (json.message && json.message.status === 'success') {
              setContactSubmitIcon(faCheck);
              setContactSubmitSpin(false);
              setContactSubmitClassList(['success']);
              setContactSubmitMessages({ submit: { ...json.message, text: 'Thank you. Your query has been sent.' } });
            }
            if (json.message && json.message.status === 'warning') {
              setContactSubmitIcon(faExclamation);
              setContactSubmitSpin(false);
              setContactSubmitClassList(['warning']);
              setContactSubmitMessages({ submit: { ...json.message } });
            }
            if (json.message && json.message.status === 'error') {
              setContactSubmitIcon(faExclamation);
              setContactSubmitSpin(false);
              setContactSubmitClassList(['error']);
              setContactSubmitMessages({ submit: { ...json.message } });
              setFields(Object.keys(json.fields).reduce((accumulator, key) => ({ ...accumulator, [key]: { ...accumulator[key], ...json.fields[key] } }), fields));
            }
          });
        })
        .catch((error) => {
          setContactSubmitIcon(faExclamation);
          setContactSubmitSpin(false);
          setContactSubmitClassList(['error']);
          setContactSubmitMessages({ submit: { status: 'error', text: `${error}` } });
        });
    };

    contactFormRef.current.addEventListener('reset', contactResetHandler);
    contactFormRef.current.addEventListener('submit', contactSubmitHandler);
    return () => {
      contactFormRef.current.removeEventListener('reset', contactResetHandler);
      contactFormRef.current.removeEventListener('submit', contactSubmitHandler);
    };
  });

  return (
    <Form ref={contactFormRef} noValidate validated={validated}>
      <Form.Row>
        <Form.Group as={Col} className="col-md-6 col-12" controlId="contact.name">
          <div className="md-form mb-0">
            <Form.Text muted className="text-left">
              * Refer to you as?
            </Form.Text>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} size="1x" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name={'name'}
                value={fields['name'].value}
                isInvalid={fields['name'].status === 'error'}
                onChange={(event) => setFields({ ...fields, ['name']: validateField({ ...fields['name'], value: event.target.value }) })}
                placeholder="Name"
                type="text"
              />
              <Feedback messages={fields['name'].messages} />
            </InputGroup>
          </div>
        </Form.Group>
        <Form.Group as={Col} className="col-md-6 col-12" controlId="contact.email">
          <div className="md-form mb-0">
            <Form.Text muted className="text-left">
              * I'll need it to respond.
            </Form.Text>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} size="1x" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name={'email'}
                value={fields['email'].value}
                isInvalid={fields['email'].status === 'error'}
                onChange={(event) => setFields({ ...fields, ['email']: validateField({ ...fields['email'], value: event.target.value }) })}
                placeholder="Email"
                type="email"
              />
              <Feedback messages={fields['email'].messages} />
            </InputGroup>
          </div>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} className="col-md-12" controlId="contact.message">
          <div className="md-form">
            <Form.Text muted className="text-left">
              * How can I help?
            </Form.Text>
            <InputGroup hasValidation>
              <Form.Control
                name={'query'}
                value={fields['query'].value}
                isInvalid={fields['query'].status === 'error'}
                onChange={(event) => setFields({ ...fields, ['query']: validateField({ ...fields['query'], value: event.target.value }) })}
                placeholder="Query"
                as="textarea"
                rows={2}
              />
              <Feedback messages={fields['query'].messages} />
            </InputGroup>
          </div>
        </Form.Group>
      </Form.Row>
      <Form.Row className="mb-3">
        <Col className="col-md-12 text-center">
          <Button ref={contactSubmitButtonRef} type="submit" className="btn btn-secondary btn-lg mx-3">
            <span>{'Send'}</span>
            <FontAwesomeIcon icon={contactSubmitIcon} spin={contactSubmitSpin} className={`ml-2 ${contactSubmitClassList.reduce((accumulator, item) => `${accumulator} ${item}`, '')}`} size="1x" />
          </Button>
          <Button type="reset" className="btn btn-secondary btn-lg mx-1">
            <span>{'Reset'}</span>
          </Button>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col className="col-12 text-center">
          <Messages messages={contactSubmitMessages} />
        </Col>
      </Form.Row>
    </Form>
  );
};
