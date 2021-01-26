import React from 'react';
import '../assets/style/navbar.css';

class Navbar extends React.Component {
    btnMode = () => {
        document.getElementById('body').classList.remove('body-dark');
        document.getElementById('navbarz').classList.remove('navbarz-dark')
        document.getElementById('content-sec-1').classList.remove('text-white')
        document.getElementById('sec-2-litle1').classList.remove('sec-2-litle1-dark')
        document.getElementById('sec-2-litle2').classList.remove('sec-2-litle2-dark')
        document.getElementById('sec-3').classList.remove('sec-3-dark')
        document.getElementById('sec-4').classList.remove('sec-4-dark')
        document.getElementById('sec-sekilas').classList.remove('sec-sekilas-dark')
        document.getElementById('sec-footer').classList.remove('sec-footer-dark')
        document.getElementById('podcast').classList.remove('text-white')
        document.getElementById('star-last').classList.remove('star-last-dark')
      }
    
      btnMode2 = () => {
        document.getElementById('body').classList.add('body-dark');
        document.getElementById('navbarz').classList.add('navbarz-dark')
        document.getElementById('content-sec-1').classList.add('text-white')
        document.getElementById('sec-2-litle1').classList.add('sec-2-litle1-dark')
        document.getElementById('sec-2-litle2').classList.add('sec-2-litle2-dark')
        document.getElementById('sec-3').classList.add('sec-3-dark')
        document.getElementById('sec-4').classList.add('sec-4-dark')
        document.getElementById('sec-sekilas').classList.add('sec-sekilas-dark')
        document.getElementById('sec-footer').classList.add('sec-footer-dark')
        document.getElementById('podcast').classList.add('text-white')
        document.getElementById('star-last').classList.add('star-last-dark')
      }
  render() {
      const {btnMode, btnMode2, valueChange, registers, login} = this;
    return (

    <div>

      <div className="navbarz" id="navbarz">
        <div className="brands">
        <a href="file:///C:/Users/-/Documents/prototype/index.html" className="animate__animated animate__jello animate__repeat-2"><h2>studyROOMs</h2></a>
        </div>
        <div className="btn-wrap">
          <div className="mode wrp" id="mode">
            <div className="btn-mode" onClick={btnMode} id="btn-mode">
              <i className="las la-sun"></i>
            </div>
            <div className="btn-mode2" onClick={btnMode2} id="btn-mode2">
              <i className="las la-cloud-moon"></i>
            </div>
          </div>
          <button className="btn btn bt1 bt-regis" data-toggle="modal" data-target="#exampleModal">Register</button>
          <button className="btn btn bt1 bt-masuk" data-toggle="modal" data-target="#exampleModal2">Buat/gabung kelas baru</button>
        </div>
      </div>

      </div>
    )
  }
}

export default Navbar;

  