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
        isPubKeySuccess: false
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
        axios.post('https://still-badlands-79996.herokuapp.com/request', {
            studentName: this.state.studentName,
            studentId: this.state.studentId
          })
          .then((response) => {
            let res = response.data;
            if(res === 'success') {
                this.setState({ 
                    requestInvalidText: '',
                    isRequestSuccess: true
                });
            } else if(res === 'name1') {
                this.setState({ requestInvalidText: 'Student name must contain only English characters'});
            } else if(res === 'id1') {
                this.setState({ requestInvalidText: 'Student ID must contain only number'});                
            } else if(res === 'id2') {
                this.setState({ requestInvalidText: 'Student ID must consisting of 10 digits'});                
            }
          })
          .catch((error) => {
            console.log(error);
          });
    };
    handlePubKeyChange = (event) => {
        this.setState({
            pubKey: event.target.value
        });
    };
    handleDiplomaChange = (event) => {
        this.setState({
            diploma: event.target.checked
        });
    };
    handleTranscriptChange = (event) => {
        this.setState({
            transcript: event.target.checked
        });
    };
    handlePubKeySubmit = (event) => {
        event.preventDefault();
        axios.post('https://still-badlands-79996.herokuapp.com/pubKey', {
            pubKey: this.state.pubKey,
            diploma: this.state.diploma,
            transcript: this.state.transcript
          })
          .then((response) => {
            let res = response.data;
            if(res === 'success') {
                this.setState({
                    pubKeyInvalidText: '',
                    isPubKeySuccess: true
                });
                alert('Success');
                this.props.history.push('/blockchain/');
            } else if(res === 'err1') {
                this.setState({
                    pubKeyInvalidText: 'Public Key Invalid'
                });
            } else if(res === 'err2') {
                this.setState({
                    pubKeyInvalidText: 'You have to choose either diploma or transcript'
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
    render() {
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
                    />
                    :
                    <RequestForm 
                        studentName={this.state.studentName}
                        studentId={this.state.studentId}
                        studentNameChange={this.handleStudentNameChange}
                        studentIdChange={this.handleStudentIdChange}
                        submit={this.handleRequestSubmit}
                        invalidText={this.state.requestInvalidText}
                    />
                }
            </div>
        );
    }
}

export default Request;