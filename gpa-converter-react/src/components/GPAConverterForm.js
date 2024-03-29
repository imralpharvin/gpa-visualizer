import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CumulativeGPA from './CumulativeGPA';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';

const { parseTranscript } = require('../api/transcriptParser');
const { convertTranscript } = require('../api/gpaConverter');

const GPAConverterForm = () => {
  //set file
  const [file, setFile] = useState();
  const [filename, setFilename] = useState('Select PDF File');
  const [transcript, setTranscript] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [animated, setAnimated] = useState(true);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('fileName: ' + filename);
    setError(false);
    setSuccess(false);
    setLoadingPercentage(10);
    setAnimated(true);

    if (
      filename === null ||
      filename === undefined ||
      filename === '' ||
      filename === 'Select PDF File'
    ) {
      setError(true);
      setErrorMessage('No file uploaded. Please choose a file.');
      setLoadingPercentage(0);
    } else if (filename.split('.').pop() !== 'pdf') {
      setError(true);
      setErrorMessage('Not a pdf file. Please choose a pdf file');
      setLoadingPercentage(0);
    } else {
      setLoadingPercentage(30);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await axios.post(
          'https://gpa-visualizer.herokuapp.com/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setLoadingPercentage(50);
        console.log(res);
        const pdfText = res.data.data;
        console.log('THIS DATA: ' + pdfText);

        let convertedTranscript;
        if (pdfText) {
          const preTranscript = parseTranscript(pdfText);
          convertedTranscript = convertTranscript(preTranscript);
          setTranscript(convertedTranscript);
          console.log(convertedTranscript);
          if (
            convertedTranscript === undefined ||
            convertedTranscript.length === 0
          ) {
            setError(true);
            setSuccess(false);
            setErrorMessage('No courses detected in pdf file.');
            setLoadingPercentage(0);
          } else {
            setError(false);
            setSuccess(true);
            setErrorMessage('');
            setLoadingPercentage(100);
            setAnimated(false);
          }
        } else {
          setError(true);
          setSuccess(false);
          setErrorMessage('No content detected in pdf file.');
          setLoadingPercentage(0);
        }
      } catch (err) {
        if (err.response.status === 500) {
          setError(true);
          setSuccess(false);
          setErrorMessage('There was a problem with the server');
          setLoadingPercentage(0);
          console.log('There was a problem with the server');
        } else {
          setError(true);
          setSuccess(false);
          setLoadingPercentage(0);
          setErrorMessage(err.response.data.msg);
          console.log(err.response.data.msg);
        }
      }
    }
  };

  const onErrorClose = () => {
    setError(false);
    setSuccess(false);
    setErrorMessage('');
    setLoadingPercentage(0);
  };

  const onSuccessClose = () => {
    setSuccess(false);
    setLoadingPercentage(0);
  };

  return (
    <>
      <div className='no-print'>
        <Card className='gpaForm'>
          {error ? (
            <Alert
              variant='danger'
              style={{ textAlign: 'left' }}
              onClose={onErrorClose}
              dismissible
            >
              <Alert.Heading>Error</Alert.Heading>
              <hr />
              <p>{errorMessage}</p>
            </Alert>
          ) : (
            ''
          )}
          {success ? (
            <Alert
              variant='success'
              style={{ textAlign: 'left' }}
              onClose={onSuccessClose}
              dismissible
            >
              <Alert.Heading>Success!</Alert.Heading>
              <hr />
              <p>Scroll down to see you courses.</p>
            </Alert>
          ) : (
            ''
          )}
          <Form onSubmit={onSubmit}>
            <InputGroup style={{ display: 'block' }}>
              <input
                type='file'
                className='custom-file-input'
                id='customFile'
                onChange={onChange}
              />
              <label
                className='custom-file-label'
                style={{ textAlign: 'left' }}
                htmlFor='customFile'
              >
                {filename}
              </label>{' '}
              <>
                <br />
              </>
              <ProgressBar
                striped={true}
                animated={animated}
                now={loadingPercentage}
              />
              <Button as='input' type='submit' value='Visualize' />
            </InputGroup>
          </Form>
          <hr />
          <h4>Instructions:</h4>
          <ol>
            <li>
              Download your unofficial transcript pdf from{' '}
              <a
                href='https://webadvisor.uoguelph.ca/'
                target='_blank'
                rel='noopener noreferrer'
                download
              >
                WebAdvisor
              </a>
              . A{' '}
              <a
                href='uploads/sample.pdf'
                target='_blank'
                rel='noopener noreferrer'
                download
              >
                sample transcript
              </a>{' '}
              is provided for demonstration purposes.
            </li>
            <li>Browse and select your file. </li>
            <li>Press Visualize button.</li>
          </ol>
        </Card>
      </div>
      {transcript.length === 0 ? '' : <CumulativeGPA transcript={transcript} />}
    </>
  );
};

export default GPAConverterForm;
