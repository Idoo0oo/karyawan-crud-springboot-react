# Aplikasi Data Pribadi Karyawan

Aplikasi sistem manajemen CRUD data pribadi karyawan berbasis arsitektur *layered* menggunakan Java Spring Boot 3 (Backend), React dan Tailwind CSS v4 (Frontend), serta MySQL Database.

---

## 1. Penjelasan Teknis & Arsitektur (Developer Perspective)

Aplikasi ini mengadopsi pemisahan tanggung jawab (*Separation of Concerns*) dengan arsitektur berlapis:

```
[ Frontend: React + Tailwind CSS ]
               │
               ▼ (HTTP REST API / JSON)
[ Backend: Controller Layer ]  ──> @RestController, routing, parsing request & DTO validation (@Valid)
               │
               ▼
[ Service Layer ]              ──> @Service, logika bisnis, kalkulasi umur, transactional (@Transactional)
               │
               ▼
[ Repository Layer ]           ──> Spring Data JPA, interface query database & custom JPQL search
               │
               ▼
[ Database: MySQL ]            ──> Tabel "karyawan" (Hibernate ddl-auto=update)
```

### Keputusan Desain & Implementasi Kunci:

1. **Tipe Data NIK (`VARCHAR(20)` / String)**:
   - Kolom `nik` dijadikan Primary Key dengan tipe `VARCHAR(20)`.
   - Menjaga keutuhan angka nol di awal (*leading zero*) pada nomor identitas (misal: `0123...`).
   - Mencegah masalah pembulatan angka (*integer overflow / precision loss*) pada runtime JavaScript/JSON yang memiliki batas presisi integer $2^{53} - 1$.
   - Validasi numerik ditegakkan menggunakan regex Jakarta Validation `@Pattern(regexp = "^[0-9]+$")`.

2. **Kalkulasi Kolom Umur**:
   - Kolom `umur` tidak disimpan di tabel database untuk menghindari data usang (*derived attribute*).
   - Umur dihitung secara dinamis di Service layer saat query dieksekusi menggunakan `Period.between(tanggalLahir, LocalDate.now()).getYears()`, lalu dipetakan ke `KaryawanResponseDto`.

3. **Inisialisasi Data Otomatis & Idempotent**:
   - Data awal (5 baris sesuai spesifikasi) diinisialisasi melalui `DataInitializer` (`CommandLineRunner`).
   - Sistem melakukan pengecekan `karyawanRepository.count() == 0` sebelum melakukan insert, sehingga aplikasi aman di-restart berulang kali tanpa menghasilkan *duplicate key error*.

4. **Error Handling Terpusat**:
   - Menggunakan `@RestControllerAdvice` pada `GlobalExceptionHandler` untuk menangkap error validasi DTO (`MethodArgumentNotValidException`), data tidak ditemukan (`ResourceNotFoundException`), dan duplikasi data (`DuplicateResourceException`).
   - Format response JSON seragam di semua kondisi:
     ```json
     {
       "success": boolean,
       "message": "deskripsi pesan",
       "data": null | object | array
     }
     ```

---

## 2. Panduan Penggunaan Antarmuka (User Guide)

Aplikasi memiliki satu halaman utama (Monitoring) dan modal interaktif untuk setiap aksi:

### A. Halaman Monitoring & Pencarian
- **Tabel Data**: Menampilkan daftar seluruh karyawan dengan kolom: No, NIK, Nama Lengkap, Umur (hasil kalkulasi otomatis), Tanggal Lahir, Jenis Kelamin, Alamat, Negara, dan Aksi.
- **Filter NIK & Nama**: Masukkan NIK atau Nama pada kotak filter di bagian atas, lalu klik tombol **Search** untuk memfilter data langsung dari server backend.
- **Tombol Reset**: Muncul saat input filter terisi, berguna untuk mengosongkan filter dan memuat kembali seluruh data.
- **Tombol Add**: Berada di samping tombol Search, digunakan untuk membuka formulir penambahan data karyawan baru.

### B. Formulir Tambah Data Baru (Modal Add)
- **Akses**: Klik tombol **Add** pada header pencarian.
- **Field**:
  - **NIK**: Wajib diisi, hanya menerima karakter angka (maksimal 20 digit).
  - **Nama Lengkap**: Wajib diisi (maksimal 100 karakter).
  - **Jenis Kelamin**: Wajib dipilih salah satu (Radio button: *Laki-laki* atau *Perempuan*).
  - **Tanggal Lahir**: Input tanggal (datepicker).
  - **Alamat**: Input teks area bebas.
  - **Negara**: Pilihan dropdown dari daftar negara statis.
- **Tombol Simpan**: Memvalidasi input dan mengirim data ke backend.
- **Tombol Kembali**: Menutup modal tanpa menyimpan data.

### C. Aksi pada Tabel (Kolom Action)
Setiap baris data pada tabel memiliki 3 tombol aksi:

1. **Detail**:
   - Membuka modal dengan seluruh data karyawan terkait.
   - Semua field berada dalam mode *read-only* (tidak dapat diubah).
   - Klik tombol **Kembali** untuk menutup.

2. **Edit**:
   - Membuka formulir pengeditan data.
   - Field **NIK terkunci / disabled** (tidak dapat diubah sesuai aturan Primary Key).
   - Field Nama Lengkap, Jenis Kelamin, Tanggal Lahir, Alamat, dan Negara dapat diperbarui.
   - Klik tombol **Ubah** untuk menyimpan perubahan, atau **Kembali** untuk membatalkan.

3. **Delete**:
   - Membuka modal konfirmasi dengan teks: *"Anda yakin menghapus data [Nama Karyawan]?"*.
   - Klik tombol **OK** untuk mengeksekusi penghapusan data dari database.
   - Klik tombol **Batal** untuk membatalkan aksi.

---

## 3. Prasyarat Sistem

- Java JDK 17 atau lebih baru
- Node.js 18 atau lebih baru
- MySQL Server 8.x / MariaDB (port default: 3306)

---

## 4. Cara Menjalankan Aplikasi

### Langkah 1: Persiapan Database
Pastikan service MySQL Anda aktif di port 3306. Sesuaikan user/password di `backend/src/main/resources/application.properties` jika diperlukan. Database `db_karyawan` dan tabel `karyawan` akan dibuat otomatis.

### Langkah 2: Menjalankan Backend
Buka terminal pada folder `backend`:

```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux / macOS / Git Bash
./mvnw spring-boot:run
```
Backend berjalan di: `http://localhost:8080`

### Langkah 3: Menjalankan Frontend
Buka terminal baru pada folder `frontend`:

```bash
npm install
npm run dev
```
Frontend berjalan di: `http://localhost:5173`

---

## 5. Spesifikasi Endpoint REST API

| HTTP Method | Endpoint | Deskripsi | Parameter / Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/karyawan` | Mengambil semua karyawan atau filter | Query: `?nik=...&nama=...` (opsional) |
| `GET` | `/api/karyawan/{nik}` | Mengambil detail 1 karyawan berdasarkan NIK | Path parameter: `nik` |
| `POST` | `/api/karyawan` | Menambahkan data karyawan baru | JSON `KaryawanRequestDto` |
| `PUT` | `/api/karyawan/{nik}` | Memperbarui data karyawan (NIK immutable) | JSON `KaryawanRequestDto` |
| `DELETE` | `/api/karyawan/{nik}` | Menghapus data karyawan | Path parameter: `nik` |
