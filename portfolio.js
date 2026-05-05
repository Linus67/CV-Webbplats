// Image Zoom Functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('imageModal');
  const modalImage = document.querySelector('.modal-image');
  const modalClose = document.querySelector('.modal-close');
  const cardImages = document.querySelectorAll('.card-image');

  // Open modal when card image is clicked
  cardImages.forEach(image => {
    image.addEventListener('click', function() {
      modal.classList.add('active');
      modalImage.src = this.src;
      modalImage.alt = this.alt;
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  // Close modal when close button is clicked
  modalClose.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});
