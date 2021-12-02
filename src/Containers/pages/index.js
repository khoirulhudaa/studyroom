import React, { Component } from 'react';

import '../assets/style/utama.css';

import Navbar from '../component/navbar';

import img1 from '../assets/images/dekorasi/tree.png';
import img2 from '../assets/images/dekorasi/performance.png';
import img3 from '../assets/images/dekorasi/circle-left.png';
import img4 from '../assets/images/dekorasi/google.png';
import img5 from '../assets/images/dekorasi/circle-new2.png';
import img6 from '../assets/images/dekorasi/experiments.png';

import { register, login } from '../config/redux/actions/index';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class Utama extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    registerSuccess: false,
  }

  componentDidMount() {
   localStorage.removeItem('registerData');
   localStorage.removeItem('dataKelas');

    window.addEventListener('scroll', () => {

      if (window.pageYOffset >= 10) {
        document.getElementById('navbarz').classList.add('animate__fadeInDown');
      } else if (window.pageYOffset < 10) {
        document.getElementById('navbarz').classList.remove('animate__fadeInDown');
      }
    });

    window.addEventListener('scroll', () => {

      if (window.pageYOffset >= 300) {
        document.getElementById('wrap-content1').classList.add('wrap-content-show');
      } else if (window.pageYOffset < 300) {
        document.getElementById('wrap-content1').classList.remove('wrap-content-show');
      }
    });

    window.addEventListener('scroll', () => {

      if (window.pageYOffset >= 800) {
        document.getElementById('sec-3').classList.add('sec-3-show');
      } else if (window.pageYOffset < 800) {
        document.getElementById('sec-3').classList.remove('sec-3-show');
      }
    });

    window.addEventListener('scroll', () => {

      if (window.pageYOffset >= 1300) {
        document.getElementById('star-last').classList.add('star-last-show');
      } else if (window.pageYOffset < 1300) {
        document.getElementById('star-last').classList.remove('star-last-show');
      }
    });

    window.addEventListener('scroll', () => {

      if (window.pageYOffset >= 1700) {
        document.getElementById('sec-4').classList.add('sec-4-show');
      } else if (window.pageYOffset < 1700) {
        document.getElementById('sec-4').classList.remove('sec-4-show');
      }
    });

    window.addEventListener('scroll', () => {

      if (window.pageYOffset >= 2090) {
        document.getElementById('sec-sekilas').classList.add('sec-sekilas-show');
      } else if (window.pageYOffset < 2090) {
        document.getElementById('sec-sekilas').classList.remove('sec-sekilas-show');
      }
    });


    window.addEventListener('scroll', () => {

      if (window.pageYOffset >= 2520) {
        document.getElementById('sec-5').classList.add('sec-5-show');
      } else if (window.pageYOffset < 2520) {
        document.getElementById('sec-5').classList.remove('sec-5-show');
      }
    });

    window.addEventListener('scroll', () => {

      if (window.pageYOffset >= 2880) {
        document.getElementById('sec-footer').classList.add('sec-footer-show');
      } else if (window.pageYOffset < 2880) {
        document.getElementById('sec-footer').classList.remove('sec-footer-show');
      }
    });

    const location = this.props.location.pathname;
    if (location === '/') {
      localStorage.removeItem('dataUserFirestore');
      localStorage.removeItem('loginData');
      localStorage.removeItem('dataKelasStart');
      localStorage.removeItem('dataDetailTugas');
    }

  }


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

  valueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state)
  }

  registers = () => {
    const { register } = this.props;
    const { username, email, password } = this.state;
    const datftar = register({ email, password, username });
    if (datftar) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })

      this.setState({
        username: '',
        email: '',
        password: '',
        registerSuccess: true
      })

    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'Signed in failed'
      })
    }
  }

  login = async (e) => {
    const { email, password } = this.state;
    const { login } = this.props;

    const masuk = await login({ email, password });
    if (masuk) {
      console.log('berhasil')
      setTimeout(() => {
        this.props.history.push('/pilihanKelas')
      }, 500)
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    }
  }

  login2 = async (e) => {
    const { email, password } = this.state;
    const { login } = this.props;

    const masuk = await login({ email, password });
    if (masuk) {
      console.log('berhasil')
      setTimeout(() => {
        this.props.history.push('/semuaKelas')
      }, 500)
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    }
  }

  registerSuccessFunc = () => {
    setTimeout(() => {
      this.setState({
        registerSuccess: false
      })
    }, 2000)
  }

  render() {
    const { btnMode, btnMode2, valueChange, registers, login, login2, registerSuccessFunc } = this;
    const { username, email, password, registerSuccess } = this.state;

    return (
      <div id="body">

        <Navbar />

        <section className="sec-1">
          <div className="content-sec-1" id="content-sec-1">
            <h1>"Edukasi modern bagi seluruh pelajar agar lebih baik dalam menyelesaikan tugas serta lebih dekat dengan tekhnologi saat ini."</h1>
            <p>studyROOM membantu siswa dan pengajar mengorganisir tugas, meningkatkan kolaborasi, dan menumbuhkan komunikasi yang lebih baik.</p>

            <div className="list-bt">
              <a href="#sec-2"><button className="btn btn bt-selengkapnya">Selengkapnya</button></a>
              <button className="btn btn bt-selengkapnya" data-toggle="modal" data-target="#exampleModal3">Buka kelas</button>
            </div>

          </div>
        </section>

        {/* <img src={img1} alt="" className="circle" /> */}

        <section className="sec-2" id="sec-2">

          <div className="wrap-content" id="wrap-content1">

            <div className="contentz">
              <img src={img2} alt="" />
              <h2>Performa baik</h2>
              <p>Kecepatan dalam berbagi file dan tugas antara guru dan murid nya.</p>
            </div>

            <div className="content-left" id="sec-2-litle1">
              <h2>Mencari materi umum disini</h2>
              <button className="btn btn bt-pelajari">Pelajari</button>
              <hr />
              <small>Ikuti selalu informasi terbaru dari studyROOM agar kau tahu banyak hal tentang perkembangan kami.</small>
            </div>

            <div className="content-left" id="sec-2-litle2">
              <h2>Mencari materi umum disini</h2>
              <button className="btn btn bt-pelajari">Pelajari</button>
              <hr />
              <small>Ikuti selalu informasi terbaru dari studyROOM agar kau tahu banyak hal tentang perkembangan kami.</small>
            </div>

          </div>

        </section>

        <img src={img3} alt="" className="circle2" />

        <section className="sec-3" id="sec-3">
          <div className="content-sec-3">
            <h1>"Dapatkanlah lencana sebagai murid teladan, murid terbaik dan murid terunik dari guru mu dikelas."</h1>
            <p>studyROOM membantu siswa dan pengajar mengorganisir tugas, meningkatkan kolaborasi, dan menumbuhkan komunikasi yang lebih baik.</p>
          </div>
          <i className="las la-award"></i>
        </section>

        <section className="start-last" id="star-last">
          <div className="content-start">
            <i class="las la-star"></i>
            <i class="las la-star"></i>
            <i class="las la-star"></i>
            <i class="las la-star"></i>
            <h2>Merasakan hal yang lebih baik</h2>
            <p>Disediakan untuk para guru dan murid melakukan pembelajaran yang kondusif, interaktif dan konukatif secara menyeluruh di setiap sis</p>
          </div>
          <div className="img-star">
            <img src={img6} alt="" />
          </div>
        </section>

        <section className="sec-4" id="sec-4">
          <div className="content">
            <h1>Mengapa harus memilih studyROOM sebagai bahan edukasi bagi guru dan murid.</h1>
            <button className="btn btn bt-pelajari2">Pelajari</button>
          </div>
          <div className="list-icons">
            <div>
              <i className="las la-comments"></i>
              <br />
              <p>Komunikasi </p>
            </div>
            <div>
              <i className="las la-eye"></i>
              <br />
              <p>akses mudah</p>
            </div>
            <div>
              <i className="las la-bell"></i>
              <br />
              <p>notif tugas</p>
            </div>
            <div>
              <i className="las la-history"></i>
              <br />
              <p>Pembiasaan</p>
            </div>
            <div>
              <i className="las la-photo-video"></i>
              <br />
              <p>kirim file</p>
            </div>
            <div>
              <i className="lab la-gratipay"></i>
              <br />
              <p>lencana</p>
            </div>
          </div>
        </section>

        <section className="sec-sekilas" id="sec-sekilas">
          <div className="contents">
            <h1>Semua yang dibutuhkan oleh pengajar dan siswa untuk bekerja lebih baik, bersama-sama</h1>
            <p className="p">Classroom dibuat bersama dengan pengajar untuk membantu mengorganisir tugas sehari-hari, berkomunikasi, dan mendorong kolaborasi yang lebih besar.</p>
          </div>
          <div>
            <div className="effisien">
              <i className="las la-podcast" id="podcast"></i>
              <h3>Effisien kan proses belajar</h3>
              <p>Tingkatkan efisiensi dengan menyalin topik dan tugas dari satu kelas ke kelas lainnya. Anda dapat menyesuaikan sesuai kebutuhan dan memposting ke bagian lain atau kelas baru.</p>
              <a href="Pelajari caranya"></a>
            </div>
          </div>
        </section>

        <section className="sec-5" id="sec-5">
          <div>
            <h2><i className="las la-link"></i>Beri masukan yang lebih baik dengan cepat menggunakan bank komentar</h2>
            <p></p>
          </div>
          <div>
            <h2><i className="las la-link"></i>Posting, beri komentar, dan fasilitasi diskusi kelas</h2>
            <p></p>
          </div>
          <div>
            <h2><i className="las la-link"></i>Kelola dan lihat wali, siswa, dan rekan pengajar di halaman Orang</h2>
            <p></p>
          </div>
          <div>
            <h2><i className="las la-link"></i>Tugaskan dan beri nilai tugas dengan aman.</h2>
            <p></p>
          </div>
        </section>

        <section className="sec-footer" id="sec-footer">
          <div>
            <img src={img4} alt="" className="logo-footer" />
          </div>
          <div>
            <ul>
              <li>Developer email: webdesainnn@gmail.com</li>
              <li>Contact Darurat: 089513093406 (IND)</li>
              <li>Materi Premium : <button className="btn btn bt-lihat">Lihat</button></li>
            </ul>
          </div>
          <img src={img5} alt="" className="circle-footer" />
        </section>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Bergabung - studyROOMS</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={registers}>
                  <div className="form-group">
                    <label for="recipient-name" className="col-form-label">Username Baru</label>
                    <input type="text" name="username" value={username} className="form-control" id="recipient-name" onChange={valueChange} />
                  </div>
                  <div className="form-group">
                    <label for="message-text" className="col-form-label">Email</label>
                    <input type="email" name="email" value={email} className="form-control" id="recipient-name" onChange={valueChange} />
                  </div>
                  <div className="form-group">
                    <label for="message-text" className="col-form-label">Password</label>
                    <input type="password" name="password" value={password} className="form-control" id="recipient-name" onChange={valueChange} />
                  </div>
                </form>
              </div>
              {
                registerSuccess === false ? (
                  <div className="modal-footer">
                    <button type="button" className="btn btn bt-batal" data-dismiss="modal">Batal</button>
                    <button type="submit" onClick={registers} className="btn btn bt-kirim">Kirim sekarang</button>
                  </div>
                ) :
                  <div className="modal-footer">
                    <button type="submit" onClick={registerSuccessFunc} className="btn btn bt-kirim" data-dismiss="modal">Kembali</button>
                  </div>
              }
            </div>
          </div>
        </div>


        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Masuk - studyROOMS</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="message-text" className="col-form-label">Email</label>
                    <input type="email" name="email" value={email} className="form-control" id="recipient-name" onChange={valueChange} />
                  </div>
                  <div className="form-group">
                    <label for="message-text" className="col-form-label">Password</label>
                    <input type="password" name="password" value={password} className="form-control" id="recipient-name" onChange={valueChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn bt-batal" data-dismiss="modal">Batal</button>
                <button type="submit" onClick={login} className="btn btn bt-kirim">Kirim sekarang</button>
              </div>
            </div>
          </div>
        </div>


        <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Masuk - semua kelas</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="message-text" className="col-form-label">Email</label>
                    <input type="email" name="email" value={email} className="form-control" id="recipient-name" onChange={valueChange} />
                  </div>
                  <div className="form-group">
                    <label for="message-text" className="col-form-label">Password</label>
                    <input type="password" name="password" value={password} className="form-control" id="recipient-name" onChange={valueChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn bt-batal" data-dismiss="modal">Batal</button>
                <button type="submit" onClick={login2} className="btn btn bt-kirim">Kirim sekarang</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

// const getStateRedux = (state) => {
//   return {
//       order: state.orderGrab,
//   }
// }

const getActionRedux = (dispatch) => {
  return {
    register: (data) => dispatch(register(data)),
    login: (data) => dispatch(login(data))
  }
}

export default connect(null, getActionRedux)(Utama);

