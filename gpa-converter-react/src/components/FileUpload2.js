import { useState } from 'react';
import CumulativeGPA from './CumulativeGPA';
import FileUpload from './GPAConverterForm';
import Card from 'react-bootstrap/Card';

const { parseTranscript } = require('../api/transcriptParser');
const { convertTranscript } = require('../api/gpaConverter');

const GPAConverterForm2 = () => {
  const [rawTranscript, setRawTranscript] = useState('');
  const [transcript, setTranscript] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let convertedTranscript;
    if (rawTranscript) {
      const preTranscript = parseTranscript(rawTranscript);
      convertedTranscript = convertTranscript(preTranscript);
      setTranscript(convertedTranscript);
      setRawTranscript('');
      console.log(convertedTranscript);
    } else {
      console.log('empty value');
    }
    if (convertedTranscript === undefined || convertedTranscript.length === 0) {
      alert(
        'No courses. Please copy your transcript from Adobe Acrobat Reader DC or Google Chrome PDF Viewer.'
      );
    }
  };

  return (
    <>
      <Card body className='gpaForm'>
        <FileUpload />
        <hr />
        <h4>Instructions:</h4>
        <ol>
          <li>Download your unofficial transcript pdf from WebAdvisor.</li>
          <li>
            Ctrl + A (Select All) then Ctrl + C (Copy) from your unofficial
            transcript pdf. !!!! Make sure you are using Adobe Acrobat Reader DC
            or Google Chrome as your PDF viewer !!!!
          </li>
          <li>Ctrl + V (Paste) on the text area field above.</li>
          <li>Press Visualize button.</li>
        </ol>
        {/* <form onSubmit={handleSubmit}>
          
          <textarea
            value={rawTranscript}
            onChange={(e) => setRawTranscript(e.target.value)}
          >
            Hi
          </textarea>
          <button className="btn" type="submit">
            Visualize
          </button>
        </form> */}
        {transcript.length === 0 ? (
          ''
        ) : (
          <CumulativeGPA transcript={transcript} />
        )}
      </Card>
    </>
  );
};

export default GPAConverterForm2;
