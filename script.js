// Initialize EmailJS
(function() {
  emailjs.init(emailjsConfig.publicKey); // Your EmailJS Public Key
})();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});



//  Hero Slider
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex);
}

// Initialize with first slide
showSlide(0);

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// Optional: Pause on hover
const heroSection = document.querySelector('.hero-section');
heroSection.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

heroSection.addEventListener('mouseleave', () => {
  slideInterval = setInterval(nextSlide, 5000);
});

let slideInterval = setInterval(nextSlide, 5000);




// Function to add items to cart

let cart = [];

function addToCart(item, price) {
  const existingItem = cart.find(i => i.name === item);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: item,
      price: parseFloat(price.replace('$', '')),
      quantity: 1
    });
  }
  
  updateCartCounter();
}

// Update cart counter display
function updateCartCounter() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalItems;
  
  // Show/hide cart icon
  const cartIcon = document.getElementById('cart-icon');
  if (totalItems > 0) {
    cartIcon.classList.add('active');
  } else {
    cartIcon.classList.remove('active');
  }
}

// Show cart modal with all items
function showCartModal() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const modalBody = `
    <form id="checkoutForm">
      <div class="mb-3">
        <label for="customerName" class="form-label">Name:</label>
        <input type="text" class="form-control" id="customerName" required>
      </div>
      <div class="mb-3">
        <label for="customerEmail" class="form-label">Email:</label>
        <input type="email" class="form-control" id="customerEmail" required>
      </div>
      
      <h5 class="mt-4">Your Order:</h5>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${cart.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr class="table-active">
              <td colspan="3"><strong>Grand Total</strong></td>
              <td><strong>$${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <button type="submit" class="btn btn-primary w-100 mt-3" style="background: linear-gradient(135deg, #b38a69, #8b5e3c);">Complete Order</button>

    </form>
  `;

  // Create or update modal
  let modal = document.getElementById('cartModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cartModal';
    modal.className = 'modal fade';
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Your Cart</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            ${modalBody}
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.querySelector('.modal-body').innerHTML = modalBody;
  }

  // Initialize modal
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();

  // Handle form submission
  document.getElementById('checkoutForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    submitOrder();
  });
}

