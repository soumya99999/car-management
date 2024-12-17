package com.example.car_management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CarController {

    @GetMapping("/car-register")
    public String showCarRegisterPage() {
        // Returns the name of the Thymeleaf template without the ".html" extension
        return "car-register";
    }
}