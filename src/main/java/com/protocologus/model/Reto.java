package com.protocologus.model;

import java.time.LocalDateTime;

/**
 * Modelo básico de un reto dentro del sistema.
 * Por ahora solo contiene la información necesaria para mostrarlo en pantalla
 * y determinar si está bloqueado o disponible según su fecha de desbloqueo.
 */
public class Reto {

    private int id;
    private String titulo;
    private String descripcion;
    private LocalDateTime fechaDesbloqueo;

    public Reto(int id, String titulo, String descripcion, LocalDateTime fechaDesbloqueo) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaDesbloqueo = fechaDesbloqueo;
    }

    public int getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public LocalDateTime getFechaDesbloqueo() {
        return fechaDesbloqueo;
    }
}
