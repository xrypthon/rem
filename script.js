document.addEventListener('DOMContentLoaded', function () {
  const loginModal = document.getElementById('login-modal');
  const mainContent = document.getElementById('main-content');
  const passwordInput = document.getElementById('password-input');
  const loginBtn = document.getElementById('login-btn');
  const loginError = document.getElementById('login-error');

  const authorizedUsers = [
    'angel',
    'abhishek',
    'tapesh',
    'soni',
    'dhruv',
    'aman',
    'bhanesh',
    'adarsh'
  ];

  function grantAccess() {
    loginModal.style.display = 'none';
    mainContent.style.display = 'block';
    initGallery();
  }

  loginBtn.addEventListener('click', tryLogin);

  passwordInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') tryLogin();
  });

  function tryLogin() {
    const enteredName = passwordInput.value.trim().toLowerCase();

    if (authorizedUsers.includes(enteredName)) {
      grantAccess();
    } else {
      loginError.textContent = 'Access denied. ';
      passwordInput.focus();
    }
  }

  const pdfData = [
    {
      id: 1,
      title: "साहित्य सागर",
      description: "* _ * Hindi ",
      category: "literature",
      file: "SAHITYA SAGAR.pdf",
      size: "22.6 MB",
      pages: 56,
      date: "2023-01-10",
      featured: true
    },
    {
      id: 2,
      title: "Shakespeare's Julius Caesar",
      description: "The complete play of Julius Caesar by Willim Shakespeare.",
      category: "drama",
      file: "SHAKESPEARE'S JULIUS CAESAR.pdf",
      size: "9.79 MB",
      pages: 16,
      date: "2023-02-15"
    },
    {
      id: 3,
      title: "Treasure Chest",
      description: "A collection of short stories and poems for English learners.",
      category: "stories",
      file: "TREASURE-CHEST.pdf",
      size: "22.3 MB",
      pages: 32,
      date: "2023-03-20",
      featured: true
    },
    {
      id: 4,
      title: "English Grammar",
      description: "Comprehensive guide to English grammar rules and usage.",
      category: "grammar",
      file: "English Grammar.pdf",
      size: "15.1 MB",
      pages: 35,
      date: "2023-04-05"
    },
    {
      id: 5,
      title: "एकांकी संचय",
      description: "Collection of one-act plays in Hindi literature.",
      category: "drama",
      file: "EKANKI SANCHAY.pdf",
      size: "20.6 MB",
      pages: 48,
      date: "2023-05-12"
    }
  ];

  const cardContainer = document.getElementById('card-container');
  const searchInput = document.getElementById('search-input');
  const filterControls = document.getElementById('filter-controls');
  const filterBtn = document.getElementById('filter-btn');
  const themeToggle = document.getElementById('theme-toggle');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let currentFilter = 'all';
  let currentSearch = '';

  function initGallery() {
    renderCards(pdfData);
    setupEventListeners();
    checkThemePreference();
  }

  function renderCards(pdfs) {
    cardContainer.innerHTML = '';

    if (pdfs.length === 0) {
      cardContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <i class="far fa-folder-open"></i>
          </div>
          <h3 class="empty-title">No documents found</h3>
          <p class="empty-description">Try adjusting your search or filter criteria to find what you're looking for.</p>
          <button class="btn btn-primary" id="reset-filters">
            <i class="fas fa-undo"></i>
            Reset filters
          </button>
        </div>
      `;

      document.getElementById('reset-filters')?.addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        setActiveFilter('all');
        filterCards();
      });
      return;
    }

    pdfs.forEach((pdf, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.animationDelay = `${index * 0.1}s`;
      card.dataset.category = pdf.category;

      card.innerHTML = `
        <div class="card-preview" onclick="window.open('${pdf.file}', '_blank')">
          ${pdf.featured ? '<span class="card-badge">Featured</span>' : ''}
          <iframe src="${pdf.file}#toolbar=0&navpanes=0&view=fitH" loading="lazy"></iframe>
        </div>
        <div class="card-content">
          <h3 class="card-title" onclick="window.open('${pdf.file}', '_blank')">${pdf.title}</h3>
          <div class="card-meta">
            <span class="card-meta-item">
              <i class="fas fa-file-alt"></i>
              ${pdf.pages} pages
            </span>
            <span class="card-meta-item">
              <i class="fas fa-database"></i>
              ${pdf.size}
            </span>
            <span class="card-meta-item">
              <i class="fas fa-calendar-alt"></i>
              ${new Date(pdf.date).toLocaleDateString()}
            </span>
          </div>
          <p class="card-description">${pdf.description}</p>
          <div class="card-actions">
            <a href="${pdf.file}" class="download-link" download>
              <i class="fas fa-download"></i>
              Open in new Tab
            </a>
            <button class="action-btn" onclick="window.open('${pdf.file}', '_blank')">
              <i class="fas fa-expand"></i>
            </button>
          </div>
        </div>
      `;

      cardContainer.appendChild(card);
    });
  }

  function filterCards() {
    let filteredPdfs = pdfData;

    if (currentFilter !== 'all') {
      filteredPdfs = filteredPdfs.filter(pdf => pdf.category === currentFilter);
    }

    if (currentSearch) {
      const searchTerm = currentSearch.toLowerCase();
      filteredPdfs = filteredPdfs.filter(pdf =>
        pdf.title.toLowerCase().includes(searchTerm) ||
        pdf.description.toLowerCase().includes(searchTerm)
      );
    }

    renderCards(filteredPdfs);
  }

  function setActiveFilter(filter) {
    currentFilter = filter;
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
  }

  function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i><span>Light Mode</span>'
      : '<i class="fas fa-moon"></i><span>Dark Mode</span>';
  }

  function checkThemePreference() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode === 'true' || (savedMode === null && prefersDark)) {
      document.body.classList.add('dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
    }
  }

  function setupEventListeners() {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      filterCards();
    });

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        setActiveFilter(btn.dataset.filter);
        filterCards();
      });
    });

    filterBtn.addEventListener('click', () => {
      filterControls.classList.toggle('hidden');
    });

    themeToggle.addEventListener('click', toggleTheme);
  }
});
