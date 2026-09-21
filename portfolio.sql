CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    tech_stack VARCHAR(200),
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    level INT DEFAULT 80
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO projects (title, description, tech_stack, github_url, live_url) VALUES
('E-Commerce App', 'Full-stack shopping platform with cart and payment integration.', 'React, Node.js, MySQL', 'https://github.com', 'https://demo.com'),
('Task Manager', 'Productivity app with drag-and-drop task boards.', 'Vue.js, Spring Boot', 'https://github.com', 'https://demo.com'),
('Weather Dashboard', 'Real-time weather app using OpenWeather API.', 'JavaScript, REST API', 'https://github.com', 'https://demo.com'),
('Chat Application', 'Real-time messaging app with WebSocket support.', 'Java, WebSocket, MySQL', 'https://github.com', 'https://demo.com'),
('AI Image Generator', 'Web app that generates images using AI models.', 'Python, Flask, React', 'https://github.com', 'https://demo.com');

INSERT INTO skills (name, category, level) VALUES
('HTML & CSS', 'Frontend', 85),
('JavaScript', 'Frontend', 50),
('Java', 'Backend', 75),
('Git & GitHub', 'Tools', 45),
('MySQL', 'Database', 50);
