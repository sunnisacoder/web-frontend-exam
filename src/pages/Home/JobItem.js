import React from 'react';
import titleImg from '../../images/titleImg.svg';
import educationImg from '../../images/educationImg.svg';
import salaryImg from '../../images/salaryImg.svg';

const JobItem = ({ companyName, title, education, salary, description }) => {
  return (
    <div className="jobItem">
      <p className="companyName">{companyName}</p>
      <div className="information">
        <div className="title">
          <img src={titleImg} alt="titleImg" />
          <p>{title}</p>
        </div>
        <div className="education">
          <img src={educationImg} alt="educationImg" />
          <p>{education}</p>
        </div>
        <div className="salary">
          <img src={salaryImg} alt="salaryImg" />
          <p>{salary}</p>
        </div>
      </div>
      <div className="content">
        <p>{description}</p>
      </div>
      <div className="detailBtn">
        <a href="">查看細節</a>
      </div>
    </div>
  );
};

export default JobItem;
