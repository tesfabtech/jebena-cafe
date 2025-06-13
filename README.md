# ☕ Jebena Cafe

A modern, responsive café website built for showcasing menu items, taking customer orders, and handling contact inquiries — all powered by EmailJS. Designed with a warm and elegant aesthetic to represent a real-world café experience.

---

## 🌐 Live Demo

🚀 Coming soon

---

## 📌 Features

- 🍽️ **Interactive Menu** – Display of popular coffee and food items
- 🛒 **Cart + Order System** – Users can add items to cart and submit orders via email
- 📬 **Contact Form** – Customers can reach out directly, with form submissions handled via EmailJS
- 🎥 **Video Background** – Enhanced aesthetic with engaging background media
- 📱 **Fully Responsive** – Optimized for desktop, tablet, and mobile devices
- ✨ **Swiper.js Slider** – Smooth image sliders for testimonials or featured sections

---

## 🧰 Built With

- **HTML5**, **CSS3**, **JavaScript (ES6)**
- [**Bootstrap 5**](https://getbootstrap.com/)
- [**Swiper.js**](https://swiperjs.com/)
- [**EmailJS**](https://www.emailjs.com/) – client-side email service

---

## 🔒 Security Note

This project uses **EmailJS Public Key** via a `config.js` file which is:

- ✅ **Excluded from GitHub** via `.gitignore`
- ✅ Never exposed in the public repository

If you're cloning or deploying this project, you must create your own `config.js` file:

```javascript
config.js(function () {
  emailjs.init("YOUR_PUBLIC_KEY_HERE");
})();
```

## 🚀 Getting Started

To run this project locally:

### 1. Clone the repository

```bash
git clone https://github.com/tesfabtech/jebena-cafe.git
```

### 2. Navigate to the folder

```bash
cd jebena-cafe
```

### 3. Configuration

**1. Set up EmailJS:**
Get your keys from [EmailJS Dashboard](https://dashboard.emailjs.com):

```bash
// config.js
const emailjsConfig = {
  serviceID: "your_service_id",
  templateID: "your_template_id",
  publicKey: "your_public_key"
};
```

⚠️ Never commit config.js to Git!

**2. Customize Content:**

-Update images in /image folder

-Modify text content in index.html

### 4. Open index.html in your browser

-No server needed — everything is client-side.

## 📂 Project Structure

```bash
  jebena-cafe/
├── index.html
├── styles.css
├── script.js
├── config.js (🔒 ignored in Git)
├── image/
│   └── [images, videos, icons...]
├── .gitignore
└── README.md
```

## 💡 Future Enhancements

Backend integration for order tracking

Admin panel for order management

Firebase or Supabase to store orders/messages

## 🤝 Contributing

-Fork the project

-Create your feature branch (git checkout -b feature/AmazingFeature)

-Commit your changes (git commit -m 'Add some amazing feature')

-Push to the branch (git push origin feature/AmazingFeature)

-Open a Pull Request

## 📄 License

This project is open source and available under the **MIT License** .See **LICENSE** for more information.

## ☕ Connect

Email: tesfabtech@gmail.com

Project Link: https://github.com/tesfabtech/jebena-cafe

**Crafted with ☕ and code — inspired by Ethiopian café culture.**
