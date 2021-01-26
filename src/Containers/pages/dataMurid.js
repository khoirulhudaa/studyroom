import React from 'react';
import firebase, { storage, firestore, database } from '../config/firebase/fire';
import { addDataTugas, getDataTugas, deleteTugas, getDataKelasStart, updateLencana, updateTugas, getDataTugasKirim, getDataNilai, deleteTugasKirim } from '../config/redux/actions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { Spinner } from 'reactstrap';
import ListMapel from './listMapel';
import ListMapel3 from './listMapel3';
import '../assets/style/dataMurid.css';

class dataMurid extends React.Component {

    state = {
        judul_tugas: '',
        judul_tugasError: '',
        id_guru2: '',
        id_tugas: '',
        kode_kelas2: '',
        nama_mapel: '',
        id_mapel: '',
        nama_mapelError: '',
        isi_tugas: '',
        isi_tugasError: '',
        tenggat_waktu: '',
        files: [],
        filesList: [],
        errorFirebase: '',
        akses: true,
        pendidikan: '',
        text_posting: 'Pasang lencana',
        idTugas: '',
        file_mapelError: '',
        fileNull: false,
        id_tugas2: '',
        waktu: 0.00,
        tanggal: 0.00,
        bulan: 0.00,
        tahun: 0.00,
        nama_mapel2: '',
        judul_tugas2: '',

        aid: '',
        id_guru: '',
        id_status: '',
        nama_murid: '',
        email_murid: '',
        nama_guru: '',
        nama_kelas: '',
        kode_kelas: '',
        bagian_materi: '',
        pendidikan: '',
        lencana1: '',
        lencana2: '',
        lencana3: '',

    }

    componentDidMount() {
        const { getDataTugasKirim, getDataNilai, getDataKelasStart } = this.props;
        getDataTugasKirim();
        getDataNilai();
        getDataKelasStart();

        const dataKelasStart = JSON.parse(localStorage.getItem('dataKelasStart'));

        const { getDataTugas } = this.props;
        getDataTugas();

        this.setState({
            id_tugas2: dataKelasStart.id_tugas,
            id_guru2: dataKelasStart.id_guru,
            kode_kelas2: dataKelasStart.kode_kelas,
            pendidikan: dataKelasStart.pendidikan
        })

        var results = '';
        var characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZatuvwxyz123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 5; i++) {
            results += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log('id_tugasid_tugas :', results);

        this.setState({
            id_tugas: results
        })


    }

    valueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    filex = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }

    listFiles = (e) => {
        e.preventDefault();

        const newFiles = {
            id: 1 + Math.random(),
            value: this.state.files[0]
        }

        const List = [...this.state.filesList];

        List.push(List);

    }

    validation = () => {

        const { judul_tugas, nama_mapel, isi_tugas, files } = this.state;

        if (!judul_tugas.length) {
            this.setState({
                judul_tugasError: 'judul tugas harus terisi!'
            })
            return false
        } else {
            this.setState({
                judul_tugasError: ''
            })
        }

        if (!isi_tugas.length) {
            this.setState({
                isi_tugasError: 'isi tugas harus terisi!'
            })
            return false
        } else {
            this.setState({
                isi_tugasError: ''
            })
        }

        if (!nama_mapel.length) {
            this.setState({
                nama_mapelError: 'nama mapel harus terisi!'
            })
            return false
        } else {
            this.setState({
                nama_mapelError: ''
            })
        }

        return true

    }

    addData = (e) => {

        document.getElementById('formx').classList.remove('sec-tambah-tugas-show');

        const validasi = this.validation();

        const { files, errorFirebase, id_tugas, id_guru, kode_kelas, id_mapel, akses, tanggal, bulan, tahun } = this.state;
        e.preventDefault();

        if (validasi) {

            if (this.state.nama_mapel === 'Pemrograman dasar') {
                this.setState({
                    id_mapel: '1'
                })
            } else if (this.state.nama_mapel === 'PBO') {
                this.setState({
                    id_mapel: '2'
                })
            } else if (this.state.nama_mapel === 'SisKomDig') {
                this.setState({
                    id_mapel: '3'
                })
            } else if (this.state.nama_mapel === 'Database') {
                this.setState({
                    id_mapel: '4'
                })
            } else if (this.state.nama_mapel === 'TB/TK') {
                this.setState({
                    id_mapel: '5'
                })
            } else if (this.state.nama_mapel === 'KWU') {
                this.setState({
                    id_mapel: '6'
                })
            } else if (this.state.nama_mapel === 'PPL') {
                this.setState({
                    id_mapel: '7'
                })
            } else if (this.state.nama_mapel === 'PKK') {
                this.setState({
                    id_mapel: '8'
                })
            } else if (this.state.nama_mapel === 'Matematika') {
                this.setState({
                    id_mapel: '9'
                })
            } else if (this.state.nama_mapel === 'Fisika') {
                this.setState({
                    id_mapel: '10'
                })
            } else if (this.state.nama_mapel === 'Kimia') {
                this.setState({
                    id_mapel: '11'
                })
            } else if (this.state.nama_mapel === 'Biologi') {
                this.setState({
                    id_mapel: '12'
                })
            } else if (this.state.nama_mapel === 'Bhs Indonesia') {
                this.setState({
                    id_mapel: '13'
                })
            } else if (this.state.nama_mapel === 'Bhs Inggris') {
                this.setState({
                    id_mapel: '14'
                })
            } else if (this.state.nama_mapel === 'PPKN') {
                this.setState({
                    id_mapel: '15'
                })
            } else if (this.state.nama_mapel === 'Penjaskes') {
                this.setState({
                    id_mapel: '16'
                })
            } else if (this.state.nama_mapel === 'Sejarah') {
                this.setState({
                    id_mapel: '17'
                })
            } else if (this.state.nama_mapel === 'Prakarya') {
                this.setState({
                    id_mapel: '18'
                })
            } else if (this.state.nama_mapel === 'PAI') {
                this.setState({
                    id_mapel: '19'
                })
            } else if (this.state.nama_mapel === 'Fiqih') {
                this.setState({
                    id_mapel: '20'
                })
            } else if (this.state.nama_mapel === 'SKI') {
                this.setState({
                    id_mapel: '21'
                })
            } else if (this.state.nama_mapel === 'Qurdist') {
                this.setState({
                    id_mapel: '22'
                })
            } else if (this.state.nama_mapel === 'Akidah akhlak') {
                this.setState({
                    id_mapel: '23'
                })
            } else if (this.state.nama_mapel === 'Seni budaya') {
                this.setState({
                    id_mapel: ' 24'
                })
            }

            var formatTeks = ''
            const filename = files.name;
            const storageRef = firebase.storage().ref('/images/' + filename);
            const uploadTask = storageRef.put(files);

            uploadTask.on('state_changed', (snapshot) => {

            }, (err) => {

            }, () => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then((downloadURLs) => {
                        this.setState({
                            downloadURL: downloadURLs
                        })

                        const { nama_mapel, kode_kelas2, id_guru2, tenggat_waktu, isi_tugas, files, judul_tugas, id_mapel, tanggal, bulan, tahun } = this.state;

                        const tenggat = `${tanggal}/${bulan}/${tahun}`

                        formatTeks += `<pre>${isi_tugas}</pre>`;
                        const nama_gurus = JSON.parse(localStorage.getItem('dataKelasStart'));

                        const dataTugas = {
                            nama_mapel: nama_mapel,
                            tenggat_waktu: tenggat,
                            isi_tugas: formatTeks,
                            file: downloadURLs,
                            id_tugas: id_tugas,
                            id_guru: id_guru2,
                            kode_kelas: kode_kelas2,
                            id_mapel: id_mapel,
                            nama_guru: nama_gurus.nama_guru
                        }

                        database.ref('tugas/postingan').push({
                            judul_tugas: judul_tugas,
                            nama_mapel: nama_mapel,
                            tenggat_waktu: tenggat,
                            isi_tugas: isi_tugas,
                            file: downloadURLs,
                            id_tugas: id_tugas,
                            id_guru: id_guru2,
                            kode_kelas: kode_kelas2,
                            id_mapel: id_mapel,
                            nama_guru: nama_gurus.nama_guru
                        });

                        if (dataTugas) {
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
                                title: 'Tugas Telah terposting'
                            })

                            // const { addDataTugass } = this.props;
                            // addDataTugass(dataTugas);

                            var results2 = '';
                            var characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZatuvwxyz123456789';
                            var charactersLength = characters.length;
                            for (var i = 0; i < 5; i++) {
                                results2 += characters.charAt(Math.floor(Math.random() * charactersLength));
                            }

                            this.setState({
                                id_tugas: results2
                            })

                            this.setState({
                                judul_tugas: '',
                                nama_mapel: '',
                                isi_tugas: '',
                                tenggat_waktu: '',
                                files: [],
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
                                title: 'Tugas gagal terposting'
                            })
                        }
                    })
                    .catch(err => {
                        this.setState({
                            errorFirebase: err.message
                        })
                    })
            })

        }

    }

    deleted = async (e, data) => {
        e.stopPropagation();

        // alert(data.id)

        const { deleteTugas } = this.props;

        const datas = {
            aid: data.id
        }

        const hapus = deleteTugas(datas);

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
                title: 'tugas telah dihapus'
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
                title: 'Tugas gagal dihapus'
            })
        }
    }

    updated = (e) => {

        const validasi = this.validation();

        const { files, id_tugas, id_guru, kode_kelas, id_mapel, akses, idTugas } = this.state;

        if (validasi) {

            if (this.state.nama_mapel === 'Pemrograman dasar') {
                this.setState({
                    id_mapel: '1'
                })
            } else if (this.state.nama_mapel === 'PBO') {
                this.setState({
                    id_mapel: '2'
                })
            } else if (this.state.nama_mapel === 'SisKomDig') {
                this.setState({
                    id_mapel: '3'
                })
            } else if (this.state.nama_mapel === 'Database') {
                this.setState({
                    id_mapel: '4'
                })
            } else if (this.state.nama_mapel === 'TB/TK') {
                this.setState({
                    id_mapel: '5'
                })
            } else if (this.state.nama_mapel === 'KWU') {
                this.setState({
                    id_mapel: '6'
                })
            } else if (this.state.nama_mapel === 'PPL') {
                this.setState({
                    id_mapel: '7'
                })
            } else if (this.state.nama_mapel === 'PKK') {
                this.setState({
                    id_mapel: '8'
                })
            } else if (this.state.nama_mapel === 'Matematika') {
                this.setState({
                    id_mapel: '9'
                })
            } else if (this.state.nama_mapel === 'Fisika') {
                this.setState({
                    id_mapel: '10'
                })
            } else if (this.state.nama_mapel === 'Kimia') {
                this.setState({
                    id_mapel: '11'
                })
            } else if (this.state.nama_mapel === 'Biologi') {
                this.setState({
                    id_mapel: '12'
                })
            } else if (this.state.nama_mapel === 'Bhs Indonesia') {
                this.setState({
                    id_mapel: '13'
                })
            } else if (this.state.nama_mapel === 'Bhs Inggris') {
                this.setState({
                    id_mapel: '14'
                })
            } else if (this.state.nama_mapel === 'PPKN') {
                this.setState({
                    id_mapel: '15'
                })
            } else if (this.state.nama_mapel === 'Penjaskes') {
                this.setState({
                    id_mapel: '16'
                })
            } else if (this.state.nama_mapel === 'Sejarah') {
                this.setState({
                    id_mapel: '17'
                })
            } else if (this.state.nama_mapel === 'Prakarya') {
                this.setState({
                    id_mapel: '18'
                })
            } else if (this.state.nama_mapel === 'PAI') {
                this.setState({
                    id_mapel: '19'
                })
            } else if (this.state.nama_mapel === 'Fiqih') {
                this.setState({
                    id_mapel: '20'
                })
            } else if (this.state.nama_mapel === 'SKI') {
                this.setState({
                    id_mapel: '21'
                })
            } else if (this.state.nama_mapel === 'Qurdist') {
                this.setState({
                    id_mapel: '22'
                })
            } else if (this.state.nama_mapel === 'Akidah akhlak') {
                this.setState({
                    id_mapel: '23'
                })
            } else if (this.state.nama_mapel === 'Seni budaya') {
                this.setState({
                    id_mapel: ' 24'
                })
            }

            var formatTeks = ''
            const filename = files.name;
            const storageRef = firebase.storage().ref('/images/' + filename);
            const uploadTask = storageRef.put(files);

            uploadTask.on('state_changed', (snapshot) => {

            }, (err) => {

            }, () => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then((downloadURLs) => {
                        this.setState({
                            downloadURL: downloadURLs
                        })

                        const { nama_mapel, kode_kelas2, id_guru2, waktu, isi_tugas, files, judul_tugas, id_mapel, tanggal, bulan, tahun } = this.state;

                        const tenggat = `${tanggal}/${bulan}/${tahun}`;

                        formatTeks += `<pre>${isi_tugas}</pre>`;

                        const dataTugas = {
                            nama_mapel: nama_mapel,
                            tenggat_waktu: tenggat,
                            isi_tugas: formatTeks,
                            file: downloadURLs,
                            id_tugas: id_tugas,
                            id_guru: id_guru,
                            kode_kelas: kode_kelas,
                            id_mapel: id_mapel,
                            idTugas: idTugas,
                        }

                        database.ref(`/tugas/postingan/${dataTugas.idTugas}`).set({
                            judul_tugas: judul_tugas,
                            isi_tugas: isi_tugas,
                            tenggat_waktu: tenggat,
                            file: downloadURLs,
                            id_guru: id_guru,
                            kode_kelas: kode_kelas,
                            id_tugas: id_tugas,
                            id_mapel: id_mapel,
                            nama_mapel: nama_mapel,
                        });

                        if (dataTugas) {
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
                                title: 'Tugas Telah diperbarui'
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
                                title: 'Tugas gagal diperbarui'
                            })
                        }
                    })
                    .catch(err => {
                        this.setState({
                            errorFirebase: err.message
                        })
                    })
            })
        } else if (this.state.fileNull === true) {
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
                title: 'Harus ada berkas/dokumen yang dimasukan!'
            })
        }
    }

    perbarui = (e, data) => {
        e.stopPropagation();

        this.setState({
            judul_tugas: data.data.judul_tugas,
            isi_tugas: data.data.isi_tugas,
            tenggat_waktu: data.data.tenggat_waktu,
            file: data.data.file,
            text_posting: 'Perbarui lencana',
            idTugas: data.id,
            id_guru: data.data.id_guru,
            kode_kelas: data.data.kode_kelas,
            id_tugas: data.data.id_tugas,
            id_mapel: data.data.id_mapel,
            nama_mapel: data.data.nama_mapel,
        })
    }

    batalPerbarui = () => {
        this.setState({
            judul_tugas: '',
            isi_tugas: '',
            tenggat_waktu: '',
            file: '',
            text_posting: 'Pasang lencana',
            idTugas: '',
            id_guru: '',
            kode_kelas: '',
            id_tugas: '',
            id_mapel: '',
            nama_mapel: '',
            file_mapelError: '',
            fileNull: false,
            judul_tugasError: '',
            nama_mapelError: '',
            isi_tugasError: ''
        })
    }

    height = () => {
        document.getElementById('tugass').classList.toggle('list-tugas-post-show')
        document.getElementById('angleDown').classList.toggle('la-angle-down-rotate')
    }

    height2 = () => {
        document.getElementById('tugass2').classList.toggle('list-tugas-post-show')
        document.getElementById('angleDown2').classList.toggle('la-angle-down-rotate')
    }

    upList = () => {
        document.getElementById('tugass').classList.remove('list-tugas-post-show')
    }

    deleteds = (e, data) => {
        e.stopPropagation();
        const { deleteTugasKirim } = this.props;

        const dataTugas = {
            aid: data.id
        }

        deleteTugasKirim(dataTugas);

    }

    tambahLencana = (e, data) => {
        e.preventDefault();
        const { lencana1, lencana2, lencana3 } = this.state;

        document.getElementById('updateLencana').classList.toggle('updateLencana-show');

        this.setState({
            aid: data.id,
            id_guru: data.data.id_guru,
            id_status: data.data.id_status,
            nama_murid: data.data.nama_murid,
            email_murid: data.data.email_murid,
            nama_guru: data.data.nama_guru,
            nama_kelas: data.data.nama_kelas,
            kode_kelas: data.data.kode_kelas,
            bagian_materi: data.data.bagian_materi,
            pendidikan: data.data.pendidikan,
            lencana1: data.data.lencana1,
            lencana2: data.data.lencana2,
            lencana3: data.data.lencana3
        })

    }

    pasangLencana = async (e) => {
        e.preventDefault();
        const { updateLencana } = this.props;
        const { aid, id_guru, id_status, nama_murid, email_murid, nama_guru, nama_kelas, kode_kelas, bagian_materi, pendidikan, lencana1, lencana2, lencana3 } = this.state;

        const datas = {
            aid: aid,
            id_guru: id_guru,
            id_status: id_status,
            nama_murid: nama_murid,
            email_murid: email_murid,
            nama_guru: nama_guru,
            nama_kelas: nama_kelas,
            kode_kelas: kode_kelas,
            bagian_materi: bagian_materi,
            pendidikan: pendidikan,
            lencana1: lencana1,
            lencana2: lencana2,
            lencana3: lencana3
        }

        const ok = updateLencana({ datas });
        if (ok) {
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
                title: 'Lencana telah dipasangkan'
            })

            this.setState({
                aid: '',
                nama_murid: '',
                lencana1: '',
                lencana2: '',
                lencana3: ''
            })

            setTimeout(() => {
                document.getElementById('updateLencana').classList.remove('updateLencana-show');
            }, 300)

        } else {
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
                title: 'Lencana gagal dipasangkan'
            })
        }

    }

    tutup = (e) => {
        e.preventDefault();
        this.setState({
            aid: '',
            nama_murid: '',
            lencana1: '',
            lencana2: '',
            lencana3: ''
        })

        document.getElementById('updateLencana').classList.remove('updateLencana-show');
    }

    render() {

        const { valueChange, filex, listFiles, addData, deleted, updated, tutup, tambahLencana, pasangLencana, perbarui, batalPerbarui, height, height2, upList, deleteds, perbaruis } = this;
        const { isi_tugas, isi_tugasError, nama_mapel, nama_mapelError, tenggat_waktu, files, errorFirebase, id_tugas2, judul_tugas, nama_mapel2, judul_tugas2, judul_tugasError, pendidikan, akses, id_guru, kode_kelas, text_posting, file_mapelError, id_guru2, kode_kelas2, tanggal, bulan, tahun, nama_murid, lencana1, lencana2, lencana3 } = this.state;
        console.log('nama mapel :', this.state.nama_mapel2)
        console.log('judul tugas :', this.state.judul_tugas2)

        return (
            <div>

                <section className="navbar">
                    <div>
                        <a href="/"><h2>studyROOMS - lIVE</h2></a>
                    </div>
                    <div>
                        <ul>
                            <a href="/kelasStart"><li>Forum Kelas</li></a>
                            <a href="/tugas"><li className="tugas-li">Tugas Kelas</li></a>
                            <a href="/nilai"><li>Penilaian</li></a>
                            <a href="/dataMurid"><li style={{ backgroundColor: 'rgb(96, 13, 230)', color: 'white' }}>Data murid</li></a>
                            <a href="/bantuan"><li>Pusat Bantuan</li></a>
                        </ul>
                    </div>
                </section>

                <section className="sec-tugas-img2 animate__animated animate__fadeInLeftBig animated__delay-1s">
                    <div className="list-bantuan">
                        <h3>Data murid</h3>
                        <ul>
                            <a href="#tugass"><li onClick={upList}><i className="las la-eye"></i> Daftar murid</li></a>
                            <li data-toggle="modal" data-target="#staticBackdrop3"><i className="las la-exclamation"></i> Peraih lencana</li>
                            <a href="/nilai"><li><i class="las la-chalkboard"></i> Nilai murid</li></a>
                        </ul>
                    </div>
                    <div className="img-swipper2">
                        <h2>Berikan apresiasi kepada murid dengan memasang lencana untuknya</h2>
                        <a href="#tugass"><button className="btn btn bt-tugasz">Berikan lencana</button></a>
                    </div>
                </section>

                <section className="list-tugas-post" id="tugass">
                    <h4 className="text-postingan">Data murid dikelas ini</h4>
                    <br />
                    <i className="las la-angle-down" id="angleDown" onClick={height}></i>
                    <table className="table table-to-xls" id="table-to-xls">
                        <thead className="thead">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Lencana</th>
                                <th scope="col">Opsi</th>
                            </tr>
                        </thead>
                        {
                            this.props.tugasKelas.length ? (
                                this.props.semuaKelas.map((data, index) => {
                                    if (kode_kelas2 === data.data.kode_kelas && data.data.id_status === 'murid') {
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td></td>
                                                    <td>{data.data.nama_murid}</td>
                                                    <td>
                                                        {
                                                            data.data.lencana1.length ? (
                                                                <span className="lencana">
                                                                    {data.data.lencana1}
                                                                </span>
                                                            ) : null
                                                        }
                                                        {
                                                            data.data.lencana2.length ? (
                                                                <span className="lencana">
                                                                    {data.data.lencana2}
                                                                </span>
                                                            ) : null
                                                        }
                                                         {
                                                            data.data.lencana3.length ? (
                                                                <span className="lencana">
                                                                    {data.data.lencana3}
                                                                </span>
                                                            ) : null
                                                        }
                                                    </td>
                                                    <td>
                                                        <i className="las la-award aw" onClick={(e) => tambahLencana(e, data)}></i>
                                                        <i className="las la-sign-out-alt" onClick={(e) => deleteds(e, data)}></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    }
                                })
                            ) :
                                <div className="spinner">
                                    <Spinner /> Cek tugas...
                            </div>
                        }
                    </table>

                </section>

                {/* <section className="sec-kategori-nilai2">
                    <div className="wrap-nilai">
                        <div className="form-group">
                            <label htmlFor="message-text" className="col-form-label label">Nama mapel</label>
                            <ListMapel3 namaMapel2={this.state.nama_mapel2} valueChange2={valueChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message-text" className="col-form-label label">Judul tugas</label>
                            <select name="judul_tugas2" value={judul_tugas2} className="form-control" onChange={valueChange}>
                                <option value="default">Judul tugas</option>
                                {
                                    this.props.tugasKelas.map((data, index) => {
                                        if (data.data.kode_kelas === this.state.kode_kelas2 && data.data.nama_mapel === nama_mapel2 && data.data.id_guru === this.state.id_guru2) {
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

                <section className="list-tugas-post" id="tugass2">
                    <h4 className="text-postingan">Murid yang mengumpulkan tugas</h4>
                    <i className="las la-angle-down" id="angleDown2" onClick={height2}></i>
                    {
                        this.props.tugasKelasKirim.length ? (
                            this.props.tugasKelasKirim.map((data, index) => {
                                if (data.data.kode_kelas === kode_kelas2 && data.data.id_tuga2 === id_tugas2 && data.data.nama_mapel === nama_mapel2 && data.data.judul_tugas === judul_tugas2 && data.data.id_guru === id_guru2) {
                                    return (
                                        <div className="chd" key={index}>
                                            <div>
                                                <i className="las la-calendar-alt"></i>
                                            </div>
                                            <div className="content-list-tugas">
                                                <h3>{data.data.nama_murid} - {data.data.judul_tugas}</h3>
                                                <small>Tenggat waktu : {data.data.tenggat_waktu} | </small>
                                                <small> Dikumpulkan pada : {data.data.waktu_pengumpulan} | </small>
                                                {
                                                    data.data.tenggat_waktu === data.data.waktu_pengumpulan ? (
                                                        <small className="tepat">Dikumpulkan pada hari H</small>
                                                    ) :
                                                        <small className="tepat2">Dikumpulkan</small>
                                                }
                                            </div>
                                            <div className="list-opsi">
                                                <i className="las la-trash" onClick={(e) => deleteds(e, data)} id="timex"></i>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        ) :
                            <div className="spinner">
                                <Spinner /> Cek tugas...
                            </div>
                    }
                </section> */}

                <div class="modal fade" id="staticBackdrop3" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <h3>Aturan tugas - studyROOM</h3>
                                <hr />
                                a. Tugas sesuai kurikulum sekolah saat ini
                                <br />
                                b. Berikan materi seperti apa yang dipelajari di sekolah
                                <br />
                                3. Tentukan soal/materi yang terbaik dan bermanfaat untuk murid saat ini
                                <br />
                                4. Jangan memasukan kata-kata yang menyinggung pihak lain atau seperti mendukung satu pihak
                                <br />
                                5. Haruslah seorang guru pembuat kelas atau pemilik mata pelajaran yang membuat tugasKelas
                                <br />
                                6. Harus memenuhi kriteria dan aturan diatas
                                <br />
                                7. Tidak mengandung unsur hara atau suatu penghinaan ras, suku, agam, kelompok ataupun
                                   individual
                                <br />
                                Demikian aturan yang ada di studyROOMS. Semua ini berlaku semenjak kelas dibuat oleh guru
                                dan disetujui oleh poihak studyROOM. Tujuan adanya pun agar tercuptanya proses belajar
                                mengajar yang mendidik dan tertata sehingga menjadi kondusif dan lebih baik.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn bt-lose" data-dismiss="modal">Tutup</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModal4" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Perbarui tugas ini</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label for="message-text" className="col-form-label">Judul tugas</label>
                                        <input type="text" name="judul_tugas" value={() => null} className="form-control" id="recipient-name" onChange={valueChange} />
                                    </div>
                                    <div className="form-group">
                                        <label for="message-text" className="col-form-label">Mata pelajaran</label>
                                        <input type="text" name="mapel" value={() => null} className="form-control" id="recipient-name" onChange={valueChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn bt-batal" data-dismiss="modal">Batal</button>
                                <button type="submit" onClick={() => null} className="btn btn bt-kirim">Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="updateLencana" id="updateLencana">
                    <form className="from">
                        <div className="form-group">
                            <label for="message-text" className="col-form-label">Nama murid</label>
                            <input type="text" name="judul_tugas" value={nama_murid} className="form-control" id="recipient-name" onChange={valueChange} />
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlSelect1">Lencana 1 (Jabatan)</label>
                            <select className="form-control" name="lencana1" value={lencana1} onChange={valueChange}>
                                <option value="">Tentukan lencana</option>
                                <option value="">tidak ada lencana</option>
                                <option value="Ketua kelas">Ketua kelas</option>
                                <option value="Sekretaris">Sekretaris</option>
                                <option value="Bendahara">Bendahara</option>
                                <option value="S.keamanan">Seksi keamanan</option>
                                <option value="S.kebersihan">Seksi kebersihan</option>
                                <option value="Humas">Humas</option>
                                <option value="S.keagamaan">seksi keagamaan</option>
                                <option value="S.jasmani">Seksi jasmani</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlSelect1">Lencana 2 (Istimewa)</label>
                            <select className="form-control" name="lencana2" value={lencana2} onChange={valueChange}>
                                <option value="">Tentukan lencana</option>
                                <option value="">tidak ada lencana</option>
                                <option value="Murid disiplin">Murid disiplin</option>
                                <option value="Murid rajin">Murid rajin</option>
                                <option value="Murid terbaik">Murid terbaik</option>
                                <option value="Murid prestasi">Murid berprestasi</option>
                                <option value="Murid terkenal">Murid terpopuler</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlSelect1">Lencana 3 (Prestasi kelas)</label>
                            <select className="form-control" name="lencana3" value={lencana3} onChange={valueChange}>
                                <option value="">Tentukan lencana</option>
                                <option value="">tidak ada lencana</option>
                                <option value="Rangking 1">Rangking 1</option>
                                <option value="Rangking 2">Rangking 2</option>
                                <option value="Rangking 3">Rangking 3</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn bt-batal" onClick={tutup}>Batal</button>
                            <button type="submit" onClick={pasangLencana} className="btn btn bt-kirim">Simpan</button>
                        </div>
                    </form>
                </div>

                <section className="jk">

                </section>

            </div>
        )
    }
}

const getActionRedux = (dispatch) => {
    return {
        addDataTugass: (data) => dispatch(addDataTugas(data)),
        getDataTugas: (data) => dispatch(getDataTugas(data)),
        deleteTugas: (data) => dispatch(deleteTugas(data)),
        updateTugas: (data) => dispatch(updateTugas(data)),
        getDataTugasKirim: (data) => dispatch(getDataTugasKirim(data)),
        getDataNilai: (data) => dispatch(getDataNilai(data)),
        deleteTugasKirim: (data) => dispatch(deleteTugasKirim(data)),
        getDataKelasStart: (data) => dispatch(getDataKelasStart(data)),
        updateLencana: (data) => dispatch(updateLencana(data)),
    }
}


const getStateRedux = (state) => {
    return {
        tugasKelas: state.tugasKelas,
        tugasKelasKirim: state.tugasKelasKirim,
        listNilaiTugas: state.listNilaiTugas,
        semuaKelas: state.semuaKelas,
    }
}

export default connect(getStateRedux, getActionRedux)(dataMurid);;