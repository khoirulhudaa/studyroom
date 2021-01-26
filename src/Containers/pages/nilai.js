import React from 'react';
import ReactToExcel from 'react-html-table-to-excel';
import { getDataTugasKirim, addDataNilai, updateNilaiTUgas, getDataKelasStart, getDataNilai, getDataTugas, getDataNilai2, addDataNilai2, deleteNilai } from '../config/redux/actions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import ListMapel2 from './listMapel2';
import ListJudulTugas from '../component/listJudulTugas';
import '../assets/style/nilai.css';

class Nilai extends React.Component {

    state = {
        nilai_tugas: '',
        nama_mapel: '',
        nama_murid: '',
        nama_mapel_list: '',
        judul_tugas_List: '',
        judul_tugas: '',
        baris: '',
        no: 0.00,
        nama_kelas_list: '',
        kode_kelas: '',
        id_guru2: '',
        detect: false,
        aid: ''
    }

    componentDidMount() {

        const namaKelas = JSON.parse(localStorage.getItem('dataKelasStart'));

        this.setState({
            nama_kelas_list: namaKelas.nama_kelas,
            kode_kelas: namaKelas.kode_kelas,
            id_guru2: namaKelas.id_guru
        })

        const { getDataTugasKirim, getDataNilai, getDataNilai2, getDataKelasStart, getDataTugas } = this.props;
        getDataTugasKirim();
        getDataNilai();
        getDataNilai2();
        getDataKelasStart();
        getDataTugas();
        console.log('data tugas terkirim :', this.props.tugasKelasKirim)

        this.state.no = 1;

    }

    valueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    masukanNilai = async (data1) => {

        const { addDataNilai, addDataNilai2 } = this.props;
        const datas = JSON.parse(localStorage.getItem('dataKelasStart'));
        const dataz = {
            nama_mapel: this.state.nama_mapel_list,
            judul_tugas: this.state.judul_tugas,
            kode_kelas: datas.kode_kelas,
            id_guru: datas.id_guru,
            nama_murid: this.state.nama_murid,
            nama_guru: datas.nama_guru,
            nilai_tugas: this.state.nilai_tugas,
        }

        const data = await addDataNilai({ dataz });
        const data2 = await addDataNilai2({ dataz });

        if (data && data2) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: `Nilai untuk ${this.state.nama_murid} telah masuk`
            })

            this.setState({
                nama_mapel_list: '',
                judul_tugas: '',
                nilai_tugas: ''
            })

        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'warning',
                title: `Nilai untuk ${this.state.nama_murid} gagal masuk`
            })
        }
    }

    deleteNilais = async (datas) => {
        const { deleteNilai } = this.props;

        const data = {
            aid: datas.id
        }

        const hapus = await deleteNilai(data);

        if (hapus) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: `Nilai untuk ${data.data.nama_murid} telah dihapus`
            })
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'warning',
                title: `Nilai untuk ${data.data.nama_murid} gagal dihapus`
            })
        }
    }

    batalUpdateNilai = () => {
        this.setState({
            nama_murid: '',
            nama_mapel_list: '',
            judul_tugas: '',
            nilai_tugas: '',
            detect: false,
            aid: ''
        })
    }

    masukanDataUpdateNilai = (data0, data1, data2, data3, data4) => {
        this.setState({
            aid: data0,
            nama_murid: data1,
            nama_mapel_list: data2,
            judul_tugas: data3,
            nilai_tugas: data4,
            detect: true
        })
        window.addEventListener('scroll', () => {
            const scrollTops = 0;
            window.scrollTo = scrollTops;
        });
    }

    updateNilai = async (data1, data2, data3, data4) => {
        const { updateNilaiTUgas } = this.props;
        const {aid, nama_murid, nama_mapel_list, judul_tugas, nilai_tugas} = this.state;

        const dataKelas = JSON.parse(localStorage.getItem('dataKelasStart'));

        const dataTugas = {
            aid: aid,
            nama_mapel: nama_mapel_list,
            judul_tugas: judul_tugas,
            kode_kelas: dataKelas.kode_kelas,
            id_guru: dataKelas.id_guru,
            nama_murid: nama_murid,
            nama_guru: dataKelas.nama_guru,
            nilai_tugas: nilai_tugas,
            detect: false
        }

        const datax = updateNilaiTUgas({ dataTugas });
        if (datax) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: `Nilai sudah diperbarui`
            })

            this.setState({
                nama_murid: '',
                nama_mapel: '',
                judul_tugas: '',
                nilai_tugas: '',
                detect: false
            })

        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'warning',
                title: `Nilai gagal diperbarui`
            })
        }

    }

    render() {

        const { valueChange, masukanNilai, deleteNilais, updateNilai, masukanDataUpdateNilai, batalUpdateNilai } = this;
        const { nilai_tugas, nama_mapel, nama_murid, judul_tugas, nama_mapel_list, judul_tugas_list, nama_kelas_list, kode_kelas, id_guru2, detect } = this.state;
        console.log('data nilai terkirim :', this.props.listNilaiTugas)

        return (
            <div>

                <section className="navbar">
                    <div>
                        <a href="/"><h2>studyROOMS - lIVE</h2></a>
                    </div>
                    <div>
                        <ul>
                            <a href="/kelasStart"><li>Forum Kelas</li></a>
                            <a href="/tugas"><li>Tugas Kelas</li></a>
                            <a href="/nilai"><li style={{ backgroundColor: 'rgb(96, 13, 230)', color: 'white' }}>Penilaian</li></a>
                            <a href="/dataMurid"><li>Data murid</li></a>
                            <a href="/bantuan"><li>Pusat Bantuan</li></a>
                        </ul>
                    </div>
                </section>

                <section className="sec-tambah-tugas2">
                    <div className="content-tugas">
                        <h2>Berikan nilai sesuai hasil belajar murid</h2>
                        <p>Masukan nilai tugas sekolah murid yang telah diberikan kepadanya sesuai denga hasil kerjanya selama ini</p>
                        {
                            detect === false ? (
                                <button type="submit" onClick={masukanNilai} className="btn btn bt-submit">Masukan nilai</button>
                            ) :
                                <div className="d-bloc">
                                    <button type="submit" onClick={updateNilai} className="btn btn bt-submit">Perbarui nilai</button>
                                    <br />
                                    <button type="submit" onClick={batalUpdateNilai} className="btn btn bt-submit">Batal</button>
                                </div>
                        }
                    </div>
                    <div className="form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label label">Nama murid</label>
                                <select name="nama_murid" value={nama_murid} className="form-control" onChange={valueChange}>
                                    <option value="default">Nama murid</option>
                                    {
                                        this.props.semuaKelas.map((data, index) => {
                                            if (kode_kelas === data.data.kode_kelas && data.data.id_status === 'murid') {
                                                return (
                                                    <option key={index} value={data.data.nama_murid}>{data.data.nama_murid}</option>
                                                )
                                            }
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label label">Mata pelajaran</label>
                                <ListMapel2 namaMapel2={this.state.nama_mapel_list} valueChange2={valueChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label label">Judul tugas</label>
                                <select name="judul_tugas" value={judul_tugas} className="form-control" onChange={valueChange}>
                                    <option value="default">Judul tugass</option>
                                    {
                                        this.props.tugasKelas.map((data, index) => {
                                            if (data.data.kode_kelas === this.state.kode_kelas && data.data.id_guru === this.state.id_guru2 && data.data.nama_mapel === this.state.nama_mapel_list) {
                                                return (
                                                    <option key={index} value={data.data.judul_tugas}>{data.data.judul_tugas}</option>
                                                )
                                            }
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label label">Nilai tugas</label>
                                <input type="number" name="nilai_tugas" value={nilai_tugas} className="form-control" id="recipient-name" onChange={valueChange} />
                            </div>
                        </form>

                        <small>Perhatian :</small> <small style={{ color: 'red', fontWeight: 500 }}>Postingan hilang secara otomatis saat waktu tenggat tiba</small>
                    </div>
                </section>

                <section className="sec-table">

                    <section className="sec-kategori-nilai">
                        <div className="wrap-nilai">
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label label">Nama mapel</label>
                                <ListMapel2 namaMapel2={this.state.nama_mapel_list} valueChange2={valueChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label label">Judul tugas</label>
                                <select name="judul_tugas_list" value={judul_tugas_list} className="form-control" onChange={valueChange}>
                                    <option value="default">Judul tugas</option>
                                    {
                                        this.props.listNilaiTugas.map((data, index) => {
                                            if (data.data.kode_kelas === this.state.kode_kelas && data.data.id_guru === this.state.id_guru2 && data.data.nama_mapel === this.state.nama_mapel_list) {
                                                return (
                                                    <option key={index} value={data.data.judul_tugas}>{data.data.judul_tugas}</option>
                                                )
                                            }
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </section>

                    <h2>{nama_kelas_list} ({nama_mapel_list})</h2>
                    <br />
                    <table className="table table-to-xls" id="table-to-xls">
                        <thead className="thead">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Mapel</th>
                                <th scope="col">Tugas</th>
                                <th scope="col">Nilai</th>
                                <th scope="col">Opsi</th>
                            </tr>
                        </thead>
                        {
                            this.props.nilaiTugas.map((data, index) => {
                                if (data.data.nama_mapel === nama_mapel_list && data.data.judul_tugas === judul_tugas_list) {
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td></td>
                                                <td>{data.data.nama_murid}</td>
                                                <td>{data.data.nama_mapel}</td>
                                                <td>{data.data.judul_tugas}</td>
                                                <td>{data.data.nilai_tugas}</td>
                                                <td className="list-opsis">
                                                    <i className="las la-times" style={{backgroundColor: 'red', color: 'white', borderColor: 'red'}} id="tms" onClick={() => deleteNilais(data)}></i>
                                                    <i className="las la-pen" style={{backgroundColor: 'rgb(96, 13, 230)', color: 'white'}} id="pens" onClick={() => masukanDataUpdateNilai(data.id, data.data.nama_murid, data.data.nama_mapel, data.data.judul_tugas, data.data.nilai_tugas)}></i>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                            })
                        }
                    </table>
                    <ReactToExcel
                        className="btn btn bt-excel"
                        table="table-to-xls"
                        filename="excelFile"
                        sheet="sheet 1"
                        buttonText="export excel"
                    />
                </section>

                <section className="ss">

                </section>

            </div>
        )
    }
}

const getActionRedux = (dispatch) => {
    return {
        getDataTugasKirim: (data) => dispatch(getDataTugasKirim(data)),
        getDataKelasStart: (data) => dispatch(getDataKelasStart(data)),
        addDataNilai: (data) => dispatch(addDataNilai(data)),
        getDataNilai: (data) => dispatch(getDataNilai(data)),
        getDataNilai2: (data) => dispatch(getDataNilai2(data)),
        addDataNilai2: (data) => dispatch(addDataNilai2(data)),
        deleteNilai: (data) => dispatch(deleteNilai(data)),
        getDataTugas: (data) => dispatch(getDataTugas(data)),
        updateNilaiTUgas: (data) => dispatch(updateNilaiTUgas(data)),
    }
}

const getStateRedux = (state) => {
    return {
        tugasKelasKirim: state.tugasKelasKirim,
        nilaiTugas: state.nilaiTugas,
        semuaKelas: state.semuaKelas,
        listNilaiTugas: state.listNilaiTugas,
        tugasKelas: state.tugasKelas,
    }
}

export default connect(getStateRedux, getActionRedux)(Nilai);