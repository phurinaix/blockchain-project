import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FormGroup from './FormGroup';

const RequestForm = (props) => {
    return (
        <React.Fragment>
            <Form onSubmit={props.submit} className="col-md-6">
                <h4>Please first download the blockchain wallet from the link</h4>
                <ul>
                    <li>For iOS: <u>https://itunes.apple.com/us/app/blockcerts-wallet/id1146921514?mt=8</u></li>
                    <li>For Android: <u>https://play.google.com/store/apps/details?id=com.learningmachine.android.app&hl=en</u></li>
                </ul>
                <h4>Install it on your phone or computer.</h4>
                <h4>Once you have your public key provide it to us:</h4>
                { props.invalidText !== '' && <Alert variant="danger">{props.invalidText}</Alert> }
                <FormGroup label="Public Key" type="text" value={props.pubKey} change={props.pubKeyChange} />
                <p>Which documents you want ?</p>
                <FormGroup label="Diploma" type="checkbox" value={props.diploma} change={props.diplomaChange} />
                <FormGroup label="Transcript" type="checkbox" value={props.transcript} change={props.transcriptChange} />
                <Button variant="primary" type="submit" className="w-100">
                    Send
                </Button>
            </Form>
        </React.Fragment>
    );
};

export default RequestForm;