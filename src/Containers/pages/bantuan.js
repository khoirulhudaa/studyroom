import React from 'react';
import '../assets/style/bantuan.css';
import { addPertanyaan } from '../config/redux/actions';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';

class Bantuan extends React.Component {

    state = {
        id_status: '',
        pertanyaan: ''
    }

    componentDidMount = () => {

        window.addEventListener('scroll', () => {
            
            if(window.pageYOffset >= 1240) {
                document.getElementById('bertanya').classList.add('animate__headShake');
            } else if (window.pageYOffset < 1240){
                document.getElementById('bertanya').classList.remove('animate__headShake');
            }
        });

        const kodeAktif = JSON.parse(localStorage.getItem('dataKelasStart'));
        const id_gurus = JSON.parse(localStorage.getItem('dataKelasStart'));

        this.setState({
            nama_kelas: kodeAktif.nama_kelas,
            nama_mapel: kodeAktif.nama_mapel,
            kode_kelas: kodeAktif.kode_kelas,
            id_guru: kodeAktif.id_guru,
            nama_guru: kodeAktif.nama_guru,
            id_murid: kodeAktif.id_murid,
            id_status: id_gurus.id_status
        })
  
    }

    valueChanged = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    talk = () => {
        document.getElementById('bertanya').classList.add('animate__headShake');

        setTimeout(() => {
            document.getElementById('bertanya').classList.remove('animate__headShake');
        }, 1000)
    }

    kirimPertanyaan = async(e) => {
        e.preventDefault();
        const {addPertanyaan} = this.props;
        const {pertanyaan} = this.state;
        const dataKelas = JSON.parse(localStorage.getItem('dataKelas'));
        const dataKelas2 = JSON.parse(localStorage.getItem('dataKelasStart'));
        
        const datas = {
            nama: dataKelas2.nama_murid,
            email: dataKelas2.email_murid,
            isi_pertanyaan: pertanyaan,
            kode_kelas: dataKelas.kode_kelas,
            nama_kelas: dataKelas.nama_kelas
        }

        const send = addPertanyaan({datas});

        if(send) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Pertanyaan terkirim'
            })

            this.setState({
                pertanyaan: ''
            })

        }else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'warning',
                title: 'Pertanyaan gagal terkirim'
            })
        }
    }

    render () {

        const {talk, kirimPertanyaan, valueChanged} = this;
        const {id_status, pertanyaan} = this.state;

        return (
            <div>

            <section className="navbar">
                <div>
                    <a href="/"><h2>studyROOMS - lIVE</h2></a>
                </div>
                <div>
                    <ul>
                        <a href="/kelasStart"><li>Forum Kelas</li></a>
                        {
                            id_status === 'guru' ? (
                                <a href="/tugas"><li>Tugas Kelas</li></a>
                            ) : null
                        }
                        {
                            id_status === 'guru' ? (
                                <a href="/nilai"><li>Penilaian</li></a>
                            ) : null
                        }
                        {
                            id_status === 'guru' ? (
                                <a href="/dataMurid"><li>Data murid</li></a>
                            ) : null
                        }
                        <a href="/bantuan"><li style={{backgroundColor: 'rgb(96, 13, 230)', color: 'white'}}>Pusat Bantuan</li></a>
                    </ul>
                </div>
            </section>

            <section className="sec-tugas-img animate__animated animate__fadeInLeftBig animated__delay-1s">
                <div className="list-bantuan">
                    <h3>Tugas terbaru</h3>
                    <ul>
                        <li><i className="las la-info"></i> Pendaftaran</li>
                        <li><i className="las la-leaf"></i> Penggunaan</li>
                        <li><i className="las la-comments"></i> Pertanyaan</li>
                    </ul>
                </div>
                <div className="img-swipper3">
                    <h2>Konsultasi dan dapatkan solusi anda untuk studyROOMS disini</h2>
                    <button className="btn btn bt-tugasz" onClick={talk}>Buat pertanyaan</button>
                </div>
            </section>    
            
            <section className="sec-input animate__animated" id="bertanya">
                <input type="text" className="form-control" name="pertanyaan" value={pertanyaan} onChange={valueChanged} style={{border: 'none', outline: 'none'}} placeholder="Ketikan pertanyaan atau komentar..." />
                <button className="submit" onClick={kirimPertanyaan}><i className="lab la-telegram"></i></button>
            </section>

            <section className="wrap-sec-1">

            <section className="penggunaan" id="Penggunaan">
                <div className="icons-bantuan">
                    <i className="lab la-whatsapp"></i>
                </div>
                <div className="contentx">
                    <h3>Bertanya lewat Whatsapp</h3>
                    <a href="https://wa.me/6289513093406?text=Hay%2C%20saya%20ingin%20berkonsultasi%20seputar%20studyROOMS.">
                      <button className="btn btn bt-pelajari1">Bertanya</button>
                    </a>
                </div>
            </section>

            <section className="pertanyaan" id="Pertanyaan">
                <div className="icons-bantuan">
                    <i className="las la-comment-dots"></i>
                </div>
                <div className="contentx">
                    <h3>Pertanyaan umum di studyROOMS</h3>
                      <button className="btn btn bt-pelajari1" data-toggle="modal" data-target="#exampleModal">Lihat</button>
                </div>
            </section>

            </section>


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">FAQ</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                     <div class="accordion" id="accordionExample">
                        <div class="card vf">
                            <div class="card-header" id="headingOne">
                            <h2 class="mb-0">
                                <button class="btn btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                 Cara bergabung dalam kelas via classcode - murid
                                </button>
                            </h2>
                            </div>

                            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                            </div>
                        </div>
                        <div class="card vf">
                            <div class="card-header" id="headingTwo">
                            <h2 class="mb-0">
                                <button class="btn btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                 Cara membuat kelas baru - guru
                                </button>
                            </h2>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div class="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                            </div>
                        </div>
                        <div class="card vf">
                            <div class="card-header" id="headingThree">
                            <h2 class="mb-0">
                                <button class="btn btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                 Cara membuat tugas baru - guru
                                </button>
                            </h2>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div class="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                </div>
                </div>
            </div>
            </div> 
           
            <section className="ss">

            </section>

            </div>
        )
    }
}

const getActionRedux = (dispatch) => {
    return {
        addPertanyaan : (data) => dispatch(addPertanyaan(data))
    }
}

export default connect(null, getActionRedux)(Bantuan);