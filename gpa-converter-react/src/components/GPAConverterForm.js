import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CumulativeGPA from './CumulativeGPA';
import Card from 'react-bootstrap/Card';

const { parseTranscript } = require('../api/transcriptParser');
const { convertTranscript } = require('../api/gpaConverter');

const GPAConverterForm = () => {
  //set file
  const [file, setFile] = useState();
  const [filename, setFilename] = useState('Select PDF File');
  const [transcript, setTranscript] = useState([]);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);
      const rawTranscript = res.data.data;
      console.log('THIS DATA: ' + rawTranscript);

      let convertedTranscript;
      if (rawTranscript) {
        const preTranscript = parseTranscript(rawTranscript);
        convertedTranscript = convertTranscript(preTranscript);
        setTranscript(convertedTranscript);
        console.log(convertedTranscript);
      } else {
        console.log('empty value');
      }
      if (
        convertedTranscript === undefined ||
        convertedTranscript.length === 0
      ) {
        alert(
          'No courses. Please copy your transcript from Adobe Acrobat Reader DC or Google Chrome PDF Viewer.'
        );
      }
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <>
      <Card className='gpaForm' style={{ width: '18rem' }}>
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
            </label>
            <Button as='input' type='submit' value='Visualize' />
          </InputGroup>
        </Form>
        <hr />
        <h4>Instructions:</h4>
        <ol>
          <li>Download your unofficial transcript pdf from WebAdvisor.</li>
          <li>Browse and select your file</li>
          <li>Press Visualize button.</li>
        </ol>
      </Card>
      {transcript.length === 0 ? '' : <CumulativeGPA transcript={transcript} />}
    </>
  );
};

export default GPAConverterForm;
