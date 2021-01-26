import React from 'react';
import '../assets/style/listKelas.css';
import {getDataKelasStart, getDataFirestoreMurid} from '../config/redux/actions';
import {connect} from 'react-redux';

class listKelas extends React.Component{
            
    state = {
        email: ''
    }

    componentDidMount() {

        const {getDataKelasStart} = this.props;
        getDataKelasStart();

        const emailMurid =JSON.parse(localStorage.getItem('loginData'));
        this.setState({
            email: emailMurid.email
        })
    }

    masuKelas = (data1, data2, data3, data4, data5, data6, data7, data8, data9, data10) => {
        
        const datas = {
            nama_kelas: data1,
            kode_kelas: data2,
            nama_guru: data3,
            id_status: data4,
            id_guru: data5,
            bagian_materi: data6,
            nama_murid: data7,
            email_murid: data8,
            pendidikan: data9,
            lencana2: data10
        }

        localStorage.setItem('dataKelasStart', JSON.stringify(datas))

        setTimeout(() => {
            this.props.history.push('/kelasStart');
        }, 500)

    }

    render () {
        const {masuKelas} = this;
        console.log('data kelas :', this.props.semuaKelas)
        console.log('email saya :', this.state.email)
        return (
            <div>

                <section className="navbar2s">
                    <div>
                        <a href="/kelas"><h2>studyROOMS - Semua kelas</h2></a>
                    </div>
                    <div>
                        <a href="/"><button className="btn-keluar-listKelas">keluar</button></a>
                    </div>
                </section>

                <section className="sec-tugas-img animate__animated animate__fadeInLeftBig animated__delay-1s">
                    <div className="list-bantuan">
                        <h3>Daftar kelas</h3>
                        <ul>
                            <li><i className="las la-eye"></i> Lihat kelas</li>
                            <li><i className="las la-eye"></i> Aturan kelas</li>
                            <li><i className="las la-eye"></i> Jumlah kelas</li>
                        </ul>
                    </div>
                    <div className="img-swipper">
                        <h2>Semua daftar kelas yang dapat diakses tanpa memasukan kode kelas</h2>
                        <button className="btn btn bt-tugasz">Tambah kelas</button>
                    </div>
                </section>    

                <section className="title-tugas-all">
                    <h3>Telah bergabung dalam kelas ini :</h3>
                </section>

                <section className="listKelasCard">

                    <div className="card-kelas-2-empty">
                        <div className="content-kelas-2-empty">
                            <a href ="/pilihanKelas"><h2><i className="las la-plus"></i></h2></a>
                            <h5 className="p-kosong-empty">Tambah kelas baru</h5>
                        </div>
                    </div>

                    {
                        this.props.semuaKelas.length ? (
                            this.props.semuaKelas.map((data, index) => {
                                if(data.data.email_murid === this.state.email) {
                                    return (
                                    <div className="card-kelas" key={index}>                                  
                                        <div className="logo-kelas">
                                            <p>{data.data.id_status}</p>
                                        </div>
                                        <div className="content-kelas">
                                            <h4>{data.data.nama_kelas} - {data.data.kode_kelas}</h4>
                                            <br />
                                            <small>{data.data.nama_guru}</small>
                                            <br />
                                            <button className="btn btn bt-gabung" onClick={() => masuKelas(data.data.nama_kelas, data.data.kode_kelas, data.data.nama_guru, data.data.id_status, data.data.id_guru, data.data.bagian_materi, data.data.nama_murid, data.data.email_murid, data.data.pendidikan, data.data.lencana2)}>Gabung kelas</button>
                                        </div>
                                    </div>
                                    )
                                } 
                            })
                        ): null
                    }
                    
                </section>

            </div>
        )
    }
}

const getActionRedux = (dispatch) => {
    return {
        getDataKelasStart : (data) => dispatch(getDataKelasStart(data)),
    }
}

const getStateRedux = (state) => {
    return {
        semuaKelas: state.semuaKelas
    }
}

export default connect(getStateRedux, getActionRedux)(listKelas);