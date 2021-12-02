import React from 'react';
import Swal from 'sweetalert2';
import Navbar from '../component/navbar';
import '../assets/style/kelas.css';
import firebase, { storage, firestore, database } from '../config/firebase/fire';
import { getDataKelas, getDataTugasKirim, addKelasStart, getDataFirestoreMurid, getDataKelasStart, getDataTugas, addKirimTugas, addKomenBaru, getDataKomen, addDataLike, getDataLike, deleteTugasKirim } from '../config/redux/actions';
import { connect } from 'react-redux';
import { NavigationExpandLess } from 'material-ui/svg-icons';
import ClipboardJS from 'clipboard';
import logo1 from '../assets/images/dekorasi/analytics.png'
import { Spinner } from 'reactstrap';

class Kelas extends React.Component {
    state = {
        init: 'a',
        nama_kelas: '',
        nama_mapel: '',
        kode_kelas: '',
        id_guru: '',
        nama_guru: '',
        id_murid: '',
        dataLogins: '',
        id_status: '',
        id_mapel: '',
        id_tugas: '',
        judul_tugas: '',
        file: '',
        nama_murid: '',
        email_murid: '',
        tenggat_waktu: '',
        isi_tugas: '',
        id_guru: '',
        fotoTugas: '',
        listFoto: [],
        listDataFoto: [],
        textUpload: 'Masukan list',
        uploadDetch: false,
        komentar: '',
        email_user: '',
        nama_user: '',
        id_komen: '',
        tambahFile: true,
        status: ''
    }

