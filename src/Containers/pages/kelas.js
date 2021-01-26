import React from 'react';
import Swal from 'sweetalert2';
import Navbar from '../component/navbar';
import {Spinner} from 'reactstrap';
import '../assets/style/kelas.css';
import { getDataKelas, addKelasStart } from '../config/redux/actions';
import { connect } from 'react-redux';
import { NavigationExpandLess } from 'material-ui/svg-icons';
import ClipboardJS from 'clipboard';

class Kelas extends React.Component {

    // Tips Edukasi Pelanggan dari Handbinn Goods
    // <iframe width="560" height="315" src="https://www.youtube.com/embed/icdrbHXo64I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    // Pandemi Corona Virus (COVID-19): Apa Yang Bisa Kita Lakukan?
    // <iframe width="560" height="315" src="https://www.youtube.com/embed/_ci23XLATnQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    // BERUBAH - Film Pendek (Short Movie) Kemendikbud 2017
    // Pandemi Corona Virus (COVID-19): Apa Yang Bisa Kita Lakukan?

    state = {
        kode: '',
        init: 'a',
        nama_kelas: '',
        nama_mapel: '',
        kode_kelas: '',
        id_guru: '',
        nama_guru: '',
        id_murid: '',
        tunggu: 'Tunggu, Kelas sedang proses disimpan...',
    }

    componentDidMount = () => {

        var results = '';
        var characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZatuvwxyz123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 5; i++) {
            results += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        this.setState({
            id_guru: results
        })
        
        const {getDataKelas, addKelasStart} = this.props;

        getDataKelas();
        const kodeAktif = JSON.parse(localStorage.getItem('dataKelas'));

        setTimeout(() => {
            if(kodeAktif.id_murid === true) {
                
            const kodeAktif = JSON.parse(localStorage.getItem('dataKelas'));
            const nama_email = JSON.parse(localStorage.getItem('dataUserFirestore'))
            const dataLogin = JSON.parse(localStorage.getItem('loginData'));
            
            const id_status = 'murid';
            const id_guru = kodeAktif.id_guru;
            const email_murid = dataLogin.email;
            const nama_murid = nama_email.nama;
            const nama_kelas = kodeAktif.nama_kelas;
            const kode_kelas = kodeAktif.kode_kelas;
            const nama_guru = kodeAktif.nama_guru;
            const bagian_materi = kodeAktif.bagian_materi;
            const pendidikan = kodeAktif.pendidikan;
            const lencana1 = kodeAktif.lencana1;
            const lencana2 = kodeAktif.lencana2;
            const lencana3 = kodeAktif.lencana3;
        
            const start = addKelasStart({id_status, email_murid, nama_murid, nama_kelas, kode_kelas, nama_guru, bagian_materi, id_guru, pendidikan, lencana1, lencana2, lencana3 });
            
            if(start) {
                      setTimeout(() => {
                        this.setState({
                            tunggu: 'Sekarang, Kelas telah tersimpan...'
                          })
                    }, 2000)
                }
    
            setTimeout(() => {
                if(start) {
                      setTimeout(() => {
                        this.setState({
                            tunggu: 'Sekarang, masuk kelas ini tanpa kode kelas...'
                        })
                      },4000)
                }

                setTimeout(() => {
                    this.props.history.push('/semuaKelas')
                }, 6000)

                setTimeout(() => {
                    window.location.reload();
                }, 6600)
                
            }, 3000)
    
        }else {

            const nama_email = JSON.parse(localStorage.getItem('dataUserFirestore'));
            const dataLogin = JSON.parse(localStorage.getItem('loginData'));
            const kodeAktif = JSON.parse(localStorage.getItem('dataKelas'));

            const id_status = 'guru';
            const email_murid = dataLogin.email;
            const id_guru =kodeAktif.id_guru;
            const nama_murid = nama_email.nama;
            const nama_kelas = kodeAktif.nama_kelas;                                                                               
            const kode_kelas = kodeAktif.kode_kelas;
            const nama_guru = kodeAktif.nama_guru;
            const bagian_materi = kodeAktif.bagian_materi;
            const lencana1 = kodeAktif.lencana1; 
            const lencana2 = kodeAktif.lencana2;
            const lencana3 = kodeAktif.lencana3;
        
            const start = addKelasStart({id_status, id_guru, email_murid, nama_murid, nama_kelas, kode_kelas, nama_guru, bagian_materi, lencana1, lencana2, lencana3 });
                if(start) {
                      setTimeout(() => {
                          this.setState({
                              tunggu: 'Sekarang, Kelas telah tersimpan...'
                            })
                      }, 2000)
                }
            
            setTimeout(() => {
                if(start) {
                    setTimeout(() => {
                        this.setState({
                            tunggu: 'Sekarang, masuk kelas ini tanpa kode kelas...'
                          })
                      }, 4000)
                }

                setTimeout(() => {
                    this.props.history.push('/semuaKelas')
                }, 6000)
    
                setTimeout(() => {
                    window.location.reload();
                }, 6600)

            },3000)


        } 
    }, 3000)
}

    render() {

        const {copyText, hideNotif} = this;
        const {kode, nama_kelas, nama_mapel, nama_guru, kode_kelas, id_guru, id_murid, tunggu} = this.state;
        console.log(this.state)

        return (
            <div>

                <div className="proses" id="proses">
                    <div className="content-proses">
                    <i className="las la-cloud-upload-alt"></i>
                    <i className="las la-hdd"></i>
                    <i className="las la-cloud-download-alt"></i>
                    <h2>{tunggu}</h2>
                    <br />
                    <Spinner className="spinner" />
                    </div>
                </div>

            </div>
        )
    }
}

const getActionRedux = (dispatch) => {
    return {
        getDataKelas: (data) => dispatch(getDataKelas(data)),
        addKelasStart: (data) => dispatch(addKelasStart(data)),
    }
}

const getStateRedux = (state) => {
    return {
        dataKelas: state.dataKelas
    }
}

export default connect(getStateRedux, getActionRedux)(Kelas);