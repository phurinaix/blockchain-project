import React from 'react';
import blockcerts_issuers from '../assets/img/blockcerts_issuers.jpg';
import blockcerts_add_issuer from '../assets/img/blockcerts_add_issuer.jpg';

const AddIssuerInstruction = (props) => {
    return (
        <div className="col-md-7 mx-auto text-center">
            <h6>Please first download the Blockcerts wallet from the link</h6>
            <p>For IOS: <a href="https://itunes.apple.com/us/app/blockcerts-wallet/id1146921514?mt=8" target="_blank" rel="noopener noreferrer"><u>https://itunes.apple.com/us/app/blockcerts-wallet/id1146921514?mt=8</u></a></p>
            <p>For Android: <a href="https://play.google.com/store/apps/details?id=com.learningmachine.android.app&hl=en" target="_blank" rel="noopener noreferrer"><u>https://play.google.com/store/apps/details?id=com.learningmachine.android.app&hl=en</u></a></p>
            
            <h6>Install it on your phone or computer.</h6>
            <h6>Once you have your Blockcerts wallet on your phone, Go to add issuer</h6>
            <div className="bg-light py-4 px-3 m-4">
                <p>Enter the URL: <strong>https://tu-issuer.herokuapp.com/issuer-profile</strong></p>
                <p>Enter the one-time-code: <strong>Your Student ID</strong></p>
            </div>
            <h6>After that you can see issuer in your issuer screen</h6>
            <br/>
            <img src={blockcerts_add_issuer} alt="" width="200px" className="instruction_img mx-4"/>
            <img src={blockcerts_issuers} alt="" width="200px" className="instruction_img mx-4"/>
        </div>
    );
};

export default AddIssuerInstruction;