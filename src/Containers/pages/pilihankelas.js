import React from 'react';
import { addKelasBaru, getDataKelas } from '../config/redux/actions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import {Spinner} from 'reactstrap';

// import img1 from '../assets/images/dekorasi/circle-left.png';
// import img2 from '../assets/images/dekorasi/circle-new2.png';

import '../assets/pilihan.css';
import '../assets/js/pilihankelas.js';

class PilihanKelass extends React.Component {

    state = {
        nama_guru: '',
        nama_kelas: '',
        bagian_materi: '',
        id_guru: '',
        id_murid: '',
        kode_kelas: '',
        id_guruNull: '',
        id_status: '',
        kode_kelasNull: '',
        data_kode: [],
        data_palsu: [],
        errorKode: '',
        errorKodeGuru: '',
        identifierUser: true,
        colorButton: true,
        namaGuruError: '',
        namaKelasError: '',
        pendidikan: '',
        nama_pendidikanError: ''
    }

    componentDidMount() {

        const { getDataKelas } = this.props;
        getDataKelas();

        console.log('kumpulan kode kelas2', this.props.dataKelas);


        const { id_guru, kode_kelas } = this.state;

        var results = '';
        var characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZatuvwxyz123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 5; i++) {
            results += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log('id_guru :', results);

        this.setState({
            id_guru: results
        })

        var results1 = '';
        var characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZatuvwxyz123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 5; i++) {
            results1 += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log('id_murid :', results1);

        this.setState({
            id_murid: results1
        })

        var results2 = '';
        var characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZatuvwxyz123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 6; i++) {
            results2 += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log('kode_kelas :', results2);

        this.setState({
            kode_kelas: results2
        })

        this.setState({
            data_kode: this.props.dataKelas
        })


    }

    valueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validation = () => {
        const {nama_guru, nama_kelas, pendidikan, bagian_materi, namaKelasError, namaGuruError} = this.state;

        if(!nama_guru.length) {
            this.setState({
                namaGuruError: 'Nama guru harus terisi!'
            })
            return false;
        }else if(nama_guru.length) {
            this.setState({
                namaGuruError: ''
            })
        }

        if(!nama_kelas.length) {
            this.setState({
                namaKelasError: 'Nama kelas harus terisi!'
            })
            return false;
        }else if(nama_kelas.length) {
            this.setState({
                namaKelasError: ''
            })
        }

        if(!pendidikan.length) {
            this.setState({
                nama_pendidikanError: 'Tingkat pendidikan harus terisi!'
            })
            return false;
        }else if(pendidikan.length) {
            this.setState({
                nama_pendidikanError: ''
            })
        }

        return true

    }

