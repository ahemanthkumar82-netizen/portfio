# Portfolio App — Spring Boot + HTML/CSS + MySQL

## Project Structure
```
portfolio/
├── src/main/
│   ├── java/com/portfolio/
│   │   ├── PortfolioApplication.java       # Spring Boot entry point
│   │   ├── controller/
│   │   │   ├── PortfolioController.java    # GET /api/projects, /api/skills
│   │   │   └── ContactController.java      # POST /api/contact
│   │   ├── model/
│   │   │   ├── Project.java
│   │   │   ├── Skill.java
│   │   │   └── ContactMessage.java
│   │   └── repository/
│   │       ├── ProjectRepository.java
│   │       ├── SkillRepository.java
│   │       └── ContactRepository.java
│   └── resources/
│       ├── application.properties          # DB config
│       └── static/                         # Frontend (served by Spring Boot)
│           ├── index.html
│           ├── css/style.css
│           └── js/main.js
├── portfolio.sql                           # DB schema + seed data
└── pom.xml
```

## Setup

### 1. Database
```sql
source portfolio.sql
```

### 2. Configure DB credentials
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.password=your_mysql_password
```

### 3. Build & Run
```bash
mvn spring-boot:run
```

### 4. Open
```
http://localhost:8080
```

## API Endpoints
| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| GET    | /api/projects  | Fetch all projects   |
| GET    | /api/skills    | Fetch all skills     |
| POST   | /api/contact   | Submit contact form (JSON body) |

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (served as static files)
- **Backend**: Java 17, Spring Boot 3.2, Spring Data JPA
- **Database**: MySQL 8
- **Build**: Maven
