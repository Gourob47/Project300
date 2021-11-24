import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Form, Col, Row, Button, Formik } from "react-bootstrap";
import './Contact.css';

const Contact = () => {
  return (
    <Fragment>
      <div className="container">

           <h1 className="req"> Request Consultation </h1>

        <Form className="my-3 border py-3">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="req1 ">Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Label className="req1">Phone</Form.Label>
              <Form.Control placeholder="Enter Your phoneNumber" />
            
            </Form.Group>

          
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridEvent1">
              <Form.Label className="req1">Event Location</Form.Label>
              <Form.Control placeholder="Enter Your Place" />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridEvent2">
              <Form.Label className="req1">Address</Form.Label>
              <Form.Control placeholder="Enter your Residence" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            


          </Row>
          

          <Button className="req2" variant="" type="submit">
            SUBMIT
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default Contact;
