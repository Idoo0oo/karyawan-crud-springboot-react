package com.app.karyawan.repository;

import com.app.karyawan.entity.Karyawan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KaryawanRepository extends JpaRepository<Karyawan, String> {

    @Query("SELECT k FROM Karyawan k WHERE " +
           "(:nik IS NULL OR :nik = '' OR LOWER(k.nik) LIKE LOWER(CONCAT('%', :nik, '%'))) AND " +
           "(:nama IS NULL OR :nama = '' OR LOWER(k.namaLengkap) LIKE LOWER(CONCAT('%', :nama, '%')))")
    List<Karyawan> searchKaryawan(@Param("nik") String nik, @Param("nama") String nama);

    boolean existsByNik(String nik);
}
