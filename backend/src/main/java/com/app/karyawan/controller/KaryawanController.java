package com.app.karyawan.controller;

import com.app.karyawan.dto.ApiResponse;
import com.app.karyawan.dto.KaryawanRequestDto;
import com.app.karyawan.dto.KaryawanResponseDto;
import com.app.karyawan.service.KaryawanService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/karyawan")
public class KaryawanController {

    private final KaryawanService karyawanService;

    public KaryawanController(KaryawanService karyawanService) {
        this.karyawanService = karyawanService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<KaryawanResponseDto>>> getAllKaryawan(
            @RequestParam(required = false) String nik,
            @RequestParam(required = false) String nama
    ) {
        List<KaryawanResponseDto> data = karyawanService.getAllKaryawan(nik, nama);
        return ResponseEntity.ok(ApiResponse.success(data, "Data karyawan berhasil diambil"));
    }

    @GetMapping("/{nik}")
    public ResponseEntity<ApiResponse<KaryawanResponseDto>> getKaryawanByNik(@PathVariable String nik) {
        KaryawanResponseDto data = karyawanService.getKaryawanByNik(nik);
        return ResponseEntity.ok(ApiResponse.success(data, "Data karyawan berhasil ditemukan"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<KaryawanResponseDto>> createKaryawan(
            @Valid @RequestBody KaryawanRequestDto requestDto
    ) {
        KaryawanResponseDto created = karyawanService.createKaryawan(requestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(created, "Data karyawan berhasil ditambahkan"));
    }

    @PutMapping("/{nik}")
    public ResponseEntity<ApiResponse<KaryawanResponseDto>> updateKaryawan(
            @PathVariable String nik,
            @Valid @RequestBody KaryawanRequestDto requestDto
    ) {
        KaryawanResponseDto updated = karyawanService.updateKaryawan(nik, requestDto);
        return ResponseEntity.ok(ApiResponse.success(updated, "Data karyawan berhasil diperbarui"));
    }

    @DeleteMapping("/{nik}")
    public ResponseEntity<ApiResponse<Void>> deleteKaryawan(@PathVariable String nik) {
        karyawanService.deleteKaryawan(nik);
        return ResponseEntity.ok(ApiResponse.success(null, "Data karyawan berhasil dihapus"));
    }
}
