import React, { Component } from 'react';
import RequestForm from '../../components/RequestForm';
import SendPubKeyForm from '../../components/SendPubKeyForm';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Request extends Component {
    state = {
        studentName: '',
        studentId: '',
        requestInvalidText: '',
        isRequestSuccess: false,
        pubKey: '',
        diploma: false,
        transcript: false,
        pubKeyInvalidText: '',
        isPubKeySuccess: false,
        fetching: false,
        oneTimeCode: null
    };
    handleStudentNameChange = (event) => {
        this.setState({
            studentName: event.target.value
        });
    };
    handleStudentIdChange = (event) => {
        this.setState({
            studentId: event.target.value
        });
    };
    handleRequestSubmit = (event) => {
        event.preventDefault();
        this.setState({ fetching: true });
        axios.post('https://tu-issuer.herokuapp.com/recipient', {
            name: this.state.studentName,
            id: this.state.studentId
          })
          .then((response) => {
            let res = response.data;
            // return console.log(res + ' ');
            this.setState({ fetching: false });
            if (res.status) {
                console.log(res.oneTimeCode);
                if(res.status === 'success') {
                    this.setState({ 
                        requestInvalidText: '',
                        oneTimeCode: res.oneTimeCode,
                        isRequestSuccess: true
                    });
                }
            }else {
                if(res === 'invalid_name') {
                    this.setState({ requestInvalidText: 'Student name must contain only English characters'});
                } else if(res === 'invalid_id') {
                    this.setState({ requestInvalidText: 'Student ID must contain only number'});                
                } else if(res === 'id_length') {
                    this.setState({ requestInvalidText: 'Student ID must consisting of 10 digits'});                
                } else if(res === 'invalid_name_id') {
                    this.setState({ requestInvalidText: 'Student name and Student ID are invalid'});
                }
            }
          })
          .catch((error) => {
            console.log(error);
          });
    };
    render() {
        // console.log('OnetimeCode: ', this.state.oneTimeCode);
        return (
            <div>
                {this.state.isRequestSuccess ?
                    <SendPubKeyForm 
                        pubKey={this.state.pubKey}
                        diploma={this.state.diploma}
                        transcript={this.state.transcript}
                        pubKeyChange={this.handlePubKeyChange}
                        diplomaChange={this.handleDiplomaChange}
                        transcriptChange={this.handleTranscriptChange}
                        submit={this.handlePubKeySubmit}
                        invalidText={this.state.pubKeyInvalidText}
                        oneTimeCode={this.state.oneTimeCode}
                    />
                    :
                    <RequestForm 
                        studentName={this.state.studentName}
                        studentId={this.state.studentId}
                        studentNameChange={this.handleStudentNameChange}
                        studentIdChange={this.handleStudentIdChange}
                        submit={this.handleRequestSubmit}
                        invalidText={this.state.requestInvalidText}
                        fetching={this.state.fetching}
                    />
                }
            </div>
        );
    }
}

export default Request;