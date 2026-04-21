/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.protocologus.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controlador principal de la web.
 * Se encarga de servir la página de inicio del sistema.
 */
@Controller
public class HomeController {

    /**
     * Carga la pantalla principal del proyecto.
     * Devuelve la plantilla index.html ubicada en templates.
     */
    @GetMapping("/")
    public String mostrarInicio() {
        return "index";
    }
}