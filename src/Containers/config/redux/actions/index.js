import firebase, { database, firestore } from '../../firebase/fire';

export const register = (data) => (dispatch) => {
    return new Promise((resolve) => {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(response => {
                firestore.collection("usersCollection").doc(response.user.uid).set({
                    email: response.user.email,
                    password: data.password,
                    uid: response.user.uid,
                    nama: data.username
                })
                const dataUser1 = {
                    email: response.user.email,
                    uid: response.user.uid,
                    emailVerified: response.user.emailVerified,
                    status: response.user.metadata.a
                }
                console.log(response)
                resolve(dataUser1);
                localStorage.setItem('registerData', JSON.stringify(dataUser1));
            })
    })
}

export const login = (data) => (dispatch) => {
    return new Promise((resolve) => {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(response => {
                firestore.collection('usersCollection').doc(response.user.uid).get()
                  .then(doc => {
                    if (!doc.exists) {
                      console.log('No such document on collection have you!');
                    } else {
                        localStorage.setItem('dataUserFirestore', JSON.stringify(doc.data()))
                    }
                  })
                  .catch(err => {
                    console.log('Error getting document', err);
                  });
                setTimeout(() => {
                    const dataUser2 = {
                        email: response.user.email,
                        uid: response.user.uid,
                        status: response.user.metadata.a,
                        emailVerified: response.user.emailVerified,
                        refreshToken: response.user.refreshToken,
                        tokenLogin: true
                    }
                    localStorage.setItem('loginData', JSON.stringify(dataUser2));
                    resolve(true);
                }, 2000)
            })
    })
}

export const addData = (data) => (dispatch) => {
    return new Promise((resolve) => {
        const dataz = JSON.parse(localStorage.getItem('loginData'));
        database.ref('komentar/' + 'H8DPq08zoyOHCiTSvcKOviTj8Eo2')
            .push({
                komentator: data.komentator,
                isi: data.isikomentar,
                email: data.emailkomentator,
                kategori: data.kategori,
            })
            .then(res => {
                resolve(true);
            })
    })
}

export const addKirimTugas = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        database.ref('tugas/terkirim')
            .push({
                komentator: data.komentator,
                isi: data.isikomentar,
                email: data.emailkomentator,
                kategori: data.kategori,
            })
            .then(res => {
                resolve(true);
            })
            .catch(err => {
                reject(false)
            })
    })
}

export const addKelasStart = (data) => (dispatch) => {
    return new Promise((resolve) => {
        const dataz = JSON.parse(localStorage.getItem('dataKelas'));
        database.ref('/ruang_kelas/start')
            .push({
                id_guru: data.id_guru,
                id_status: data.id_status,
                nama_murid: data.nama_murid,
                email_murid: data.email_murid,
                nama_guru: data.nama_guru,
                nama_kelas: data.nama_kelas,
                kode_kelas: data.kode_kelas,
                bagian_materi: data.bagian_materi,
                pendidikan: dataz.pendidikan,
                lencana1: data.lencana1,
                lencana2: data.lencana2,
                lencana3: data.lencana3,
            })
            .then(res => {
                resolve(true);
            })
    })
}

export const addKelasBaru = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        database.ref('/ruang/kelas')
            .push({
                nama_guru: data.dataKelas.name_teacher,
                nama_kelas: data.dataKelas.name_class,
                bagian_materi: data.dataKelas.part_study,
                id_guru: data.dataKelas.id_teacher,
                kode_Kelas: data.dataKelas.code_class,
                pendidikan: data.dataKelas.pendidikan,
                lencana1: data.dataKelas.lencana1,
                lencana2: data.dataKelas.lencana1,
                lencana3: data.dataKelas.lencana1,
            })
            .then(res => {
                resolve(true);
            })
            .catch((err) => {
                reject(false)
            })
    })
}

export const addPertanyaan = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        database.ref('/list/pertanyaan')
            .push({
                nama: data.datas.nama,
                email: data.datas.email,
                isi_pertanyaan: data.datas.isi_pertanyaan,
                kode_kelas: data.datas.kode_kelas,
                nama_kelas: data.datas.nama_kelas
            })
            .then(res => {
                resolve(true);
            })
            .catch((err) => {
                reject(false)
            })
    })
}

export const addKomenBaru = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        database.ref('/tugas/komentar')
            .push({
                nama_murid: data.dataKelas.nama_murid,
                isi_komen: data.dataKelas.isi_komen,
                kode_kelas: data.dataKelas.kode_kelas,
                id_tugas: data.dataKelas.id_tugas,
                judul_tugas: data.dataKelas.judul_tugas,
                id_komen: data.dataKelas.id_komen,
                lencana2: data.dataKelas.lencana2,
            })
            .then(res => {
                resolve(true);
            })
            .catch(err => {
                reject(false)
            })
    })
}

export const getDataKomen = (data) => (dispatch) => {
    const getData = database.ref('/tugas/komentar');
    return new Promise((resolve) => {
        getData.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({ type: 'DATA_KOMEN', value: array })
        })
    })
}

export const getDataFirestoreMurid = (data) => (dispatch) => {
    return new Promise((resolve) => {
        const dataLogins = JSON.parse(localStorage.getItem('loginData'));
        let arrayFs = [];
        const docRef = firestore.collection('usersCollection').doc(dataLogins.status);
        docRef.get().then(function (doc) {
            arrayFs.push({
                data: doc.data()
            })
        })
        localStorage.setItem('dataUserFirestore', JSON.stringify(arrayFs))
    })
}

export const getDataKelas = (data) => (dispatch) => {
    const getData = database.ref('/ruang/kelas');
    return new Promise((resolve) => {
        getData.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({ type: 'DATA_KELAS', value: array })
        })
    })
}

