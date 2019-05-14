import React from 'react';
import { Form } from 'react-bootstrap';

const FormGroup = (props) => {
    return (
        <Form.Group>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} value={props.value} onChange={props.change}/>
            {props.text !== '' && <Form.Text className="text-muted">{props.text}</Form.Text>}
        </Form.Group>
    );
};

export default FormGroup;