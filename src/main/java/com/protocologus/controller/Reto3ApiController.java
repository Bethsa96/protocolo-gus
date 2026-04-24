package com.protocologus.controller;

import com.protocologus.dto.SqlQueryRequest;
import com.protocologus.service.Reto3QueryService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reto3")
public class Reto3ApiController {

    private final Reto3QueryService reto3QueryService;

    public Reto3ApiController(Reto3QueryService reto3QueryService) {
        this.reto3QueryService = reto3QueryService;
    }

    @PostMapping("/query")
    public ResponseEntity<?> ejecutarQuery(@RequestBody SqlQueryRequest request) {
        try {
            List<Map<String, Object>> resultado = reto3QueryService.ejecutarConsultaSegura(request);

            Map<String, Object> response = new HashMap<>();
            response.put("ok", true);
            response.put("rows", resultado);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("ok", false);
            response.put("error", e.getMessage());

            return ResponseEntity.badRequest().body(response);
        }
    }
}