const content = document.getElementById('app-content');


async function loadPage(path) {
  const page = path === '/' ? 'home' : path.replace('/', '');
  const res = await fetch(`/partials/${page}.html`);

  if (!res.ok) {
    content.innerHTML = '<h2>Stran ni bila najdena</h2>';
    return;
  }

  content.innerHTML = await res.text();

  window.scrollTo({ top: 0, behavior: 'smooth' });

  setCourseFromPage();
  renderAvailableCourses(); // 👈 ADD THIS
}

async function renderAvailableCourses() {
  const container = document.getElementById('available-courses');
  if (!container) return;

  try {
    const res = await fetch('/api/content/available-courses');
    const courses = await res.json();

    if (!courses.length) {
      container.innerHTML = '<p>Trenutno ni razpisanih tečajev.</p>';
      return;
    }

    container.innerHTML = courses.map(course => `
      <div class="available-course">
        <h3>${course.name}</h3>

        ${course.dates.map(d => {
          const max = d.capacity ?? d.spots;
          const total = d.capacity ?? d.spots;
          const free = d.spots;
          const percent = Math.round(((total - free) / total) * 100);
                  
          return `
            <a
              href="/${course.id}"
              data-link
              class="course-date-link ${d.spots === 0 ? 'disabled' : ''}"
            >
              <div class="course-date occupancy-card">
        
                
        
                <p class="next-date">
                  ${d.label}
                </p>
        
                <p class="occupancy-label">
                  Zasedenost tečaja
                  <span class="occupancy-numbers">${total-free} / ${total}</span>

                </p>

        
                <div class="occupancy-bar">
                  <div
                    class="occupancy-bar-fill"
                    style="width:${percent}%"
                  ></div>
                </div>
        
                <p class="urgency-text">
                  Pohitite s prijavo in plačilom!
                </p>
        
              </div>
            </a>
          `;
        }).join('')}
        

      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load courses:', err);
    container.innerHTML = '<p>Napaka pri nalaganju tečajev.</p>';
  }
}


function setCourseFromPage() {
  const courseSection = document.querySelector('.course-page');
  const courseField = document.getElementById('courseField');

  if (!courseSection || !courseField) return;

  const courseName = courseSection.dataset.course;
  courseField.value = courseName;
}

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.textContent = nav.classList.contains('open') ? 'ZAPRI' : 'MENU';
  });

  nav.addEventListener('click', e => {
    if (e.target.matches('a[data-link]')) {
      nav.classList.remove('open');
      menuToggle.textContent = 'MENU';
    }
  });
});



document.addEventListener('click', e => {
  const link = e.target.closest('[data-link]');
  if (!link) return;

  e.preventDefault();
  const path = link.getAttribute('href');

  history.pushState(null, '', path);
  loadPage(path);
});




window.addEventListener('popstate', () => {
  loadPage(location.pathname);
});

// Initial load
loadPage(location.pathname);



