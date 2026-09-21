package com.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> submit(@RequestBody Map<String, String> msg) {
        System.out.println("New message from: " + msg.get("name") + " <" + msg.get("email") + ">");
        System.out.println("Message: " + msg.get("message"));
        return ResponseEntity.ok(Map.of("success", true, "message", "Message received!"));
    }
}
