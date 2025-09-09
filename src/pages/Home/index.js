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
import JobItem from './JobItem';
import prev from '../../images/prev.svg';
import next from '../../images/next.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import parallax from 'parallax-js';

function Home() {
  const [educationLevels, setEducationLevels] = useState([]);
  const [salaryLevels, setSalaryLevels] = useState([]);
  const [jobLists, setJobLists] = useState([]);
  const [jobDetail, setJobDetail] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 1080) {
        setItemsPerPage(4); // 行動裝置顯示 4 筆
      } else {
        setItemsPerPage(6); // 電腦顯示 6 筆
      }
    };
    updateItemsPerPage(); // 設定初始值
    window.addEventListener('resize', updateItemsPerPage); // 監聽 resize 事件
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    const scene = document.getElementById('eyeScene');
    const parallaxInstance = new parallax(scene, {
      relativeInput: true,
      hoverOnly: true,
      scalarX: 3,
      scalarY: 3
    });

    return () => {
      parallaxInstance.destroy();
    };
  }, []);

  const totalPages = Math.ceil(jobLists.length / itemsPerPage); // 總頁數
  const currentJobs = jobLists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // 上一頁
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  // 下一頁
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  // 全部頁碼
  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </li>
      );
    }

    return pageNumbers;
};

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
      .catch(error => console.error('Error fetching salary levels:', error));
  }, []);

  useEffect(() => {
    fetch('/api/v1/jobs')
      .then(response => response.json())
      .then(result => {
        // result.data 職缺陣列
        setJobLists(result.data || []);
      })
      .catch(error => console.error('Error fetching job lists:', error));
  }, []);

  const fetchJobDetail = (jobId) => {
    fetch(`/api/v1/jobs/${jobId}`)
      .then(response => response.json())
      .then(result => {
        setJobDetail(result);
        setIsPopupVisible(true);
      })
      .catch(error => console.error('Error fetching job detail:', error));
  };
  

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
            <div id="eyeScene">
              <div data-depth="0.08">
                <img className="leftEye" src={leftEye} alt="leftEye" />
                <img className="rightEye" src={rightEye} alt="rightEye" />
              </div>
            </div>
          </div>
          <div className="characterMobile">
              <img src={characterMobile} alt="characterMobile" />
          </div>
        </div>
      </div>

      <div className="jobArea">
        <div className="inner" >
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
            <div className="jobData" style={{ border: jobLists.length === 0 ? '1px solid #ccc' : 'none' }}>
              {jobLists.length === 0 ? (
                <p className="noData">無資料</p>
              ) : (
              <div className="jobList">
                <div className="jobBox">
                  {currentJobs.map(job => (
                    <JobItem
                      key={job.id}
                      companyName={job.companyName}
                      title={job.jobTitle}
                      education={educationLevels.find(level => level.id === jobLists.educationLevels)?.label || '不限'}
                      salary={salaryLevels.find(salary => salary.id === jobLists.salaryLevels)?.label || '不限'}
                      description={job.preview}
                      onViewDetail={() => fetchJobDetail(job.id)}
                    />
                  ))}
                </div>
              </div>
              )}
            </div>  
            <ul className="pagination">
              <li 
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => goToPrevPage()}
              >
                <img src={prev} alt="prev" />
              </li>
              {renderPageNumbers()}
              <li 
                className={`next ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => goToNextPage()}
              >
                <img src={next} alt="next" />
              </li>
            </ul>
        </div>
      </div>

      <div className={`popUpArea ${isPopupVisible ? 'visible' : ''}`}>
        <div className="popUpBox">
          <div className="popUpTitle">
            <p>詳細資訊</p>
          </div>
            {jobDetail && (
            <div className="popUpContent">
              <div className="jobTitle">
                <p className="companyName">{jobDetail.companyName}</p>
                <p className="title">{jobDetail.jobTitle}</p>
              </div>
              <div className="album">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={0}
                  slidesPerView={2.75}
                  pagination={{
                    clickable: true,
                    el: '.process',
                    bulletClass: 'dot',
                    bulletActiveClass: 'active'
                  }}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false, // 滑動後仍然自動播放
                  }}
                  breakpoints={{
                    750: {
                      slidesPerView: 2.75,
                    },
                    550: {
                      slidesPerView: 2.5,
                      spaceBetween: 8,
                    },
                    450: {
                      slidesPerView: 1.8,
                      spaceBetween: 8,
                    },
                    0: {
                      slidesPerView: 1.25,
                    },
                  }}
                  className="albumBox"
                >
                  {jobDetail.companyPhoto && jobDetail.companyPhoto.map((photo, index) => (
                    <SwiperSlide key={index}>
                      <img src={photo} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="processBox">
                  <div className="process">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
              <div className="jobContent">
                <span>工作內容</span>
                <div className="content" dangerouslySetInnerHTML={{__html: jobDetail.description}} />
              </div>
            </div>
            )}
          <div className="popUpClose" onClick={() => setIsPopupVisible(false)}>
            <p>關閉</p>
          </div>
        </div>
      </div>
    </div>
      );
}

export default Home;
