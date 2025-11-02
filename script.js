// ===== HERO TYPED.JS =====
var typed = new Typed(".typed-text", {
  strings: ["Web Developer", "ICT Student"],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 1200,
  startDelay: 300,
  loop: true,
  showCursor: true,
  cursorChar: "|"
});

// ===== FADE-IN SECTIONS ON SCROLL =====
function fadeInOnScroll() {
  // Sections
  document.querySelectorAll("section").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50){
      sec.classList.add("visible");
    }
  });

  // Resume Cards
  document.querySelectorAll(".resume-card").forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50){
      setTimeout(()=>{ card.classList.add("visible"); }, i*150); // stagger
    }
  });

  // Project Cards
  document.querySelectorAll(".project-card").forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50){
      setTimeout(()=>{ card.classList.add("visible"); }, i*200);
    }
  });
}
window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

// ===== SKILL BAR ANIMATION WITH NUMBERS =====
function animateSkills() {
  document.querySelectorAll(".skill-level").forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50){
      const width = el.getAttribute("data-width");
      el.style.width = width;

      // Animate number
      let percentEl = el.parentElement.querySelector(".skill-percent");
      let count = 0;
      const target = parseInt(width);
      const interval = setInterval(()=>{
        if(count < target){
          count++;
          percentEl.textContent = count + "%";
        } else clearInterval(interval);
      }, 10);
    }
  });
}
window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);

// ===== DARK MODE TOGGLE =====
const themeBtn = document.getElementById("theme-toggle");
if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark");
  themeBtn.textContent = "Light Mode";
}
themeBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", ()=>{
  if(window.scrollY > 300) scrollTopBtn.style.display = "flex";
  else scrollTopBtn.style.display = "none";
});
scrollTopBtn.addEventListener("click", ()=>{
  window.scrollTo({top:0, behavior:"smooth"});
});

// ===== CONTACT FORM SUCCESS MESSAGE =====
const form = document.getElementById("contact-form");
const formMsg = document.getElementById("form-msg");
form.addEventListener("submit", (e)=>{
  e.preventDefault(); // prevent reload
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response=>{
    if(response.ok){
      formMsg.textContent = "Message sent successfully!";
      form.reset();
    } else {
      formMsg.textContent = "Oops! Something went wrong.";
      formMsg.style.color = "red";
    }
  }).catch(()=>{
    formMsg.textContent = "Oops! Something went wrong.";
    formMsg.style.color = "red";
  });
});
