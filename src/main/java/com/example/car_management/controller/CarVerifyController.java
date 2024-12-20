package com.example.car_management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CarVerifyController {

    // Display the car update page
    @GetMapping("/verify-car")
    public String showUpdateCarPage() {
        return "reg-verify"; 
    }

}