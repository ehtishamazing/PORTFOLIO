// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Preloader Logic
window.addEventListener("load", () => {
  const tl = gsap.timeline();

  // Animate the cube cluster from the corners (10 items blasting in)
  tl.fromTo(".pm-1", { x: -300, y: -300, opacity: 0, rotation: -30 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.2)" }, 0)
    .fromTo(".pm-2", { x: 300, y: -300, opacity: 0, rotation: 30 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.2)" }, 0.1)
    .fromTo(".pm-3", { x: -300, y: 300, opacity: 0, rotation: -30 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.2)" }, 0.2)
    .fromTo(".pm-4", { x: 300, y: 300, opacity: 0, rotation: 30 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.2)" }, 0.3)
    .fromTo(".pm-5", { x: -200, y: -200, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.2)" }, 0.4)
    .fromTo(".pm-6", { x: 200, y: -200, opacity: 0, rotation: 20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.2)" }, 0.5)
    .fromTo(".pm-7", { x: -200, y: 200, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.2)" }, 0.6)
    .fromTo(".pm-8", { x: 200, y: 200, opacity: 0, rotation: 20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.2)" }, 0.7)
    .fromTo(".pm-9", { x: 300, y: 0, opacity: 0, rotation: 45 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.2)" }, 0.8)
    .fromTo(".pm-10", { x: -300, y: 0, opacity: 0, rotation: -45 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.2)" }, 0.9)
    
  // Fade in the quote text over the cluster
  tl.fromTo(".quote-text", {
    opacity: 0,
    y: 50,
    scale: 1.1,
    letterSpacing: "-0.05em",
    filter: "blur(10px)"
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    letterSpacing: "normal",
    filter: "blur(0px)",
    duration: 1.8,
    ease: "power4.out"
  }, 1)
  .to(".quote-author", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
  }, 1.5)
  .to("#enter-btn", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
  }, 1.5);
});

document.getElementById('enter-btn').addEventListener('click', () => {
  gsap.to("#preloader", {
    yPercent: -100,
    duration: 1.2,
    ease: "power4.inOut",
    onComplete: initHeroAnimations
  });
});

function initHeroAnimations() {
  const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });

  // Stagger in the video and image collage
  heroTimeline.from(".hero-bg-collage > *", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2
  })
  .from(".hero-title-group > *", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.1
  }, "-=1")
  .from(".hero-hook", {
    opacity: 0,
    x: 50,
    duration: 1
  }, "-=0.8");

  // Parallax elements
  gsap.to(".i1", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
  
  gsap.to(".v2", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
}

// Fade up sections
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section.querySelector('.section-head'), {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    }
  });
});

// Cinematic Grid Reveal
gsap.from(".grid-item", {
  y: 100,
  opacity: 0,
  duration: 1.5,
  stagger: 0.3,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".cinematic-grid",
    start: "top 75%",
  }
});

// Custom Video Crop Looping
document.querySelectorAll('video[data-crop]').forEach(video => {
  const cropTime = parseFloat(video.getAttribute('data-crop'));
  video.addEventListener('timeupdate', () => {
    if (video.currentTime >= cropTime) {
      video.currentTime = 0;
      video.play();
    }
  });
});

// Manifesto Section Animations
const manifestoSection = document.querySelector('.manifesto-section');
if (manifestoSection) {
  ScrollTrigger.create({
    trigger: '.manifesto-section',
    start: 'top top',
    end: 'bottom bottom',
    pin: '.manifesto-heading-container',
    pinSpacing: false
  });

  gsap.utils.toArray('.manifesto-content p').forEach(p => {
    gsap.to(p, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: p,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  gsap.to('.manifesto-heading-container', {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.manifesto-conclusion',
      start: 'top 60%',
      toggleActions: 'play none none reverse'
    }
  });
}

// Email Obfuscation
const contactBtn = document.getElementById('contact-btn');
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    const user = 'ehtishams715';
    const domain = 'gmail.com';
    window.location.href = 'mailto:@';
  });
}