export const getDataKelasStart = (data) => (dispatch) => {
    const getData = database.ref('/ruang_kelas/start');
    return new Promise((resolve) => {
        getData.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({ type: 'SEMUA_KELAS', value: array })
        })
    })
}

export const addDataTugas = (data) => (dispatch) => {
    return new Promise((resolve) => {
        database.ref('/tugas/postingan').push({
            nama_mapel: data.dataTugas.nama_mapel,
            tenggat_waktu: data.dataTugas.tenggat_waktu,
            isi_tugas: data.dataTugas.isi_tugas,
            file: data.dataTugas.file
        })
            .then(res => {
                resolve(true);
            })
    })
}

export const addDataLike = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        database.ref('/tugas/like').push({
            nama_user: data.dataTugas.nama_user,
            id_tugas: data.dataTugas.id_tugas,
            kode_kelas: data.dataTugas.kode_kelas,
            status_like: data.dataTugas.status_like,
            email_user_like: data.dataTugas.email_user_like,
            id_komen: data.dataTugas.id_komentar
        })
            .then(res => {
                resolve(true);
            })
            .catch(err => {
                reject(false)
            })
    })
}

export const getDataLike = (data) => (dispatch) => {
    const getData = database.ref('/tugas/like');
    return new Promise((resolve) => {
        getData.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({ type: 'DATA_LIKE', value: array })
        })
    })
}

export const addDataNilai = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        database.ref('/tugas/nilai').push({
            nama_mapel: data.dataz.nama_mapel,
            judul_tugas: data.dataz.judul_tugas,
            kode_kelas: data.dataz.kode_kelas,
            id_guru: data.dataz.id_guru,
            nama_murid: data.dataz.nama_murid,
            nama_guru: data.dataz.nama_guru,
            nilai_tugas: data.dataz.nilai_tugas,
        })
            .then(res => {
                resolve(true);
            })
            .catch(err => {
                reject(false)
            })
    })
}

export const addDataNilai2 = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        database.ref('/nilai/list').push({
            nama_mapel: data.dataz.nama_mapel,
            judul_tugas: data.dataz.judul_tugas,
            kode_kelas: data.dataz.kode_kelas,
            id_guru: data.dataz.id_guru,
            nama_guru: data.dataz.nama_guru,
        })
            .then(res => {
                resolve(true);
            })
            .catch(err => {
                reject(false)
            })
    })
}

export const deleteTugas = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const urlTugas = database.ref(`/tugas/postingan/${data.aid}`);
        urlTugas.remove()
    })
}

export const deleteNilai = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const urlTugass = database.ref(`/tugas/nilai/${data.aid}`);
        urlTugass.remove()
    })
}

export const deleteTugasKirim = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const urlTugass = database.ref(`/tugas/terkirim/${data.aid}`);
        urlTugass.remove()
    })
}

export const getDataTugas = (data) => (dispatch) => {
    const getData = database.ref('/tugas/postingan');
    return new Promise((resolve) => {
        getData.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({ type: 'TUGAS_KELAS', value: array })
        })
    })
}

export const updateTugas = (data) => (dispatch) => {
    const getData = database.ref(`/tugas/postingan/${data.aid}`);
    return new Promise((resolve) => {
        getData.set({
            nama_mapel: data.dataTugas.nama_mapel,
            tenggat_waktu: data.dataTugas.tenggat_waktu,
            isi_tugas: data.dataTugas.isi_tugas,
            file: data.dataTugas.file
        })
    })
}

export const updateNilaiTUgas = (data) => (dispatch) => {
    const getData = database.ref(`/tugas/nilai/${data.dataTugas.aid}`);
    return new Promise((resolve, reject) => {
        getData.set({
            nama_mapel: data.dataTugas.nama_mapel,
            judul_tugas: data.dataTugas.judul_tugas,
            kode_kelas: data.dataTugas.kode_kelas,
            id_guru: data.dataTugas.id_guru,
            nama_murid: data.dataTugas.nama_murid,
            nama_guru: data.dataTugas.nama_guru,
            nilai_tugas: data.dataTugas.nilai_tugas,
        })
            .then((res) => {
                resolve(true)
            })
            .catch((err) => {
                reject(false)
            })
    })
}

export const updateLencana = (data) => (dispatch) => {
    const updateData = database.ref(`/ruang_kelas/start/${data.datas.aid}`);
    return new Promise((resolve, reject) => {
        updateData.set({
            id_guru: data.datas.id_guru,
            id_status: data.datas.id_status,
            nama_murid: data.datas.nama_murid,
            email_murid: data.datas.email_murid,
            nama_guru: data.datas.nama_guru,
            nama_kelas: data.datas.nama_kelas,
            kode_kelas: data.datas.kode_kelas,
            bagian_materi: data.datas.bagian_materi,
            pendidikan: data.datas.pendidikan,
            lencana1: data.datas.lencana1,
            lencana2: data.datas.lencana2,
            lencana3: data.datas.lencana3,
        })
            .then((res => {
                resolve(true)
            }))
            .catch((err) => {
                reject(false)
            })
    })
}

export const getDataTugasKirim = (data) => (dispatch) => {
    const getData = database.ref('/tugas/terkirim');
    return new Promise((resolve) => {
        getData.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({ type: 'TUGAS_KELAS_KIRIM', value: array })
        })
    })
}

export const getDataNilai = (_data) => (dispatch) => {
    const getData = database.ref('/tugas/nilai');
    return new Promise((resolve) => {
        getData.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({ type: 'NILAI_TUGAS', value: array })
        })
    })
}

export const getDataNilai2 = (data) => (dispatch) => {
    const getData = database.ref('/nilai/list');
    return new Promise((resolve) => {
        getData.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({ type: 'LIST_NILAI_TUGAS', value: array })
        })
    })
}
