/* filepath: c:\Users\DELL\Desktop\Nepali Font Covert\assets\js\saas-ui.js */
/**
 * Nepali Font Converter - UI Interactions
 * Handles all user interface interactions including tabs, toggles, 
 * theme switching, and mobile responsiveness
 */

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-open');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mainNav && mainNav.classList.contains('mobile-open') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('#menu-toggle')) {
            mainNav.classList.remove('mobile-open');
            
            // Reset icon
            const icon = menuBtn.querySelector('i');
            if (icon && icon.classList.contains('fa-times')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Dark theme toggle
    const themeBtn = document.getElementById('theme-btn');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    }
    
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Store theme preference
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                
                // Update icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            } else {
                localStorage.setItem('theme', 'light');
                
                // Update icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    }
    
    // Social sharing buttons
    const facebookBtn = document.querySelector('.facebook');
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'facebook-share', 'width=580,height=296');
        });
    }
    
    const twitterBtn = document.querySelector('.twitter');
    if (twitterBtn) {
        twitterBtn.addEventListener('click', function() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Check out this awesome Nepali Font Converter tool!');
            window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, 'twitter-share', 'width=550,height=235');
        });
    }
    
    const whatsappBtn = document.querySelector('.whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Check out this awesome Nepali Font Converter tool: ');
            window.open(`https://api.whatsapp.com/send?text=${text}${url}`, 'whatsapp-share', 'width=550,height=450');
        });
    }
    
    // Feedback link
    const feedbackLink = document.getElementById('feedback-link');
    if (feedbackLink) {
        feedbackLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Simple feedback implementation - can be enhanced with a modal
            alert('Thank you for your interest in providing feedback! This feature will be available soon.');
        });
    }
    
    // Function to show notifications
    window.showNotification = function(message, type = 'success') {
        const notificationsContainer = document.querySelector('.notifications');
        
        if (!notificationsContainer) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        
        const text = document.createElement('span');
        text.textContent = message;
        
        notification.appendChild(icon);
        notification.appendChild(text);
        
        notificationsContainer.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };
});