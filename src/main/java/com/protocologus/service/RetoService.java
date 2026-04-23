package com.protocologus.service;

import com.protocologus.model.Reto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Servicio que proporciona la lista base de retos del sistema.
 * En esta fase usamos datos fijos de prueba para construir la infraestructura.
 */
@Service
public class RetoService {

    public List<Reto> obtenerRetos() {
        List<Reto> retos = new ArrayList<>();

        retos.add(new Reto(1, "Reto 01", "Primer módulo del sistema.", LocalDateTime.of(2026, 7, 2, 17, 30)));
        retos.add(new Reto(2, "Reto 02", "Segundo módulo del sistema.", LocalDateTime.of(2026, 7, 3, 17, 30)));
        retos.add(new Reto(3, "Reto 03", "Tercer módulo del sistema.", LocalDateTime.of(2026, 4, 4, 11, 00)));
        retos.add(new Reto(4, "Reto 04", "Cuarto módulo del sistema.", LocalDateTime.of(2026, 7, 5, 11, 00)));
        retos.add(new Reto(5, "Reto 05", "Quinto módulo del sistema.", LocalDateTime.of(2026, 7, 6, 17, 30)));
        retos.add(new Reto(6, "Reto 06", "Sexto módulo del sistema.", LocalDateTime.of(2026, 7, 7, 17, 30)));
        retos.add(new Reto(7, "Reto 07", "Séptimo módulo del sistema.", LocalDateTime.of(2026, 7, 8, 17, 30)));
        retos.add(new Reto(8, "Reto Final", "Último módulo del sistema.", LocalDateTime.of(2026, 7, 9, 11, 00)));

        return retos;
    }
    
    /**
     * Busca un reto por su id. Devuelve null si no encuentra ninguno con ese
     * identificador.
     */
    public Reto obtenerRetoPorId(int id) {
        return obtenerRetos()
                .stream()
                .filter(reto -> reto.getId() == id)
                .findFirst()
                .orElse(null);
    }
}