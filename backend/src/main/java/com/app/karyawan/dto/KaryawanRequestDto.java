package com.app.karyawan.dto;

import com.app.karyawan.entity.JenisKelamin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class KaryawanRequestDto {

    @NotBlank(message = "NIK wajib diisi")
    @Pattern(regexp = "^[0-9]+$", message = "NIK harus berupa angka")
    @Size(min = 1, max = 20, message = "NIK maksimal 20 digit angka")
    private String nik;

    @NotBlank(message = "Nama lengkap wajib diisi")
    @Size(max = 100, message = "Nama lengkap maksimal 100 karakter")
    private String namaLengkap;

    @NotNull(message = "Jenis kelamin wajib dipilih")
    private JenisKelamin jenisKelamin;

    @Past(message = "Tanggal lahir harus tanggal di masa lalu")
    private LocalDate tanggalLahir;

    private String alamat;

    @Size(max = 50, message = "Nama negara maksimal 50 karakter")
    private String negara;

    public KaryawanRequestDto() {
    }

    public KaryawanRequestDto(String nik, String namaLengkap, JenisKelamin jenisKelamin, LocalDate tanggalLahir, String alamat, String negara) {
        this.nik = nik;
        this.namaLengkap = namaLengkap;
        this.jenisKelamin = jenisKelamin;
        this.tanggalLahir = tanggalLahir;
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