    componentDidMount = async () => {

        const { getDataTugasKirim } = this.props;
        getDataTugasKirim();

        const data = {
            id_guru: "",
            id_mapel: "",
            id_tugas: "",
            isi_tugas: "",
            judul_tugas: "",
            kode_kelas: "",
            nama_mapel: "",
            tenggat_waktu: "",
            fotoTugas: '',
            dataFilesTugas: '',
        }

        localStorage.setItem('dataDetailTugas', JSON.stringify(data))

        const { getDataKelas, addKelasStart, getDataFirestoreMurid, getDataKelasStart, getDataTugas, getDataKomen, getDataLike } = this.props;
        getDataKelasStart();
        getDataKelas();
        getDataFirestoreMurid();
        getDataTugas();
        getDataKomen();
        getDataLike();

        const kodeAktif = JSON.parse(localStorage.getItem('dataKelasStart'));
        const id_gurus = JSON.parse(localStorage.getItem('dataKelasStart'));
        const login = JSON.parse(localStorage.getItem('loginData'));

        this.setState({
            email_user: login.email,
            status: kodeAktif.id_status
        })


        setTimeout(() => {
            const nama_users = JSON.parse(localStorage.getItem('dataUserFirestore'));
            this.setState({
                nama_user: nama_users.nama
            })
        }, 2000)


        const expand = document.getElementById('expand');
        const board = document.getElementById('menus');

        expand.addEventListener('click', () => {
            board.classList.toggle('menus-show')
        })

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

    valueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0].name,
            dataFilesTugas: e.target.files[0]
        })
    }

    valueChange2 = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    masukanKomen = async (e) => {
        e.preventDefault();

        var results2 = '';
        var characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZatuvwxyz123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 5; i++) {
            results2 += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log('kode_kelas :', results2);

        const data = JSON.parse(localStorage.getItem('dataKelasStart'));
        const data2 = JSON.parse(localStorage.getItem('dataDetailTugas'));

        const { addKomenBaru } = this.props;
        const dataKelas = {
            nama_murid: data.nama_murid,
            isi_komen: this.state.komentar,
            kode_kelas: data2.kode_kelas,
            id_tugas: data2.id_tugas,
            judul_tugas: data2.judul_tugas,
            id_komen: results2,
            lencana2: data.lencana2,
        }

        const komen = await addKomenBaru({ dataKelas });

        if (komen) {
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
                title: 'komentar Telah terkirim'
            })

            this.setState({
                komentar: ''
            })

        } else {
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
                title: 'komentar gagal terkirim'
            })
        }
    }

    addLike = async (data1, data2, data3) => {

        const { addDataLike } = this.props;
        const { nama_user } = this.state;

        const dataLogin = JSON.parse(localStorage.getItem('loginData'));

        const dataTugas = {
            nama_user: nama_user,
            kode_kelas: data1,
            id_tugas: data2,
            status_like: true,
            email_user_like: dataLogin.email,
            id_komentar: data3
        }

        const data = await addDataLike({ dataTugas });

        if (data) {
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
                title: 'Sudah anda sukai'
            })
        } else {
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
                title: 'Tidak bisa disukai'
            })
        }

    }

    masukanList = (e) => {

        const { fotoTugas, dataFilesTugas, textUpload } = this.state;

        if (textUpload === 'Masukan list') {
            var id2 = '';
            var characters = '12345';
            var charactersLength = characters.length;
            for (var i = 0; i < 3; i++) {
                id2 += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            const namaFile = this.state.fotoTugas;

            this.setState({
                listFoto: [...this.state.listFoto, { id2, namaFile }],
                listDataFoto: [...this.state.listDataFoto, dataFilesTugas],
                textUpload: 'Hapus list',
                uploadDetch: true
            })
            this.setState({
                fotoTugas: '',
            })

            document.getElementById('inp').classList.add('inputGroupFile01-hidden')

        } else if (textUpload === 'Hapus list') {
            this.setState({
                listFoto: [],
                listDataFoto: [],
                fotoTugas: '',
                uploadDetch: false,
                textUpload: 'Masukan list',
            })

            document.getElementById('inp').classList.remove('inputGroupFile01-hidden')

        }


    }

    upload = async () => {
        const { dataFilesTugas } = this.state;

        const filename = dataFilesTugas.name;

        const storageRef = firebase.storage().ref('/tugas/' + filename);
        const uploadTask = storageRef.put(dataFilesTugas);

        uploadTask.on('state_changed', (snapshot) => {

        }, (err) => {

        }, () => {
            uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURLs) => {
                    this.setState({
                        downloadURL: downloadURLs
                    })

                    const dataDetails = JSON.parse(localStorage.getItem('dataDetailTugas'));
                    const dataDetails3 = JSON.parse(localStorage.getItem('dataKelasStart'));

                    const dateS = new Date();
                    const tanggal = dateS.getDate();
                    const bulan = dateS.getMonth();
                    const tahun = dateS.getFullYear();

                    const dataKirim = {
                        id_guru: dataDetails3.id_guru,
                        nama_guru: dataDetails3.nama_guru,
                        id_mapel: dataDetails.id_mapel,
                        kode_kelas: dataDetails.kode_kelas,
                        nama_murid: dataDetails3.nama_murid,
                        email_murid: dataDetails3.email_murid,
                        id_tugas: dataDetails.id_tugas,
                        tenggat_waktu: dataDetails.tenggat_waktu,
                        dataFileTugas: this.state.listDataFoto,
                        files: downloadURLs,
                        waktu_pengumpulan: `${tanggal}/${bulan}/${tahun}`,
                        lencana2: dataDetails3.lencana2
                    }

                    return new Promise((resolve, reject) => {
                        database.ref('tugas/terkirim').push({
                            id_guru: dataKirim.id_guru,
                            id_mapel: dataKirim.id_mapel,
                            id_tugas: dataKirim.id_tugas,
                            kode_kelas: dataKirim.kode_kelas,
                            nama_guru: dataKirim.nama_guru,
                            judul_tugas: this.state.judul_tugas,
                            nama_mapel: this.state.nama_mapel,
                            nama_murid: dataKirim.nama_murid,
                            tenggat_waktu: dataKirim.tenggat_waktu,
                            email_murid: dataKirim.email_murid,
                            dataFileTugas: dataKirim.dataFileTugas,
                            waktu_pengumpulan: dataKirim.waktu_pengumpulan,
                            files: downloadURLs,
                            lencana2: dataDetails3.lencana2
                        })
                            .then(res => {

                                this.setState({
                                    uploadDetch: false,
                                    fotoTugas: '',
                                    tambahFile: false
                                })

                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    onOpen: (toast) => {
                                        toast.addEventListener('mouseenter', Swal.stopTimer)
                                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                                })

                                Toast.fire({
                                    icon: 'success',
                                    title: 'Tugas Telah terkirim'
                                })
                            })
                            .catch(err => {
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    onOpen: (toast) => {
                                        toast.addEventListener('mouseenter', Swal.stopTimer)
                                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                                })

                                Toast.fire({
                                    icon: 'warning',
                                    title: 'Tugas gagal terkirim'
                                })
                            })
                    })


                    this.setState({
                        listFoto: [],
                        listDataFoto: [],
                        fotoTugas: '',
                        textUpload: 'Masukan list',
                    })

                })
        })

    }

    masukanFile = () => {
        this.setState({
            textUpload: 'Masukan list'
        })
    }

    datakelas = () => {
        console.log('ui', this.props.dataKelas[1].data.kode_Kelas)
    }

    copyText = () => {
        const clipboard = new ClipboardJS('.btn');

        clipboard.on('success', function (e) {
            console.info('Accion:', e.action);
            console.info('Texto:', e.text);

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
                title: 'Telah disalin'
            })

            e.clearSelection();
        });

        clipboard.on('error', function (e) {
            console.error('Accion:', e.action);

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
                icon: 'warning',
                title: 'Gagal disalin'
            })
        });

    }

    copyText2 = () => {
        const clipboard = new ClipboardJS('#btn2');

        clipboard.on('success', function (e) {

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
                title: 'Telah disalin'
            })

            e.clearSelection();
        });

        clipboard.on('error', function (e) {
            console.error('Accion:', e.action);

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
                icon: 'warning',
                title: 'Gagal disalin'
            })
        });

    }

    detailTugas = (data1, data2, data3, data4, data5, data6, data7, data8, data9) => {

        const data_user = JSON.parse(localStorage.getItem('dataKelasStart'));

        const data = {
            kode_kelas: data1,
            id_mapel: data2,
            id_guru: data3,
            id_tugas: data4,
            isi_tugas: data5,
            judul_tugas: data6,
            tenggat_waktu: data7,
            file: data8,
            nama_mapel: data9,
            nama_murid: data_user.nama_murid,
            email_murid: data_user.email_murid
        }
        localStorage.setItem('dataDetailTugas', JSON.stringify(data))

        setTimeout(() => {

        }, 300)
        const dataDetail = JSON.parse(localStorage.getItem('dataDetailTugas'));

        setTimeout(() => {
            this.setState({
                kode_kelas: dataDetail.kode_kelas,
                id_mapel: dataDetail.id_mapel,
                id_guru: dataDetail.id_guru,
                id_tugas: dataDetail.id_tugas,
                isi_tugas: dataDetail.isi_tugas,
                judul_tugas: dataDetail.judul_tugas,
                tenggat_waktu: dataDetail.tenggat_waktu,
                file: dataDetail.file,
                nama_mapel: dataDetail.nama_mapel,
                nama_murid: dataDetail.nama_murid,
                email_murid: dataDetail.email_murid
            })
        }, 500)

        document.getElementById('cek-tugas').classList.add('cek-tugas-show');

    }

    deleteNotif = (e) => {
        e.preventDefault();

        this.setState({
            listFoto: [],
            listDataFoto: [],
            fotoTugas: '',
            uploadDetch: false,
            tambahFile: true,
            textUpload: 'Masukan list',
        })

        document.getElementById('list-likes').classList.remove('list-likes-show');
        document.getElementById('cek-tugas').classList.remove('cek-tugas-show');

    }

    deleteNotif2 = (id2) => {

        const listFoto = [...this.state.listFoto];
        const updatelist = listFoto.filter(data => data.id2 !== id2);

        this.setState({
            listFoto: updatelist
        })

    }

    idKomen = (data1) => {
        this.setState({
            id_komen: data1
        })

        document.getElementById('list-likes').classList.toggle('list-likes-show');
    }

    idKomen2 = (data1) => {
        this.setState({
            id_komen: data1
        })

        document.getElementById('list-likes').classList.remove('list-likes-show');
    }

    tutup = (e) => {
        e.preventDefault();

        document.getElementById('list-likes').classList.remove('list-likes-show');
    }

    deleted = (e, data1) => {
        e.stopPropagation();

        const { deleteTugasKirim } = this.props;

        const datas = {
            aid: data1
        }

        deleteTugasKirim(datas);

    }

    hapusList = (e) => {
        e.preventDefault();

        this.setState({
            fotoTugas: ''
        })
    }

    render() {

        const { copyText, hideNotif, detailTugas, hapusList, deleteNotif, valueChange, masukanList, deleteNotif2, upload, masukanFile, copyText2, valueChange2, masukanKomen, addLike, idKomen, idKomen2, tutup, deleted } = this;
        const { nama_kelas, nama_mapel, nama_guru, kode_kelas, id_tugas, id_status, status, fotoTugas, tambahFile, listFoto, textUpload, uploadDetch, komentar, email_user, nama_user, id_komen } = this.state;

        return (
            <div>
                <section className="navbar">
                    <div>
                        <a href="/"><h2>studyROOMS - lIVE</h2></a>
                    </div>
                    <div>
                        <ul>
                            <li style={{ backgroundColor: 'rgb(96, 13, 230)', color: 'white' }}>Forum Kelas</li>
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
                            <a href="/bantuan"><li>Pusat Bantuan</li></a>
                        </ul>
                    </div>
                </section>

                <section className="sec-1s">
                    <div className="list-anggota">
                        <div className="title-list">
                            <h3>Anggota Kelas</h3>
                        </div>
                        <div className="list-people">
                            <ul>
                                {
                                    this.props.semuaKelas.length ? (
                                        this.props.semuaKelas.map((data, index) => {
                                            if (kode_kelas === data.data.kode_kelas && data.data.id_status === 'murid') {
                                                return (
                                                    <li key={index}>
                                                        - {data.data.nama_murid}
                                                        <br />
                                                        {
                                                            data.data.lencana1.length ? (
                                                                <span className="lencanas">
                                                                    {data.data.lencana1}
                                                                </span>
                                                            ) : null
                                                        }
                                                    </li>
                                                )
                                            }
                                        })
                                    ) :
                                        <div className="spinnerX">
                                            <Spinner />
                                            <p>Cek data...</p>
                                        </div>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="sampul-wrap">

                        <div className="sampul">
                            <h3>{nama_kelas}</h3>
                            <i className="las la-expand" id="expand"></i>

                            <div className="menus" id="menus">
                                <small>Kode kelas</small>
                                <h4>[ <span id="codes">{kode_kelas}</span> ]</h4>
                                <i className="las la-copy btn" id="copy" data-clipboard-target="#codes" onClick={copyText}></i>
                                <hr />
                                <small>Wali kelas</small>
                                <h5>{nama_guru}</h5>
                            </div>

                        </div>

                        <div className="share-input">
                            <input type="search" name="pencarian" className="form-control" placeholder="bagikan sesuatu dikelas..." />
                        </div>

                        <div className="list-tugas">

                            {
                                this.props.tugasKelas.length ? (
                                    this.props.tugasKelas.map((data, index) => {
                                        if (data.data.kode_kelas === kode_kelas) {
                                            return (
                                                <div key={index}>
                                                    <div className="child-tugas" onClick={() => detailTugas(data.data.kode_kelas, data.data.id_mapel, data.data.id_guru, data.data.id_tugas, data.data.isi_tugas, data.data.judul_tugas, data.data.tenggat_waktu, data.data.file, data.data.nama_mapel)}>
                                                        <div>
                                                            <i className="las la-pen"></i>
                                                        </div>
                                                        <div>
                                                            <h3>{data.data.nama_guru} memposting tugas - {data.data.judul_tugas}</h3>
                                                            <small>Tenggat waktu : {data.data.tenggat_waktu}</small>
                                                        </div>
                                                    </div>
                                                    <br />
                                                </div>
                                            )
                                        }
                                    })
                                ) :
                                   <h2 className="ups">Upss...Masih belum ada tugas</h2>
                            }

                        </div>

                    </div>
                </section>

                <div className="cek-tugas" id="cek-tugas">

                    <div className="detail-tugas" id="detail-tugas">
                        <button className="btn btn-comment" data-toggle="modal" data-target="#staticBackdrop"><i className="las la-comment"></i> Komentar</button>
                        <h6>Tenggat waktu : Senin, {this.state.tenggat_waktu}</h6>
                        <small>{this.state.nama_mapel}</small>
                        <p>
                            {this.state.isi_tugas}
                        </p>
                        <div className="list-imgs">
                            <img src={this.state.file} alt="" />
                            <a href={this.state.file} download><i className="las la-search-plus"></i></a>
                            <i className="las la-link" id="btn2" title="klik dua kali untuk menduplikat teks" onClick={copyText2} data-clipboard-text={this.state.file}></i>
                            <a href={this.state.file} download><i className="las la-download"></i></a>
                        </div>
                    </div>

                    <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h6 className="modal-title h6" id="staticBackdropLabel">Komentar saat ini (Masih kosong)</h6>
                                    <button type="button" className="close" onClick={idKomen2} data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <input type="text" name="komentar" value={komentar} placeholder="apa pendapatmu ?" className="form-control" id="recipient-name" onChange={valueChange2} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn info" data-dismiss="modal">Tutup</button>
                                            <button type="button" className="btn btn info" onClick={masukanKomen}><i className="lab la-telegram" style={{ fontSize: '16px', backgroundColor: 'transparent', padding: 0 }}></i>Kirim</button>
                                        </div>
                                    </form>
                                    <hr />
                                    {
                                        this.props.listKomentar.map((data, index) => {
                                            if (data.data.kode_kelas === kode_kelas && data.data.id_tugas === id_tugas) {
                                                return (
                                                    <div>
                                                        <div className="list-komentar" key={index}>
                                                            <small><i className="las la-user-circle"></i>{data.data.nama_murid}
                                                                {
                                                                    data.data.lencana2.length ? (
                                                                        <span className="lencana3">
                                                                            {data.data.lencana2}
                                                                        </span>
                                                                    ) : null
                                                                }
                                                            </small>
                                                            <br />
                                                            <small className="smal">{data.data.isi_komen}</small>
                                                            <div className="like-komentar">
                                                                <i className="las la-thumbs-up" id="la-thumbs-up" style={{ color: 'white', backgroundColor: 'rgb(3, 90, 250)', padding: '4px', borderRadius: '90px' }} key={index} onClick={() => addLike(data.data.kode_kelas, data.data.id_tugas, data.data.id_komen)}></i>
                                                                <a href="#"><button className="btn btn bt-like" onClick={() => idKomen(data.data.id_komen)}>Disukai oleh :</button></a>
                                                            </div>
                                                        </div>
                                                        <br />
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Orang yang sudah like tugas */}

                    <div className="list-likes" id="list-likes">
                        <div id="timesn" onClick={tutup}>
                            <i className="las la-arrow-back" onClick={tutup}></i>
                        </div>
                        <div className="list-child">
                            {
                                this.props.listLike.map((data, index) => {
                                    if (data.data.kode_kelas === kode_kelas && data.data.id_tugas === id_tugas && data.data.id_komen === id_komen) {
                                        return (
                                            <div>
                                                <div className="list-komentar2" key={index}>
                                                    <small><i className="las la-thumbs-up" style={{ color: 'blue' }}></i> {data.data.nama_user}</small>
                                                </div>
                                                <br />
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>

                    <div className="detail-tugas2" id="detail-tugas2">
                        {
                            status === 'murid' ? (
                                <div className="custom-file" id="inp">
                                    <input type="file" className="custom-file-input" name="fotoTugas" id="inp2" aria-describedby="inputGroupFileAddon01" onChange={valueChange} onClick={masukanFile} />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.fotoTugas}</label>
                                </div>
                            ) : null
                        }
                        {
                            this.state.fotoTugas.length ? (
                                <li>{this.state.fotoTugas}</li>
                            ) :
                                null
                        }
                        {
                            this.state.fotoTugas.length ? (
                                <div>
                                    <button className="btn btn bt-lampiran2" onClick={upload}><i className="las la-cloud-upload-alt"></i> Upload</button>
                                    <button className="btn btn bt-lampiran2" onClick={hapusList}><i className="las la-cloud-upload-alt"></i> Batalkan</button>
                                </div>
                            ) :
                                <div>

                                </div>
                        }
                        {
                            this.props.tugasKelasKirim.length ? (
                                this.props.tugasKelasKirim.map((data, index) => {
                                    if (data.data.email_murid === email_user && data.data.id_tugas === id_tugas && data.data.kode_kelas === kode_kelas) {
                                        return (
                                            <div className="list-gmb">
                                                <li>
                                                    <img src={data.data.files} className="img-files" />
                                                    <br />
                                                    <small className="waktuKumpul">{data.data.waktu_pengumpulan}</small>
                                                </li>
                                                <button className="btn btn btr" key={index} onClick={(e) => deleted(e, data.id)}><i className="las la-trash" style={{ fontSize: '15px' }}></i></button>
                                            </div>
                                        )
                                    }
                                })
                            ) :
                                <div>

                                </div>
                        }

                        <div className="warning">
                            <p><i className="las la-exclamation-circle"></i>Perhatikan</p>
                            <small>File hanya bisa dikirim satu persatu agar pihak studyROOMS dapat mengatur semuanya</small>
                        </div>

                    </div>

                    <div className="times" id="times" onClick={deleteNotif}>
                        <i className="las la-times"></i>
                    </div>

                </div>

            </div>
        )
    }
}

const getActionRedux = (dispatch) => {
    return {
        getDataKelas: (data) => dispatch(getDataKelas(data)),
        getDataKelasStart: (data) => dispatch(getDataKelasStart(data)),
        addKelasStart: (data) => dispatch(addKelasStart(data)),
        getDataFirestoreMurid: (data) => dispatch(getDataFirestoreMurid(data)),
        getDataTugas: (data) => dispatch(getDataTugas(data)),
        addKirimTugas: (data) => dispatch(addKirimTugas(data)),
        addKomenBaru: (data) => dispatch(addKomenBaru(data)),
        getDataKomen: (data) => dispatch(getDataKomen(data)),
        addDataLike: (data) => dispatch(addDataLike(data)),
        getDataLike: (data) => dispatch(getDataLike(data)),
        getDataTugasKirim: (data) => dispatch(getDataTugasKirim(data)),
        deleteTugasKirim: (data) => dispatch(deleteTugasKirim(data)),
    }
}

const getStateRedux = (state) => {
    return {
        dataKelas: state.dataKelas,
        semuaKelas: state.semuaKelas,
        tugasKelas: state.tugasKelas,
        listKomentar: state.listKomentar,
        listLike: state.listLike,
        tugasKelasKirim: state.tugasKelasKirim,
    }
}

export default connect(getStateRedux, getActionRedux)(Kelas);