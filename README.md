Reezma Tech Services Showcase
<p align="center"> <img src="screenshots/reezma-preview.png" alt="Reezma Website Preview" width="600"> </p> <p align="center"> A beautiful, responsive CSS-only tech services showcase website with modern animations and design </p>
📋 Overview
Reezma Tech Services Showcase is a lightweight, modern website template built using only HTML and CSS (no JavaScript). It features a collection of animated service cards with an elegant tech-focused design. The project demonstrates advanced CSS techniques including animations, transitions, pseudo-elements, and responsive design principles.

✨ Features
Pure CSS Animations - No JavaScript required for any interactions or effects
Responsive Design - Adapts seamlessly to mobile, tablet, and desktop screens
Modern UI Elements - Gradient backgrounds, hover effects, and smooth transitions
Interactive Components - Animated buttons, cards, and list items
Clean Structure - Separated HTML and CSS files for better organization
Performance Optimized - Lightweight and fast-loading with minimal resources
🖼️ Preview
The showcase features four service cards representing different IT offerings:

Cloud Solutions
Cybersecurity
Data Analytics
Development
Each card includes:

Custom emoji icon
Service title with animated underline
Brief description
Feature list with animated indicators
Call-to-action button with fill effect on hover
🚀 Getting Started
Prerequisites
Any modern web browser (Chrome, Firefox, Safari, Edge)
Basic text editor for modifications
Installation
Clone this repository or download the files:

git clone https://github.com/yourusername/reezma-showcase.git
Open the project folder:

cd reezma-showcase
View the website by opening reezma.html in your web browser.
📁 Project Structure

reezma-showcase/├── reezma.html         # Main HTML structure├── Reezstyle.css       # All CSS styles and animations├── screenshots/        # Preview images for documentation└── README.md           # Project documentation
🎨 Customization
Changing Colors
The color scheme is defined using CSS variables at the top of Reezstyle.css:


:root {    --primary:  #0b4e8d;   /* Change primary color here */    --accent:  #03c6fc;    /* Change accent color here */    --dark:  #0f1218;      /* Change background color here */    --light:  #f5f9ff;     /* Change text color here */    --shadow:  rgba(3, 198, 252, 0.3); /* Change shadow color here */    --gradient: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);}
Adding More Services
To add additional service cards, copy the following HTML structure inside the .services-container div:


<div class="service-card">    <div class="service-icon">        <div class="icon icon-[your-icon-class]"></div>    </div>    <div class="service-content">        <h3 class="service-title">Service Name</h3>        <p class="service-desc">Description of your service goes here.</p>        <ul class="features">            <li class="feature-item">Feature One</li>            <li class="feature-item">Feature Two</li>            <li class="feature-item">Feature Three</li>            <li class="feature-item">Feature Four</li>        </ul>        <a href="#" class="cta-btn">Learn More</a>    </div></div>
Then add a corresponding icon class in the CSS:


.icon-[your-icon-class]::before {    content: '🔧'; /* Replace with your emoji icon */}
🔧 Technical Details
Key CSS Techniques Used
CSS Grid for responsive card layout
CSS Variables for consistent theming
Pseudo-elements for decorative elements
Transform and opacity transitions for smooth animations
Media queries for responsive design
CSS-only hover animations
Custom properties and calculated values
Browser Compatibility
The website is compatible with:

Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)
Mobile browsers (iOS Safari, Android Chrome)
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🤝 Contributing
Contributions are welcome! Feel free to fork this repository and submit pull requests to enhance the functionality or design.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
📬 Contact
Your Name - @your_twitter - your.email@example.com

Project Link: https://github.com/yourusername/reezma-showcase

🙏 Acknowledgements
CSS-Tricks - For inspiration on modern CSS techniques
MDN Web Docs - For comprehensive CSS reference
Google Fonts - For typography inspiration
<p align="center"> Made with ❤️ and CSS </p
