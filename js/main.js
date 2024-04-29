function generateNavigation() {
  // Attempt to select an existing main element
  let main = document.querySelector('main');

  // If there isn't a main element, create one and append it to the body
  if (!main) {
    main = document.createElement('main');
    document.body.appendChild(main);
  }

  const baseUrl = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
  const navContainer = document.createElement('nav');
  // Append the nav container to the main element instead of the body
  main.insertBefore(navContainer, main.firstChild);

  const navList = document.createElement('ol');
  navContainer.appendChild(navList);

  function createNavItem(section) {
    // Create a link for the current section
    const link = document.createElement('a');
    link.href = baseUrl + '#' + section.id;
    link.textContent = section.querySelector('h1, h2, h3, h4, h5, h6').textContent.trim();

    const listItem = document.createElement('li');
    listItem.appendChild(link);
    return listItem;
  }

  function buildNavigationList(container, sections) {
    sections.forEach(section => {
      const item = createNavItem(section);
      container.appendChild(item);

      // Check if there are nested sections within the current section
      const nestedSections = Array.from(section.children).filter(child => child.tagName.toLowerCase() === 'section');
      if (nestedSections.length > 0) {
        const sublist = document.createElement('ul');
        item.appendChild(sublist);
        buildNavigationList(sublist, nestedSections);
      }
    });
  }

  // Find the top-level section that contains the h1, then start with its immediate section children
  const topLevelSection = document.querySelector('section h1').closest('section');
  const sectionsUnderTopLevel = Array.from(topLevelSection.children).filter(child => child.tagName.toLowerCase() === 'section');
  buildNavigationList(navList, sectionsUnderTopLevel);
}

function activateNavigationLinks() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
}
function toggleNav() {
  var nav = document.querySelector("nav");
  if (nav.style.display === "block") {
    nav.style.display = "none";
  } else {
    nav.style.display = "block";
  }
}