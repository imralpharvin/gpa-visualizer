import { useState } from "react";
import CumulativeGPA from "./CumulativeGPA";

const { parseTranscript } = require("../api/transcriptParser");
const { convertTranscript } = require("../api/gpaConverter");

const GPAConverterForm = () => {
  const [rawTranscript, setRawTranscript] = useState("");
  const [transcript, setTranscript] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rawTranscript) {
      const preTranscript = parseTranscript(rawTranscript);
      const convertedTranscript = convertTranscript(preTranscript);
      setTranscript(convertedTranscript);
      setRawTranscript("");
      console.log(convertedTranscript);
    } else {
      console.log("empty value");
    }
  };

  return (
    <>
      <article>
        <form className="form" onSubmit={handleSubmit}>
          <textarea
            value={rawTranscript}
            onChange={(e) => setRawTranscript(e.target.value)}
          >
            Hi
          </textarea>
          <h4>Instructions:</h4>
          <ol>
            <li>Download your unofficial transcript pdf from WebAdvisor.</li>
            <li>
              Ctrl + A (Select All) then Ctrl + C (Copy) from your unofficial
              transcript pdf.
            </li>
            <li>Ctrl + V (Paste) on the text area field above.</li>
            <li>Press Convert button.</li>
          </ol>
          <button className="btn" type="submit">
            Convert
          </button>
        </form>
        {transcript.length === 0 ? (
          ""
        ) : (
          <CumulativeGPA transcript={transcript} />
        )}
      </article>
    </>
  );
};

export default GPAConverterForm;
