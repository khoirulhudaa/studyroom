import React from 'react';

class listMapel extends React.Component {

    state = {
        akses: true,
        pendidikan: '',
        nama_mapel: ''
    }

    valueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentDidMount() {
        const dataKelasStart = JSON.parse(localStorage.getItem('dataKelasStart'));

        this.setState({
            pendidikan: dataKelasStart.pendidikan
        })
    }

    render() {

        const {pendidikan, nama_mapel_list} = this.state;

        if(pendidikan === 'SMK') {
            return (
                <select name="nama_mapel_list" value={this.props.namaMapel2} className="form-control" onChange={this.props.valueChange2}>
                <option value="#">Pilih mapel</option>
                <option value="Pemrograman dasar">Pemrograman Dasar</option>
                <option value="PBO">PBO</option>
                <option value="SisKomDig">SisKomDig</option>
                <option value="Database">Database</option>
                <option value="TB/TK">TB/TK</option>
                <option value="KWU">KWU</option>
                <option value="PPL">PPL</option>
                <option value="PKK">PKK</option>
                <option value="Matematika">Matematika</option>
                <option value="Fisika">Fisika</option>
                <option value="Kimia">Kimia</option>
                <option value="Bhs Indonesia">Bhs. Indonesia</option>
                <option value="Bhs Inggris">Bhs. Inggris</option>
                <option value="PPKN">PPKN</option>
                <option value="Penjaskes">Penjaskes</option>
                <option value="Sejarah">Sejarah</option>
                </select>
                )
            } else if(pendidikan === 'SMA') {
                return (
                    <select name="nama_mapel_list" value={this.props.namaMapel2} className="form-control" onChange={this.props.valueChange2}>
                    <option value="#">Pilih mapel</option>
                    <option value="Pemrograman dasar">Matematika</option>
                    <option value="IPS">IPS</option>
                    <option value="IPA">IPA</option>
                    <option value="Fisika">Fisika</option>
                    <option value="Kimia">Kimia</option>
                    <option value="Biologi">Biologi</option>
                    <option value="Penjaskese">Penjaskes</option>
                    <option value="PAI">PAI</option>
                    <option value="Bhs Indonesia">Bhs Indonesia</option>
                    <option value="Bhs Inggris">Bhs Inggris</option>
                    <option value="Bhs Sunda">Bhs Sunda</option>
                    <option value="Seni budaya">Seni budaya</option>
                    <option value="Prakarya">Prakarya</option>
                    <option value="PKK">PKK</option>
                    <option value="KWU">KWU</option>
                    <option value="PPKN">PPKN</option>
                    </select>
                )
            } else if(pendidikan === 'SMP') {
                return (
                    <select name="nama_mapel_list" value={this.props.namaMapel2} className="form-control" onChange={this.props.valueChange2}>
                    <option value="#">Pilih mapel</option>
                    <option value="Pemrograman dasar">Matematika</option>
                    <option value="IPS">IPS</option>
                    <option value="IPA">IPA</option>
                    <option value="Fisika">Fisika</option>
                    <option value="Kimia">Kimia</option>
                    <option value="Biologi">Biologi</option>
                    <option value="Penjaskese">Penjaskes</option>
                    <option value="PAI">PAI</option>
                    <option value="Bhs Indonesia">Bhs Indonesia</option>
                    <option value="Bhs Inggris">Bhs Inggris</option>
                    <option value="Bhs Sunda">Bhs Sunda</option>
                    <option value="Seni budaya">Seni budaya</option>
                    <option value="Prakarya">Prakarya</option>
                    <option value="PPKN">PPKN</option>
                    </select>
                )
            } else if(pendidikan === 'SD') {
                return (
                    <select name="nama_mapel_list" value={this.props.namaMapel2} className="form-control" onChange={this.props.valueChange2}>
                    <option value="#">Pilih mapel</option>
                    <option value="Pemrograman dasar">Matematika</option>
                    <option value="IPS">IPS</option>
                    <option value="IPA">IPA</option>
                    <option value="Fisika">Fisika</option>
                    <option value="Kimia">Kimia</option>
                    <option value="Biologi">Biologi</option>
                    <option value="Penjaskese">Penjaskes</option>
                    <option value="PAI">PAI</option>
                    <option value="Bhs Indonesia">Bhs Indonesia</option>
                    <option value="Bhs Inggris">Bhs Inggris</option>
                    <option value="Bhs Sunda">Bhs Sunda</option>
                    <option value="Seni budaya">Seni budaya</option>
                    <option value="Prakarya">Prakarya</option>
                    <option value="PPKN">PPKN</option>
                    </select>
                )
            } else if(pendidikan === 'Perguruan tinggi') {
                return (
                    <select name="nama_mapel_list" value={this.props.namaMapel2} className="form-control" onChange={this.props.valueChange2}>
                    <option value="#">Pilih mapel</option>
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                    <option value="PDTI">PDTI</option>
                    <option value="Kewarganegaraan">Kewarganegaraan</option>
                    <option value="Kewirausahaan">Kewirausahaan</option>
                    <option value="Ilmu Pengatahuan Dasar">Ilmu Pengatahuan Dasar</option>
                    <option value="Kewirausahaan">Kewirausahaan</option>
                    </select>
                )
            } else if(pendidikan === 'Umum') {
                return (
                    <select name="nama_mapel_list" value={this.props.namaMapel2} className="form-control" onChange={this.props.valueChange2}>
                    <option value="#">Pilih mapel</option>
                    <option value="Pemrograman dasar">Matematika</option>
                    <option value="IPS">IPS</option>
                    <option value="IPA">IPA</option>
                    <option value="Fisika">Fisika</option>
                    <option value="Kimia">Kimia</option>
                    <option value="Biologi">Biologi</option>
                    <option value="Penjaskese">Penjaskes</option>
                    <option value="PAI">PAI</option>
                    <option value="Bhs Indonesia">Bhs Indonesia</option>
                    <option value="Bhs Inggris">Bhs Inggris</option>
                    <option value="Bhs Sunda">Bhs Sunda</option>
                    <option value="Seni budaya">Seni budaya</option>
                    <option value="Prakarya">Prakarya</option>
                    <option value="PPKN">PPKN</option>
                    </select>
                )
            }
            return (
                <select name="nama_mapel_list" value={this.props.namaMapel2} className="form-control" onChange={this.props.valueChange2}>
                    <option value="default">Pilih mapel</option>
                </select>
            )

    }
}

export default listMapel;