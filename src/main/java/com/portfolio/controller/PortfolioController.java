package com.portfolio.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PortfolioController {

    @GetMapping("/projects")
    public List<Map<String, Object>> getProjects() {
        List<Map<String, Object>> projects = new ArrayList<>();
        String[][] data = {
            {"E-Commerce App", "Full-stack shopping platform with cart and payment integration.", "React, Node.js, MySQL", "https://github.com/ahemanthkumar82-netizen", "https://github.com/ahemanthkumar82-netizen"},
            {"Task Manager", "Productivity app with drag-and-drop task boards.", "Vue.js, Spring Boot", "https://github.com/ahemanthkumar82-netizen", "https://github.com/ahemanthkumar82-netizen"},
            {"Weather Dashboard", "Real-time weather app using OpenWeather API.", "JavaScript, REST API", "https://github.com/ahemanthkumar82-netizen", "https://github.com/ahemanthkumar82-netizen"},
            {"Chat Application", "Real-time messaging app with WebSocket support.", "Java, WebSocket, MySQL", "https://github.com/ahemanthkumar82-netizen", "https://github.com/ahemanthkumar82-netizen"},
            {"AI Image Generator", "Web app that generates images using AI models.", "Python, Flask, React", "https://github.com/ahemanthkumar82-netizen", "https://github.com/ahemanthkumar82-netizen"}
        };
        for (int i = 0; i < data.length; i++) {
            Map<String, Object> p = new LinkedHashMap<>();
            p.put("id", i + 1);
            p.put("title", data[i][0]);
            p.put("description", data[i][1]);
            p.put("techStack", data[i][2]);
            p.put("githubUrl", data[i][3]);
            p.put("liveUrl", data[i][4]);
            projects.add(p);
        }
        return projects;
    }

    @GetMapping("/skills")
    public List<Map<String, Object>> getSkills() {
        List<Map<String, Object>> skills = new ArrayList<>();
        Object[][] data = {
            {"HTML & CSS", "Frontend", 85},
            {"JavaScript", "Frontend", 50},
            {"Java", "Backend", 75},
            {"Git & GitHub", "Tools", 45},
            {"MySQL", "Database", 50}
        };
        for (int i = 0; i < data.length; i++) {
            Map<String, Object> s = new LinkedHashMap<>();
            s.put("id", i + 1);
            s.put("name", data[i][0]);
            s.put("category", data[i][1]);
            s.put("level", data[i][2]);
            skills.add(s);
        }
        return skills;
    }
}
