document.addEventListener('DOMContentLoaded', function () {
  updateScrollAndProgresBar();
});
document.addEventListener('shopify:section:load', function (event) {
  updateScrollAndProgresBar();
});
document.addEventListener('shopify:section:select', function (event) {
  updateScrollAndProgresBar();
});
function updateScrollAndProgresBar() {
  const blockContainer = document.querySelector('.block-container');
  const blocks = document.querySelectorAll('.block-container-content');
  const progressBarInner = document.querySelector('.progress-bar-inner');
  const checkpoint = document.querySelector('.checkpoint');
  const image = document.querySelector('.custom-media');

  function updateBlocksVisibility() {
    const viewportHeight = window.innerHeight;
    const viewportMiddle = window.scrollY + viewportHeight / 2;

    blocks.forEach((block) => {
      const blockRect = block.getBoundingClientRect();
      const blockTop = blockRect.top + window.scrollY;
      const blockBottom = blockRect.bottom + window.scrollY;
      const isVisible = blockBottom >= window.scrollY && blockTop <= viewportMiddle;

      if (isVisible) {
        block.classList.add('visible');
      } else {
        block.classList.remove('visible');
      }
    });

    updateProgressBar();
  }

  function updateProgressBar() {
    const containerRect = blockContainer.getBoundingClientRect();
    const containerTop = containerRect.top + window.scrollY;
    const containerHeight = Math.max(blockContainer.clientHeight, containerRect.height);

    const viewportMiddle = window.scrollY + window.innerHeight / 2;

    const scrollPosition = Math.max(window.scrollY - containerTop, 0);
    const progress = Math.max(Math.min((scrollPosition / (containerHeight - window.innerHeight)) * 100, 100), 0);

    let visibleHeight = 0;
    blocks.forEach((block) => {
      const blockRect = block.getBoundingClientRect();
      const blockTop = blockRect.top + window.scrollY;
      const blockBottom = blockRect.bottom + window.scrollY;

      if (blockTop < viewportMiddle) {
        visibleHeight += blockRect.height;
      }
    });

    if (checkpoint) {
      const checkpointRect = checkpoint.getBoundingClientRect();
      const checkpointTop = checkpointRect.top - containerRect.top;
      progressBarInner.style.top = `${checkpointTop}px`;
      progressBarInner.style.height = `${Math.min((visibleHeight / containerHeight) * 100, 100)}%`;
    }
  }

  window.addEventListener('scroll', updateBlocksVisibility);

  updateBlocksVisibility();
}