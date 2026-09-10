package com.app.karyawan.service.impl;

import com.app.karyawan.dto.KaryawanRequestDto;
import com.app.karyawan.dto.KaryawanResponseDto;
import com.app.karyawan.entity.Karyawan;
import com.app.karyawan.exception.DuplicateResourceException;
import com.app.karyawan.exception.ResourceNotFoundException;
import com.app.karyawan.repository.KaryawanRepository;
import com.app.karyawan.service.KaryawanService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class KaryawanServiceImpl implements KaryawanService {

    private final KaryawanRepository karyawanRepository;

    public KaryawanServiceImpl(KaryawanRepository karyawanRepository) {
        this.karyawanRepository = karyawanRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<KaryawanResponseDto> getAllKaryawan(String nik, String nama) {
        return karyawanRepository.searchKaryawan(nik, nama)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public KaryawanResponseDto getKaryawanByNik(String nik) {
        Karyawan karyawan = karyawanRepository.findById(nik)
                .orElseThrow(() -> new ResourceNotFoundException("Data karyawan dengan NIK " + nik + " tidak ditemukan"));
        return mapToResponseDto(karyawan);
    }

    @Override
    public KaryawanResponseDto createKaryawan(KaryawanRequestDto requestDto) {
        if (karyawanRepository.existsByNik(requestDto.getNik())) {
            throw new DuplicateResourceException("Karyawan dengan NIK " + requestDto.getNik() + " sudah terdaftar");
        }

        Karyawan karyawan = new Karyawan(
                requestDto.getNik().trim(),
                requestDto.getNamaLengkap().trim(),
                requestDto.getJenisKelamin(),
                requestDto.getTanggalLahir(),
                requestDto.getAlamat(),
                requestDto.getNegara()
        );

        return mapToResponseDto(karyawanRepository.save(karyawan));
    }

    @Override
    public KaryawanResponseDto updateKaryawan(String nik, KaryawanRequestDto requestDto) {
        Karyawan existing = karyawanRepository.findById(nik)
                .orElseThrow(() -> new ResourceNotFoundException("Data karyawan dengan NIK " + nik + " tidak ditemukan"));

        existing.setNamaLengkap(requestDto.getNamaLengkap().trim());
        existing.setJenisKelamin(requestDto.getJenisKelamin());
        existing.setTanggalLahir(requestDto.getTanggalLahir());
        existing.setAlamat(requestDto.getAlamat());
        existing.setNegara(requestDto.getNegara());

        return mapToResponseDto(karyawanRepository.save(existing));
    }

    @Override
    public void deleteKaryawan(String nik) {
        if (!karyawanRepository.existsById(nik)) {
            throw new ResourceNotFoundException("Data karyawan dengan NIK " + nik + " tidak ditemukan");
        }
        karyawanRepository.deleteById(nik);
    }

    private KaryawanResponseDto mapToResponseDto(Karyawan karyawan) {
        Integer umur = calculateAge(karyawan.getTanggalLahir());
        return new KaryawanResponseDto(
                karyawan.getNik(),
                karyawan.getNamaLengkap(),
                karyawan.getJenisKelamin(),
                karyawan.getTanggalLahir(),
                umur,
                karyawan.getAlamat(),
                karyawan.getNegara()
        );
    }

    private Integer calculateAge(LocalDate birthDate) {
        if (birthDate == null) return null;
        return Period.between(birthDate, LocalDate.now()).getYears();
    }
}