// Submit all items in cart
function submitOrder() {
  const name = document.getElementById('customerName').value;
  const email = document.getElementById('customerEmail').value;
  
  const orderDetails = cart.map(item => 
    `${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
  ).join('\n');
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  emailjs.send(emailjsConfig.serviceID, emailjsConfig.templateID, {
    to_name: "Jebena Cafe",
    from_name: name,
    from_email: email,
    message: `ORDER SUMMARY:\n${orderDetails}\n\nTOTAL: $${total.toFixed(2)}`
  }).then(
    () => {
      alert('Order submitted successfully!');
      cart = [];
      updateCartCounter();
      bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
    },
    (error) => {
      console.error('Failed to send order:', error);
      alert('Failed to submit order. Please try again.');
    }
  );
}

// Initialize cart icon click
document.getElementById('cart-icon')?.addEventListener('click', showCartModal);


document.querySelectorAll('[onclick^="openOrderForm"]').forEach(button => {
  const onclick = button.getAttribute('onclick');
  const matches = onclick.match(/openOrderForm\('(.+)', '(.+)'\)/);
  if (matches) {
    button.setAttribute('onclick', `addToCart('${matches[1]}', '${matches[2]}')`);
  }
});



// Contact Form Handling

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const message = document.querySelector('textarea[name="message"]').value;

  emailjs.send(emailjsConfig.serviceID, emailjsConfig.templateID, {
    to_name: "Jebena Cafe",
    from_name: name,
    from_email: email,
    message: message
  }).then(
    () => alert("Message sent successfully!"),
    () => alert("Failed to send message. Please try again.")
  );
});


// Swiper Initialization
new Swiper(".swiper-container", {
  slidesPerView: 3,
  spaceBetween: 10,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// Slider with Scroll Control
class ModernSlider {
  constructor(container) {
    this.container = container;
    this.slides = Array.from(container.querySelectorAll('.slider-item'));
    this.dotsContainer = container.querySelector('.slider-dots');
    this.prevBtn = container.querySelector('.slider-prev');
    this.nextBtn = container.querySelector('.slider-next');
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.scrollLock = false;
    
    this.initDots();
    this.setupEventListeners();
    this.showSlide(0);
    this.startAutoPlay();
  }
  
  initDots() {
    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.showSlide(index));
      this.dotsContainer.appendChild(dot);
    });
    this.dots = Array.from(this.dotsContainer.querySelectorAll('.slider-dot'));
  }
  
  showSlide(index) {
    // Wrap around if at ends
    if (index >= this.slides.length) index = 0;
    if (index < 0) index = this.slides.length - 1;
    
    // Update active states
    this.slides[this.currentIndex].classList.remove('active');
    this.dots[this.currentIndex].classList.remove('active');
    
    this.currentIndex = index;
    
    this.slides[this.currentIndex].classList.add('active');
    this.dots[this.currentIndex].classList.add('active');
    
    // Reset autoplay timer
    this.resetAutoPlay();
  }
  
  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }
  
  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }
  
  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }
  
  setupEventListeners() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Pause on hover
    this.container.addEventListener('mouseenter', () => {
      clearInterval(this.autoPlayInterval);
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.resetAutoPlay();
    });
    
    // Scroll control
    window.addEventListener('scroll', () => {
      const aboutSection = document.querySelector('.about-section');
      const rect = aboutSection.getBoundingClientRect();
      
      // Only animate when section is in view
      if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5) {
        if (!this.scrollLock) {
          this.scrollLock = true;
          this.resetAutoPlay();
        }
      } else {
        this.scrollLock = false;
      }
    });
  }
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.modern-slider-container');
  if (sliderContainer) {
    new ModernSlider(sliderContainer.parentElement);
  }
});




// Ultra-Smooth Swiper Configuration
const reviewsSwiper = new Swiper('.reviews-swiper', {
  // Layout
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  loopAdditionalSlides: 2,
  
  // Smooth transitions
  speed: 1000,
  effect: 'creative',
  creativeEffect: {
    prev: {
      translate: ['-120%', 0, -500],
      rotate: [0, 0, -15],
      opacity: 0
    },
    next: {
      translate: ['120%', 0, -500],
      rotate: [0, 0, 15],
      opacity: 0
    }
  },
  
  // Autoplay with smooth progression
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    waitForTransition: true
  },
  
  // Navigation
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
  // Pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },
  
  // Breakpoints
  breakpoints: {
    768: {
      slidesPerView: 1.2,
      spaceBetween: 40
    },
    992: {
      slidesPerView: 1.5,
      spaceBetween: 50
    }
  }
});

// Add momentum on mouse move
document.querySelector('.reviews-swiper').addEventListener('mousemove', (e) => {
  const swiperWidth = document.querySelector('.reviews-swiper').offsetWidth;
  const xPos = e.clientX / swiperWidth;
  const speed = 1000;
  
  reviewsSwiper.slideTo(
    Math.floor(reviewsSwiper.activeIndex + (xPos - 0.5) * 0.3),
    speed
  );
});

// Pause on hover with fade
document.querySelectorAll('.review-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    reviewsSwiper.autoplay.stop();
    card.style.transform = 'perspective(1000px) rotateY(0deg) translateZ(30px)';
    card.style.boxShadow = '0 40px 60px rgba(0,0,0,0.4)';
  });
  
  card.addEventListener('mouseleave', () => {
    reviewsSwiper.autoplay.start();
    card.style.transform = 'perspective(1000px) rotateY(0deg) translateZ(20px)';
    card.style.boxShadow = '0 30px 50px rgba(0,0,0,0.3)';
  });
});





// Form Submission with Animation
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('.submit-btn');
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual AJAX)
  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    
    // Reset form
    setTimeout(() => {
      this.reset();
      submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
      submitBtn.disabled = false;
      
      // Float all labels back up if fields are empty
      document.querySelectorAll('.floating-label input, .floating-label textarea').forEach(input => {
        const label = input.previousElementSibling;
        if (input.value === '') {
          label.style.top = '25px';
          label.style.fontSize = '1rem';
        }
      });
    }, 2000);
  }, 1500);
});


// Add hover effect to social links
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateX(10px)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateX(0)';
  });
});