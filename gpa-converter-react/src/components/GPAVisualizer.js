import React from 'react';
import GPAConverterForm from './GPAConverterForm';

const GPAConverter = () => {
  return (
    <>
      <div className='no-print'>
        <h1>UoG GPA Visualizer</h1>
        <p>
          This tool allows UoG Students to view and calculate their WebAdvisor
          Unofficial Transcipt by year and semester and converts percentage GPA
          to 4.0 scale GPA. (
          <a
            href='https://www.uoguelph.ca/uaic/faq/grades/how-do-i-calculate-gpa-using-my-guelph-grades'
            target='_blank'
            rel='noopener noreferrer'
          >
            See Conversion Chart
          </a>
          )
        </p>
      </div>
      <GPAConverterForm />

      <div className='no-print'>
        <hr />
        <p>
          Created by
          <a
            href='https://www.ralphdc.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            {' '}
            Ralph Arvin De Castro
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default GPAConverter;
