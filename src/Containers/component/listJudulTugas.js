import React from 'react';

class listJudulTugas extends React.Component {

    state = {
        akses: true,
        pendidikan: '',
        nama_mapel: ''
    }

    valueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        const dataKelasStart = JSON.parse(localStorage.getItem('dataKelasStart'));

        this.setState({
            pendidikan: dataKelasStart.pendidikan
        })
    }

    render() {

        const { pendidikan, nama_mapel_list } = this.state;

        if (pendidikan === 'SMK') {
            return (
                <div>

                </div>
            )
        } else if (pendidikan === 'SMA') {
            return (
                <div>

                </div>
            )
        } else if (pendidikan === 'SMP') {
            return (
                <div>
                   
               </div>
            )
        } else if (pendidikan === 'SD') {
            return (
                <div>
                   
                </div>
            )
        }
        return (
            <select name="nama_mapel_list" value={this.props.namaMapel2} className="form-control" onChange={this.props.valueChange2}>
                <option value="default">Pilih mapel</option>
            </select>
        )

    }
}

export default listJudulTugas;