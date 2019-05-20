import React from 'react';
import { Form, Button } from 'react-bootstrap';
import blockcerts_issuers from '../assets/img/blockcerts_issuers.jpg';
import blockcerts_add_issuer from '../assets/img/blockcerts_add_issuer.jpg';

const RequestForm = (props) => {
    return (
        <React.Fragment>
            <Form onSubmit={props.submit} className="text-center mx-auto">
                <h4>Please first download the Blockcerts wallet from the link</h4>
                <p>For iOS: <u>https://itunes.apple.com/us/app/blockcerts-wallet/id1146921514?mt=8</u></p>
                <p>For Android: <u>https://play.google.com/store/apps/details?id=com.learningmachine.android.app&hl=en</u></p>
                
                <h4>Install it on your phone or computer.</h4>
                <h4>Once you have your Blockcerts wallet on your phone, Go to add issuer</h4>
                <img src={blockcerts_add_issuer} alt="" width="300px" className="instruction_img"/>
                <h5>Enter the URL: <strong>https://tu-issuer.herokuapp.com/issuer-profile</strong></h5>
                <h5>Enter the one-time-code: <strong>{props.oneTimeCode}</strong></h5>
                <h4>After that you can see issuer in your issuer screen</h4>
                <img src={blockcerts_issuers} alt="" width="300px" className="instruction_img"/>
            </Form>
        </React.Fragment>
    );
};

export default RequestForm;