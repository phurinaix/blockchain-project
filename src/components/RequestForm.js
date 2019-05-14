import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FormGroup from './FormGroup';

const RequestForm = (props) => {
    return (
        <React.Fragment>
            <h1>Thammasat Blockchain Academic Credential</h1>
            <h4>How to apply for putting your diploma to Blockchain</h4>
            <Form onSubmit={props.submit} className="col-md-5" autoComplete="off">
                { props.invalidText !== '' && <Alert variant="danger">{props.invalidText}</Alert> }
                <FormGroup label="Student name" type="text" text="Your student name must contain only letters and must not contain spaces." value={props.studentName} change={props.studentNameChange}/>
                <FormGroup label="Student ID" type="text" text="Your student id number must be 10 characters long, contain only numbers and must not contain spaces." value={props.studentId} change={props.studentIdChange}/>
                <Button variant="primary" type="submit" className="w-100">
                    Send
                </Button>
            </Form>
        </React.Fragment>
    );
};

export default RequestForm;