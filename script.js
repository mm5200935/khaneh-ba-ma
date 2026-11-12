const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

// انتخاب بسته از کارت قیمت و انتقال آن به فرم درخواست
document.querySelectorAll('[data-plan]').forEach(button => {
  button.addEventListener('click', () => {
    const select = document.querySelector('#interest');
    const plan = button.dataset.plan;
    if ([...select.options].some(option => option.value === plan || option.textContent === plan)) {
      select.value = plan;
    }
  });
});

// فرم نمایشی: داده‌ای به سرور ارسال نمی‌شود.
document.querySelector('#contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.trim();
  const message = document.querySelector('#formMessage');
  if (!name || !phone) {
    message.textContent = 'لطفاً نام و شماره تماس را وارد کنید.';
    return;
  }
  message.textContent = `ممنون ${name} عزیز؛ فرم در این نسخه نمایشی فقط در مرورگر بررسی شد و ارسال نشده است.`;
  form.reset();
});

// ظاهر شدن تدریجی بخش‌ها هنگام اسکرول
const revealItems = document.querySelectorAll('.problem-card,.solution-item,.feature-point,.price-card,.market-card,.team-card,.revenue-card');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => {
    item.classList.add('reveal');
    observer.observe(item);
  });
}
