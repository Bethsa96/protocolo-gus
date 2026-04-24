package com.protocologus.service;

import com.protocologus.dto.SqlQueryRequest;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class Reto3QueryService {

    private final JdbcTemplate jdbcTemplate;

    public Reto3QueryService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> ejecutarConsultaSegura(SqlQueryRequest request) {
        String query = request.getQuery();

        if (query == null || query.trim().isEmpty()) {
            throw new IllegalArgumentException("La consulta no puede estar vacía.");
        }

        // Permitimos un único ; final, pero no múltiples sentencias.
        query = query.trim();

        if (query.endsWith(";")) {
            query = query.substring(0, query.length() - 1).trim();
        }

        String normalized = query.toLowerCase(Locale.ROOT);

        if (!normalized.startsWith("select")) {
            throw new IllegalArgumentException("Solo se permiten consultas SELECT.");
        }

        if (normalized.contains(";")) {
            throw new IllegalArgumentException("No se permiten múltiples sentencias.");
        }

        if (normalized.contains("insert ")
                || normalized.contains("update ")
                || normalized.contains("delete ")
                || normalized.contains("drop ")
                || normalized.contains("alter ")
                || normalized.contains("truncate ")) {
            throw new IllegalArgumentException("Operación no permitida en este entorno.");
        }

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query);
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (Map<String, Object> row : rows) {
            Map<String, Object> filaOrdenada = new LinkedHashMap<>();
            filaOrdenada.putAll(row);
            resultado.add(filaOrdenada);
        }

        return resultado;
    }
}