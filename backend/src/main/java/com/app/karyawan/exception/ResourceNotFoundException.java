package com.app.karyawan.exception;

/**
 * Custom exception saat data yang dicari tidak ditemukan di database (HTTP 404).
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
