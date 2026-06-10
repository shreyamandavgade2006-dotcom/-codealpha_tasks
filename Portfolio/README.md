# Shreya Mandavgade Portfolio Website

## Overview

This project is a modern, fully responsive personal portfolio website developed using HTML, CSS, and JavaScript. It showcases professional information, technical skills, projects, education, internships, certifications, and contact details in an interactive and visually engaging format.

The website features advanced UI/UX elements, smooth animations, dark/light theme support, and responsive layouts to provide an excellent user experience across devices.

---

## Features

### User Interface

* Modern glassmorphism design
* Fully responsive layout
* Dark and light theme support
* Custom animated cursor
* Smooth scrolling navigation
* Interactive loading screen
* Scroll progress indicator

### Hero Section

* Animated typing effect
* Interactive spotlight effect
* Particle background animation
* Professional introduction and call-to-action buttons

### About Section

* Personal profile summary
* Academic information
* Contact details
* Animated statistics counters
* Resume download placeholder

### Skills Section

* Categorized technical skills
* Animated progress bars
* Technology badges
* Interactive hover effects

### Projects Section

* Project showcase cards
* Category-based filtering
* Project descriptions and technology tags
* Interactive project animations

### Experience & Education

* Timeline-based layout
* Internship experience details
* Educational background
* Professional achievements

### Certifications & Achievements

* Dedicated section for certifications
* Achievement highlights
* Professional accomplishments

### Contact Section

* Contact form with validation
* Real-time input validation
* Success message feedback
* User-friendly form interactions

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Libraries & Resources

* Font Awesome Icons
* Google Fonts

  * Syne
  * DM Sans

### Browser APIs

* Intersection Observer API
* Local Storage API
* Canvas API
* RequestAnimationFrame

---

## Project Structure

```
portfolio-website/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### File Description

#### index.html

Contains the complete structure of the website including all sections, navigation, and content.

#### style.css

Handles styling, animations, responsiveness, themes, and visual effects.

#### script.js

Manages user interactions, animations, theme switching, form validation, filtering, and dynamic behaviors.

---

## Installation

### Clone the Repository

```bash
git clone <repository-url>
```

### Navigate to Project Directory

```bash
cd portfolio-website
```

### Run Locally

Since modern browsers may restrict some features when opening files directly using the `file://` protocol, it is recommended to use a local development server.

#### Using Python

```bash
python -m http.server 8000
```

or

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## Customization

### Personal Information

Update the following details in `index.html`:

* Name
* About section content
* Contact information
* Social media links
* Education details
* Internship experience

### Projects

Modify the Projects section to add, update, or remove projects.

### Resume

Replace the placeholder resume download link with the actual PDF file path.

Example:

```html
<a href="assets/resume.pdf" download>
  Download Resume
</a>
```

### Theme Colors

Customize colors through CSS variables defined in `:root` inside `style.css`.

---

## Key Functionalities

* Theme persistence using Local Storage
* Dynamic project filtering
* Animated counters
* Scroll-triggered reveal animations
* Responsive navigation menu
* Interactive particle system
* Contact form validation
* Smooth section navigation

---

## Browser Compatibility

Tested and supported on:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari
* Opera

---

## Future Enhancements

* Backend integration for contact form submissions
* Blog section
* Project detail pages
* Resume PDF integration
* GitHub API integration
* Dynamic project management system
* Performance optimization and analytics

---

## Author

**Shreya Mandavgade**

Software Developer | IoT Engineer | Information Technology Student

Focused on building scalable software solutions, intelligent IoT systems, and modern web applications.

---

## License

This project is available for educational and personal portfolio purposes.
