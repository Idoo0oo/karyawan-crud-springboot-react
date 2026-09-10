package com.app.karyawan.exception;

/**
 * Custom exception saat mencoba menambahkan data dengan NIK yang sudah ada (HTTP 400).
 */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}
