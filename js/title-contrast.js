document.addEventListener('DOMContentLoaded', () => {
  const popupSelectors = '.modal, .portfolio-popup, .popup-image-modal, .legal-popup';
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headings.forEach(heading => {
    if (heading.closest(popupSelectors)) return;

    const originalColor = window.getComputedStyle(heading).color;

    // Wrap text nodes in spans
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(node => {
      const frag = document.createDocumentFragment();
      [...node.textContent].forEach(ch => {
        const span = document.createElement('span');
        span.textContent = ch;
        span.style.display = 'inline-block';
        span.dataset.originalColor = originalColor;
        frag.appendChild(span);
      });
      node.parentNode.replaceChild(frag, node);
    });

    const spans = heading.querySelectorAll('span');

    const isLight = color => {
      const rgb = color.match(/\d+/g);
      if (!rgb) return true;
      const r = parseInt(rgb[0], 10);
      const g = parseInt(rgb[1], 10);
      const b = parseInt(rgb[2], 10);
      const brightness = r * 0.299 + g * 0.587 + b * 0.114;
      return brightness > 210;
    };

    const analyze = () => {
      spans.forEach(span => {
        const rect = span.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const prevSpan = span.style.pointerEvents;
        const prevHeading = heading.style.pointerEvents;
        span.style.pointerEvents = 'none';
        heading.style.pointerEvents = 'none';
        let el = document.elementFromPoint(x, y);
        span.style.pointerEvents = prevSpan;
        heading.style.pointerEvents = prevHeading;

        let bgColor = '';
        let bgImage = '';
        while (el && el !== document.body) {
          const styles = window.getComputedStyle(el);
          bgColor = styles.backgroundColor;
          bgImage = styles.backgroundImage;
          if ((bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') ||
              (bgImage && bgImage !== 'none')) {
            break;
          }
          el = el.parentElement;
        }

        if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
          bgColor = window.getComputedStyle(document.body).backgroundColor || '#fff';
        }

        const useWhite = (bgImage && bgImage !== 'none') ? true : !isLight(bgColor);
        span.style.color = useWhite ? '#fff' : originalColor;
      });
    };

    requestAnimationFrame(analyze);
    window.addEventListener('resize', analyze);
  });
});

