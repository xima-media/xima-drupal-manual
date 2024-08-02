function generateNestedNavigation() {
  const headers = document.querySelectorAll('section h2, section h3, section h4, section h5, section h6');
  const nav = document.createElement('nav');
  nav.classList.add('manual-navigation');
  let currentUl = document.createElement('ul');
  nav.appendChild(currentUl);

  let numbering = [0, 0, 0, 0, 0]; // Array to keep track of counters for h2 to h6
  let lastLevel = 2; // Starting with h2 elements
  const headingToNavLink = new Map(); // Map to track heading IDs to nav links

  headers.forEach((header) => {
    const level = parseInt(header.tagName.substring(1)); // Get level (2 for h2, 3 for h3, etc.)
    numbering[level - 2]++; // Increment the counter for this level

    // Reset lower levels when a higher level tag is encountered
    for (let i = level - 1; i < numbering.length; i++) {
      numbering[i] = 0;
    }

    const li = document.createElement('li');
    const a = document.createElement('a');
    const headerId = header.textContent.replace(/\s+/g, '_').toLowerCase();

    header.id = headerId;
    a.href = `#${headerId}`;
    a.textContent = numbering.slice(0, level - 1).join('.') + '. ' + header.textContent;
    a.classList.add('nav-link'); // Add a class for styling

    // Store a reference to the link
    headingToNavLink.set(headerId, a);

    a.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default anchor link behavior
      document.getElementById(headerId).scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start' // Aligns the scrolled-to element at the top of the viewport
      });
    });
    li.appendChild(a);

    if (level > lastLevel) {
      const newUl = document.createElement('ul');
      currentUl.lastChild.appendChild(newUl);
      currentUl = newUl;
    } else if (level < lastLevel) {
      // Climb up the ul hierarchy
      for (let i = level; i < lastLevel; i++) {
        currentUl = currentUl.parentNode.parentNode;
      }
    }

    currentUl.appendChild(li);
    lastLevel = level;
  });

  // Insert the <nav> element after each <h1>
  const h1Elements = document.querySelectorAll('section h1');
  h1Elements.forEach(h1 => {
    h1.insertAdjacentElement('afterend', nav); // Insert the nav element after each <h1>
  });

  // Set up Intersection Observer
  let currentActiveNavLink = null; // Track the currently active navigation link

  const observer = new IntersectionObserver((entries) => {
    let closestEntry = null;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Determine if this entry should be considered as closest
        if (!closestEntry || entry.boundingClientRect.top < closestEntry.boundingClientRect.top) {
          closestEntry = entry;
        }
      }
    });

    if (closestEntry) {
      // Update the active class based on the closest entry
      const id = closestEntry.target.id;
      const navLink = headingToNavLink.get(id);

      if (currentActiveNavLink && currentActiveNavLink !== navLink) {
        currentActiveNavLink.classList.remove('active');
      }

      navLink.classList.add('active');
      currentActiveNavLink = navLink;
    }
  }, {
    threshold: 0.5, // Trigger when at least 50% of the heading is visible
    rootMargin: '0px 0px -50% 0px' // Adjust the margins if needed
  });

  // Observe each heading
  headers.forEach(heading => {
    observer.observe(heading);
  });
}