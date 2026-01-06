const content = document.getElementById('app-content');

async function loadPage(path) {
  const page =
    path === '/' ? 'home' : path.replace('/', '');

  const res = await fetch(`/partials/${page}.html`);

  if (!res.ok) {
    content.innerHTML = '<h2>Stran ni bila najdena</h2>';
    return;
  }

  content.innerHTML = await res.text();

setCourseFromPage();
}

function setCourseFromPage() {
  const courseSection = document.querySelector('.course-page');
  const courseField = document.getElementById('courseField');

  if (!courseSection || !courseField) return;

  const courseName = courseSection.dataset.course;
  courseField.value = courseName;
}


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



