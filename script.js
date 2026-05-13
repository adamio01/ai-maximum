const visual = document.querySelector('#hero-visual');
const shape = document.querySelector('.hero-shape');
const panel = document.querySelector('.floating-panel');

if (visual) {
  visual.addEventListener('mousemove', (event) => {
    const { left, top, width, height } = visual.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;

    const rotateX = y * 10;
    const rotateY = x * 15;
    panel.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    shape.style.transform = `translate(${x * 18}px, ${y * 18}px) rotate(18deg)`;
  });

  visual.addEventListener('mouseleave', () => {
    panel.style.transform = 'rotateX(0deg) rotateY(0deg)';
    shape.style.transform = 'rotate(18deg)';
  });
}

const sections = document.querySelectorAll('section');
const options = { rootMargin: '0px 0px -120px 0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, options);

sections.forEach((section) => observer.observe(section));
