package com.app.karyawan.config;

import com.app.karyawan.entity.JenisKelamin;
import com.app.karyawan.entity.Karyawan;
import com.app.karyawan.repository.KaryawanRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final KaryawanRepository karyawanRepository;

    public DataInitializer(KaryawanRepository karyawanRepository) {
        this.karyawanRepository = karyawanRepository;
    }

    @Override
    public void run(String... args) {
        if (karyawanRepository.count() == 0) {
            List<Karyawan> dummyList = List.of(
                new Karyawan("3370056987450001", "Lionel Messi", JenisKelamin.LAKI_LAKI, LocalDate.of(1987, 1, 1), "Jl. Achmad Yani No 89 Jakarta Pusat", "Argentina"),
                new Karyawan("3370056983690002", "Cristiano Ronaldo", JenisKelamin.LAKI_LAKI, LocalDate.of(1985, 5, 2), "Jl. Achmad Yani No 78 Jakarta Pusat", "Portugal"),
                new Karyawan("3370056987450003", "Bambang Pamungkas", JenisKelamin.LAKI_LAKI, LocalDate.of(1984, 1, 3), "Jl. Achmad Yani No 67 Jakarta Pusat", "Indonesia"),
                new Karyawan("3370056987450004", "Natasha Romanov", JenisKelamin.PEREMPUAN, LocalDate.of(1989, 7, 4), "Jl. Achmad Yani No 56 Jakarta Pusat", "Rusia"),
                new Karyawan("3370056987450005", "Entis Siti Jubaidah", JenisKelamin.LAKI_LAKI, LocalDate.of(1992, 1, 5), "Jl. Achmad Yani No 45 Jakarta Pusat", "Malaysia")
            );
            karyawanRepository.saveAll(dummyList);
        }
    }
}
