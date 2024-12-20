package com.example.car_management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomePageController {

    @GetMapping("/home")
    public String showHomePage() {
        return "home-page"; // Maps to home-page.html
    }
}
