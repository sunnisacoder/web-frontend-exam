import React, { useState, useEffect } from 'react';
import './styles.scss';
import background from '../../images/background.png';
import logo from '../../images/logo.svg';
import logoMobile from '../../images/logo-mobile.svg';

import character from '../../images/character.png';
import characterBack from '../../images/character-back.png';
import leftEye from '../../images/left-eye.png';
import rightEye from '../../images/right-eye.png';
import characterMobile from '../../images/character-mobile.png';

function Home() {
  const [educationLevels, setEducationLevels] = useState([]);
  const [salaryLevels, setSalaryLevels] = useState([]);

  useEffect(() => {
    fetch('/api/v1/educationLevelList')
      .then(response => response.json())
      .then(data => setEducationLevels(data))
      .catch(error => console.error('Error fetching education levels:', error));
  }, []);
  useEffect(() => {
    fetch('/api/v1/salaryLevelList')
      .then(response => response.json())
      .then(data => setSalaryLevels(data))
      .catch(error => console.error('Error fetching education levels:', error));
  }, []);

  return (
    <div className="wrapper">
      <div className="banner">
        <picture>
          <img src={background} alt="background" />
        </picture>

        <div className="logoBox">
          <a href="https://www.yile.com.tw/" target="_blank">
            <img src={logo} alt="logo" />
          </a>
          <a href="https://www.yile.com.tw/" target="_blank">
            <img src={logoMobile} alt="logo" />
          </a>
        </div>
        
        <div className="characterBox">
          <div className="characterBoxInner">
            <img className="character" src={character} alt="character" />
            <img className="characterBack" src={characterBack} alt="characterBack" />
            <img className="leftEye" src={leftEye} alt="leftEye" />
            <img className="rightEye" src={rightEye} alt="rightEye" />
          </div>
          <div className="characterMobile">
              <img src={characterMobile} alt="characterMobile" />
          </div>
        </div>
      </div>
      <div className="jobArea">
        <div className="inner">
            <h1>適合前端工程師的好工作</h1>
            <div className="filterBox">
                <div className="inputBox">
                    <input type="text" placeholder="請輸入公司名稱" />
                </div>
                <div className="selectBox">
                  <select name="educationLevel" id="educationLevel">
                      <option value="">不限</option>
                      {educationLevels.map(level => (
                          <option key={level.id} value={level.id}>
                              {level.label}
                          </option>
                      ))}
                  </select>
                </div>
                <div className="selectBox">
                  <select name="salaryLevel" id="salaryLevel">
                    <option value="">不限</option>
                    {salaryLevels.map(salary => (
                        <option key={salary.id} value={salary.id}>
                            {salary.label}
                        </option>
                    ))}
                  </select>
                </div>
                <button>條件搜尋</button>
            </div>
            <div className="jobData">
              <p className="noData">無資料</p>
            </div>
        </div>
      </div>
    </div>
      );
}

export default Home;
