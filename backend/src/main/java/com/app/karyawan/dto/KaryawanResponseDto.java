package com.app.karyawan.dto;

import com.app.karyawan.entity.JenisKelamin;

import java.time.LocalDate;

public class KaryawanResponseDto {

    private String nik;
    private String namaLengkap;
    private JenisKelamin jenisKelamin;
    private LocalDate tanggalLahir;
    private Integer umur;
    private String alamat;
    private String negara;

    public KaryawanResponseDto() {
    }

    public KaryawanResponseDto(String nik, String namaLengkap, JenisKelamin jenisKelamin, LocalDate tanggalLahir, Integer umur, String alamat, String negara) {
        this.nik = nik;
        this.namaLengkap = namaLengkap;
        this.jenisKelamin = jenisKelamin;
        this.tanggalLahir = tanggalLahir;
        this.umur = umur;
        this.alamat = alamat;
        this.negara = negara;
    }

    public String getNik() {
        return nik;
    }

    public void setNik(String nik) {
        this.nik = nik;
    }

    public String getNamaLengkap() {
        return namaLengkap;
    }

    public void setNamaLengkap(String namaLengkap) {
        this.namaLengkap = namaLengkap;
    }

    public JenisKelamin getJenisKelamin() {
        return jenisKelamin;
    }

    public void setJenisKelamin(JenisKelamin jenisKelamin) {
        this.jenisKelamin = jenisKelamin;
    }

    public LocalDate getTanggalLahir() {
        return tanggalLahir;
    }

    public void setTanggalLahir(LocalDate tanggalLahir) {
        this.tanggalLahir = tanggalLahir;
    }

    public Integer getUmur() {
        return umur;
    }

    public void setUmur(Integer umur) {
        this.umur = umur;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public String getNegara() {
        return negara;
    }

    public void setNegara(String negara) {
        this.negara = negara;
    }
}
