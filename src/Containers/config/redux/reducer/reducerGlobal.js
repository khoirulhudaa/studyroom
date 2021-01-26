import actiontype from '../dispatch/dispatchAction';

// state
const initState = {
    dataKelas: [],
    semuaKelas: [],
    tugasKelas: [],
    tugasKelasKirim: [],
    nilaiTugas: [],
    listNilaiTugas: [],
    listKomentar: [],
    listLike: [],
    dataGrup: []
  }

  // reducer
  const rootReducer = (state = initState, action) => {

    if(action.type === actiontype.DATAKELAS) {
      return {
        ...state,
        dataKelas: action.value
      }
    }

    if(action.type === actiontype.SEMUAKELAS) {
      return {
        ...state,
        semuaKelas: action.value
      }
    }

    if(action.type === actiontype.TUGASKELAS) {
      return {
        ...state,
        tugasKelas: action.value
      }
    }

    if(action.type === actiontype.TUGASKELASKIRIM) {
      return {
        ...state,
        tugasKelasKirim: action.value
      }
    }

    if(action.type === actiontype.NILAITUGAS) {
      return {
        ...state,
        nilaiTugas: action.value
      }
    }

    if(action.type === actiontype.LISTNILAITUGAS) {
      return {
        ...state,
        listNilaiTugas: action.value
      }
    }

    if(action.type === actiontype.DATAKOMEN) {
      return {
        ...state,
        listKomentar: action.value
      }
    }

    if(action.type === actiontype.DATALIKE) {
      return {
        ...state,
        listLike: action.value
      }
    }

    return state;
  }

  export default rootReducer;
