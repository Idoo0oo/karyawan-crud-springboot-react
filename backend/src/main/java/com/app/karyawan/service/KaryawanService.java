package com.app.karyawan.service;

import com.app.karyawan.dto.KaryawanRequestDto;
import com.app.karyawan.dto.KaryawanResponseDto;

import java.util.List;

public interface KaryawanService {

    List<KaryawanResponseDto> getAllKaryawan(String nik, String nama);

    KaryawanResponseDto getKaryawanByNik(String nik);

    KaryawanResponseDto createKaryawan(KaryawanRequestDto requestDto);

    KaryawanResponseDto updateKaryawan(String nik, KaryawanRequestDto requestDto);

    void deleteKaryawan(String nik);
}