    tambahkelas = () => {
        const validation = this.validation();

        if(validation) {

            const { addKelas } = this.props;
            const { id_guru, kode_kelas, nama_guru, nama_kelas, bagian_materi, pendidikan } = this.state;
    
            const dataKelas = {
                id_teacher: id_guru,
                code_class: kode_kelas,
                name_teacher: nama_guru,
                name_class: nama_kelas,
                part_study: bagian_materi,
                pendidikan: pendidikan,  
                lencana1: '',
                lencana2: '',
                lencana3: '',
            }
    
            const addRoom = addKelas({ dataKelas })
            if (addRoom) {
    
                const data = {
                    id_murid: false,
                    id_guru: id_guru,
                    nama_guru: nama_guru,
                    kode_kelas: kode_kelas,
                    nama_kelas: nama_kelas,
                    bagian_materi: bagian_materi,
                    pendidikan: pendidikan,
                    lencana1: '',
                    lencana2: '',
                    lencana3: '',
                }
                localStorage.setItem('dataKelas', JSON.stringify(data));

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 10000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: `Kelas ${nama_kelas} sedang disiapkan`
                  })

                  setTimeout(() => {
                      this.props.history.push('/kelas');
                }, 1000)

            } else {
                console.log('kesalahan terjadi')
            }
    
        }
      
    }

    cekKodeKelas = (e) => {
  
        e.preventDefault();

        const { kode_kelasNull, id_guruNull, identifierUser, colorButton } = this.state;

        const characters = this.props.dataKelas;

        for (var i = 0; i < characters.length; i++) {
                if (kode_kelasNull === this.props.dataKelas[i].data.kode_Kelas) {
                    
                    const datas = {
                        id_murid: true,
                        nama_guru: this.props.dataKelas[i].data.nama_guru,
                        id_guru: this.props.dataKelas[i].data.id_guru,
                        kode_kelas: this.props.dataKelas[i].data.kode_Kelas,
                        nama_kelas: this.props.dataKelas[i].data.nama_kelas,
                        nama_mapel: this.props.dataKelas[i].data.nama_mapel,
                        bagian_materi: this.props.dataKelas[i].data.bagian_materi,
                        pendidikan: this.props.dataKelas[i].data.pendidikan,
                        lencana1: '',
                        lencana2: '',
                        lencana3: '',
                    }

                    const idGuru = {
                        id_guru: this.props.dataKelas[i].data.id_guru,
                    }

                    console.log(`nama ada yang sesuai seperti ${kode_kelasNull}`)

                    setTimeout(() => {
                        localStorage.setItem('dataKelas', JSON.stringify(datas))
                        localStorage.setItem('id_guru', JSON.stringify(idGuru))
                    }, 300)

                    setTimeout(() => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2200,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'success',
                        title: `Kode kelas sesuai`
                      })
                    }, 400)

                    setTimeout(() => {
                        this.props.history.push('/kelas')
                    }, 2300)

                } else {

                    this.setState({
                        errorKodeGuru: 'salah satu data tak sesuai'
                    })
                }
            }

    }

    guru = (e) => {
        e.preventDefault();

        this.setState({
            identifierUser: true,
            errorKode: '',
            colorButton: true
        })

    }

    murid = (e) => {
        e.preventDefault();

        this.setState({
            identifierUser: false,
            errorKodeGuru: '',
            colorButton: false
        })

    }

    render() {


        const { tambahkelas, valueChange, cekKodeKelas, guru, murid } = this;
        const { nama_guru, nama_kelas, bagian_materi, kode_kelas, errorKode, errorKodeGuru, id_guru, identifierUser, id_guruNull, kode_kelasNull, colorButton, namaKelasError, nama_pendidikanError, namaGuruError, pendidikan } = this.state;
        console.log('JUMLAH KELAS:',this.props.dataKelas.length)
        console.log('JUMLAH KELAS2:',this.props.dataKelas)


        return (
            <div>

                <div className="card-langkah-1">
                    <h3 id="hasil-output"></h3>
                    <div className="contentz">
                        <h2>Jadilah orang yang berkontribusi dikelas</h2>
                        <small>Komunikasi, akses mudah dan free</small>
                    </div>
                    <hr />
                    <div className="list-button">
                        <button className="btn btn bt-langkah" data-toggle="modal" data-target="#exampleModal">Buat Kelas Baru</button>
                        <br />
                        <button className="btn btn bt-langkah" data-toggle="modal" data-target="#exampleModal2">Gabung kelas</button>
                    </div>

                    <small>studyROOMS tempat belajar modern</small>
                </div>

                <div className="modal fade mdl" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex">
                                <h5 className="modal-title" id="exampleModalLabel">Buat Kelas Sebagai :</h5>
                                <div className="list-button2">
                                    <button className="btn btn bt-masuks bt-masuks2">Guru</button>
                                </div>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Nama guru (wajIb)</label>
                                        <br />
                                        <input type="text" name="nama_guru" value={nama_guru} className="form-controls" onChange={valueChange} />
                                        <small style={{color: 'red'}}>{namaGuruError}</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Nama Kelas (wajIb)</label>
                                        <br />
                                        <input type="text" name="nama_kelas" value={nama_kelas} className="form-controls" onChange={valueChange} />
                                        <small style={{color: 'red'}}>{namaKelasError}</small>
                                    </div>
                                    <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label label">Mata pelajaran</label>
                                <select name="pendidikan" value={pendidikan} className="form-control" onChange={valueChange}>
                                    <option value="#">Tingkat pendidikan</option>
                                    <option value="SD">SD</option>
                                    <option value="SMP">SMP</option>
                                    <option value="SMK">SMK</option>
                                    <option value="SMA">SMA</option>
                                    <option value="Perguruan tinggi">Perguruan tinggi</option>
                                </select>
                                <small style={{ color: 'red' }}>{nama_pendidikanError}</small>
                            </div>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Bagian materi</label>
                                        <br />
                                        <input type="text" name="bagian_materi" value={bagian_materi} className="form-controls" onChange={valueChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn bt-batal" data-dismiss="modal">Batal</button>
                                <button type="submit" onClick={tambahkelas} className="btn btn bt-kirim">Kirim sekarang</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gabung Kelas */}
                <div className="modal fade mdl" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex">
                                <h5 className="modal-title" id="exampleModalLabel">Gabung Kelas Sebagai :</h5>
                                <div className="list-button2">
                                    <button className="btn btn bt-masuks bt-masuks2">Murid</button>
                                </div>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="message-text" className="col-form-label">Kode Kelas</label>
                                            <br />
                                            <input type="text" name="kode_kelasNull" value={kode_kelasNull} className="form-controls" id="recipient-name" onChange={valueChange} />
                                            <p style={{ color: 'red', position: 'relative', marginTop: 10 }}>{errorKode}</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn bt-batal" data-dismiss="modal">Batal</button>
                                <button type="button" onClick={cekKodeKelas} className="btn btn bt-kirim">Kirim sekarang</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const getActionRedux = (dispatch) => {
    return {
        addKelas: (data) => dispatch(addKelasBaru(data)),
        getDataKelas: (data) => dispatch(getDataKelas(data))
    }
}

const getStateRedux = (state) => {
    return {
        dataKelas: state.dataKelas
    }
}

export default connect(getStateRedux, getActionRedux)(PilihanKelass);




