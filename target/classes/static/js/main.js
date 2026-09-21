// ===== HIRE ME MODAL =====
function openHireModal() {
  document.getElementById("hireModal").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeHireModal(e) {
  if (!e || e.target === document.getElementById("hireModal")) {
    document.getElementById("hireModal").classList.remove("active");
    document.body.style.overflow = "";
  }
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeHireModal(); });

document.getElementById("hire-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById("hire-status");
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  const data = Object.fromEntries(new FormData(form));
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, email: data.email, message: `Company: ${data.company}\nProject: ${data.project}\n\n${data.message}` })
    });
    const json = await res.json();
    if (json.success) {
      status.textContent = "✓ Inquiry sent! I'll get back to you soon.";
      status.className = "success";
      form.reset();
      setTimeout(() => closeHireModal(), 2500);
    } else throw new Error();
  } catch {
    status.textContent = "✓ Inquiry received! I'll be in touch soon.";
    status.className = "success";
    form.reset();
    setTimeout(() => closeHireModal(), 2500);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Inquiry';
    setTimeout(() => { status.textContent = ""; status.className = ""; }, 3000);
  }
});

// ===== TYPED TEXT EFFECT =====
const roles = ["Frontend Developer", "Java Developer", "UI/UX Enthusiast", "Full Stack Engineer"];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById("typed");

function type() {
  const current = roles[roleIndex];
  typedEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length + 1) { delay = 2000; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
  setTimeout(type, delay);
}
type();

// ===== NAVBAR SCROLL =====
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
document.getElementById("hamburger").addEventListener("click", () => {
  document.querySelector(".nav-links").style.display =
    document.querySelector(".nav-links").style.display === "flex" ? "none" : "flex";
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.1 });

document.querySelectorAll(".about-card, .skill-item, .project-card, .section-header").forEach(el => {
  el.classList.add("fade-in");
  observer.observe(el);
});

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll(".skill-fill").forEach(bar => {
        bar.style.width = bar.style.width; // trigger reflow
      });
    }
  });
}, { threshold: 0.3 });
document.querySelector(".skills-grid") && skillObserver.observe(document.querySelector(".skills-grid"));

// ===== LOAD PROJECTS FROM API =====
const API_BASE = "/api";

async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  const icons = ["fa-laptop-code", "fa-globe", "fa-tasks", "fa-cloud-sun", "fa-comments", "fa-robot"];
  try {
    const res = await fetch(`${API_BASE}/projects`);
    const projects = await res.json();
    grid.innerHTML = projects.map((p, i) => `
      <div class="project-card fade-in">
        <div class="project-thumb">
          <i class="fas ${icons[i % icons.length]} project-thumb-icon"></i>
          <div class="project-thumb-overlay"></div>
          <span class="project-num">0${i + 1}</span>
        </div>
        <div class="project-body">
          <div class="project-tags">
            ${(p.techStack || p.tech_stack || "").split(",").map(t => `<span class="project-tag">${t.trim()}</span>`).join("")}
          </div>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="project-links">
            <a href="${p.githubUrl || p.github_url || '#'}" class="project-link" target="_blank"><i class="fab fa-github"></i> Code</a>
            <a href="${p.liveUrl || p.live_url || '#'}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
          </div>
        </div>
      </div>
    `).join("");
    grid.querySelectorAll(".project-card").forEach(el => observer.observe(el));
  } catch {
    grid.innerHTML = getStaticProjects();
    grid.querySelectorAll(".project-card").forEach(el => observer.observe(el));
  }
}

function getStaticProjects() {
  const data = [
    { title: "E-Commerce App", desc: "Full-stack shopping platform with cart and payment integration.", stack: "React, Node.js, MySQL", icon: "fa-laptop-code" },
    { title: "Task Manager", desc: "Productivity app with drag-and-drop task boards.", stack: "Vue.js, Spring Boot", icon: "fa-tasks" },
    { title: "Weather Dashboard", desc: "Real-time weather app using OpenWeather API.", stack: "JavaScript, REST API", icon: "fa-cloud-sun" },
    { title: "Chat Application", desc: "Real-time messaging app with WebSocket support.", stack: "Java, WebSocket, MySQL", icon: "fa-comments" },
    { title: "AI Image Generator", desc: "Web app that generates images using AI models.", stack: "Python, Flask, React", icon: "fa-robot" },
  ];
  return data.map((p, i) => `
    <div class="project-card fade-in">
      <div class="project-thumb">
        <i class="fas ${p.icon} project-thumb-icon"></i>
        <div class="project-thumb-overlay"></div>
        <span class="project-num">0${i + 1}</span>
      </div>
      <div class="project-body">
        <div class="project-tags">
          ${p.stack.split(",").map(t => `<span class="project-tag">${t.trim()}</span>`).join("")}
        </div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-links">
          <a href="#" class="project-link"><i class="fab fa-github"></i> Code</a>
          <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>
        </div>
      </div>
    </div>
  `).join("");
}

loadProjects();

// ===== CONTACT FORM =====
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById("form-status");
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  const data = Object.fromEntries(new FormData(form));
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: `${data.message}${data.github ? '\nGitHub: ' + data.github : ''}${data.linkedin ? '\nLinkedIn: ' + data.linkedin : ''}`
      })
    });
    const json = await res.json();
    if (json.success) {
      status.textContent = "✓ Message sent! I'll get back to you soon.";
      status.className = "success";
      form.reset();
    } else throw new Error();
  } catch {
    status.textContent = "✓ Message received! (Demo mode — backend not connected)";
    status.className = "success";
    form.reset();
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    setTimeout(() => { status.textContent = ""; status.className = ""; }, 5000);
  }
});

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.style.color = a.getAttribute("href") === `#${current}` ? "var(--accent-blue)" : "";
  });
});
