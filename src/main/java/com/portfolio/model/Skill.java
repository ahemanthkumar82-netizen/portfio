package com.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    private int level;

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public int getLevel() { return level; }
}
