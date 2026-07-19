/* ==========================================================
   PARAG BHANPIYA
   script.js
========================================================== */



/* ==========================================================
   SCROLL PROGRESS BAR
========================================================== */

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

    const scrollTop = window.pageYOffset;

    const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    progressBar.style.width = progress + "%";

});



/* ==========================================================
   HEADER BACKGROUND
========================================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){

        header.style.background = "rgba(255,255,255,.95)";
        header.style.boxShadow = "0 5px 30px rgba(0,0,0,.05)";

    }

    else{

        header.style.background = "rgba(255,255,255,.82)";
        header.style.boxShadow = "none";

    }

});



/* ==========================================================
   FADE-IN ANIMATION
========================================================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll("section").forEach(section=>{

    section.classList.add("fade");

    observer.observe(section);

});



/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});



/* ==========================================================
   SMOOTH SCROLL
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});



/* ==========================================================
   STATS COUNTER
========================================================== */

const statNumbers = document.querySelectorAll(".stat-card h3");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            animate(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

},{
    threshold:.5
});

statNumbers.forEach(number=>{

    counterObserver.observe(number);

});

function animate(element){

    const text = element.innerText;

    const number = parseFloat(text.replace(/[^0-9.]/g,""));

    if(isNaN(number)) return;

    const hasDollar = text.includes("$");
    const hasPercent = text.includes("%");
    const hasPlus = text.includes("+");
    const decimals = (text.match(/\.(\d+)/) || [,""])[1].length;

    let current = 0;

    const increment = number/80;

    const timer = setInterval(()=>{

        current += increment;

        if(current>=number){

            current = number;

            clearInterval(timer);
        }

        let output = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);

        if(hasDollar){

            element.innerText = "$"+output+"K+";

        }

        else if(hasPercent){

            element.innerText = output+"%";

        }

        else if(hasPlus){

            element.innerText = output+"+";

        }

        else{

            element.innerText = text;

        }

    },20);

}



/* ==========================================================
   PROJECT CARD EFFECT
========================================================== */

document.querySelectorAll(".project-card").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x",x+"px");
        card.style.setProperty("--y",y+"px");

    });

});



/* ==========================================================
   PARALLAX HERO
========================================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll",()=>{

    const y = window.scrollY;

    hero.style.transform = `translateY(${y*0.15}px)`;

});



/* ==========================================================
   REDUCE MOTION
========================================================== */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if(prefersReducedMotion.matches){

    document.documentElement.style.scrollBehavior = "auto";

}



/* ==========================================================
   CONSOLE MESSAGE
========================================================== */

console.log(

"%cWelcome 👋",

"font-size:20px;font-weight:bold;color:#111;"

);

console.log(

"Designed & Developed by Parag Bhanpiya"

);
