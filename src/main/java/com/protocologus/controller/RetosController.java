package com.protocologus.controller;

import com.protocologus.model.Reto;
import com.protocologus.service.RetoService;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Controlador encargado de mostrar la pantalla general de retos y el detalle
 * individual de cada módulo.
 */
@Controller
public class RetosController {

    @Autowired
    private RetoService retoService;

    @GetMapping("/retos")
    public String mostrarRetos(Model model) {
        List<Reto> retos = retoService.obtenerRetos();
        LocalDateTime ahora = LocalDateTime.now();

        Reto proximoReto = retos.stream()
                .filter(reto -> reto.getFechaDesbloqueo().isAfter(ahora))
                .min(Comparator.comparing(Reto::getFechaDesbloqueo))
                .orElse(null);

        model.addAttribute("retos", retos);
        model.addAttribute("ahora", ahora);
        model.addAttribute("proximoReto", proximoReto);

        return "retos";
    }

    /**
     * Muestra el detalle del reto correspondiente.
     * De momento, el reto 1 ya tiene plantilla propia.
     * Los demás retos siguen usando la pantalla base.
     */
    @GetMapping("/retos/{id}")
    public String mostrarDetalleReto(@PathVariable int id, Model model) {
        Reto reto = retoService.obtenerRetoPorId(id);

        if (reto == null) {
            return "redirect:/retos";
        }

        model.addAttribute("reto", reto);
        model.addAttribute("ahora", LocalDateTime.now());
        
        if (id == 1) {
            return "reto1";
        }
        
        return "reto-detalle";
    }
}
