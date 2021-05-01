document.addEventListener('DOMContentLoaded', () => {
  const theme = document.getElementById('theme');
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    theme.href = storedTheme;
  }

  themeToggle.addEventListener('click', () => {
    //if light mode
    if (theme.href.includes('light')) {
      theme.href = 'css/main_dark.css';
    }
    else {
      theme.href = 'css/main_light.css';
    }

    localStorage.setItem('theme', theme.href);
  })
})
