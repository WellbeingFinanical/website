// Modern AI Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Animated Counter Function
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format the number display
                if (target === 2.5) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger counter animation when stats section is visible
                if (entry.target.classList.contains('stats-section')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('.features-section, .how-it-works-section, .stats-section, .final-cta-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Ensure how-it-works section is immediately visible since it contains the options
    const howItWorksSection = document.querySelector('.how-it-works-section');
    if (howItWorksSection) {
        setTimeout(() => {
            howItWorksSection.style.opacity = '1';
            howItWorksSection.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Process flow animation
    const processNodes = document.querySelectorAll('.process-node');
    let currentNode = 0;
    
    function animateProcessFlow() {
        // Remove active class from all nodes
        processNodes.forEach(node => node.classList.remove('active'));
        
        // Add active class to current node
        if (processNodes[currentNode]) {
            processNodes[currentNode].classList.add('active');
        }
        
        // Move to next node
        currentNode = (currentNode + 1) % processNodes.length;
    }
    
    // Start process flow animation
    setInterval(animateProcessFlow, 2000);
    
    // App Screens Carousel functionality
    const appScreens = document.querySelectorAll('.app-screen');
    const indicators = document.querySelectorAll('.indicator');
    let currentScreenIndex = 0;
    
    function showScreen(index) {
        // Remove active class from all screens and indicators
        appScreens.forEach(screen => screen.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current screen and indicator
        if (appScreens[index]) {
            appScreens[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentScreenIndex = index;
    }
    
    function nextScreen() {
        const nextIndex = (currentScreenIndex + 1) % appScreens.length;
        showScreen(nextIndex);
    }
    
    // Auto-rotate app screens every 3 seconds
    if (appScreens.length > 0) {
        setInterval(nextScreen, 3000);
    }
    
    // Add click handlers to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showScreen(index);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.float-element');
        const speed = 0.3;
        
        parallax.forEach(element => {
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-modern');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.modern-feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        heroContent.style.animation = 'slideInLeft 1s ease-out';
        heroVisual.style.animation = 'slideInRight 1s ease-out';
    });
    
    // Add CSS for loading animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .btn-modern {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .modern-feature-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
    
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Add "Coming Soon" functionality to all download buttons
    const downloadButtons = document.querySelectorAll('a[href="#"]');
    downloadButtons.forEach(button => {
        // Only target buttons that contain download-related text
        const buttonText = button.textContent.toLowerCase();
        if (buttonText.includes('download') || buttonText.includes('app store') || buttonText.includes('google play')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create and show coming soon message
                const message = document.createElement('div');
                message.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--primary-color, #0E1026);
                    color: var(--text-white, #F2F2FA);
                    padding: 2rem 3rem;
                    border-radius: 12px;
                    border: 2px solid var(--accent-color, #BC976E);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    z-index: 10000;
                    text-align: center;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    animation: fadeInScale 0.3s ease-out;
                `;
                
                message.innerHTML = `
                    <div style="margin-bottom: 1rem;">
                        <i class="fas fa-clock" style="font-size: 3rem; color: var(--accent-color, #BC976E); margin-bottom: 1rem;"></i>
                    </div>
                    <h3 style="margin: 0 0 1rem 0; font-size: 1.5rem; font-weight: 700;">Coming Soon!</h3>
                    <p style="margin: 0 0 1.5rem 0; color: var(--text-light-grey, #E4E4F0); line-height: 1.5;">
                        The Wellbeing Financial app is currently in development.<br>
                        Get notified when it's ready for download:
                    </p>
                    <form id="comingSoonForm" style="margin-bottom: 1.5rem;">
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <input 
                                type="email" 
                                id="notifyEmail" 
                                placeholder="Enter your email address"
                                required
                                style="
                                    flex: 1;
                                    padding: 0.75rem;
                                    border: 1px solid rgba(255, 255, 255, 0.3);
                                    border-radius: 8px;
                                    background: rgba(255, 255, 255, 0.1);
                                    color: var(--text-white, #F2F2FA);
                                    font-size: 0.95rem;
                                    font-family: inherit;
                                "
                            >
                            <button 
                                type="submit" 
                                style="
                                    background: var(--accent-color, #BC976E);
                                    color: white;
                                    border: none;
                                    padding: 0.75rem 1rem;
                                    border-radius: 8px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    white-space: nowrap;
                                    transition: background 0.3s ease;
                                "
                            >Notify Me</button>
                        </div>
                    </form>
                    <button id="closeComingSoon" style="
                        background: transparent;
                        color: var(--text-light-grey, #E4E4F0);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-size: 0.9rem;
                    ">Maybe later</button>
                `;
                
                // Create backdrop
                const backdrop = document.createElement('div');
                backdrop.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 9999;
                    animation: fadeIn 0.3s ease-out;
                `;
                
                // Add CSS animations
                if (!document.getElementById('comingSoonStyles')) {
                    const styles = document.createElement('style');
                    styles.id = 'comingSoonStyles';
                    styles.textContent = `
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes fadeInScale {
                            from { 
                                opacity: 0; 
                                transform: translate(-50%, -50%) scale(0.8); 
                            }
                            to { 
                                opacity: 1; 
                                transform: translate(-50%, -50%) scale(1); 
                            }
                        }
                        @keyframes fadeOut {
                            from { opacity: 1; }
                            to { opacity: 0; }
                        }
                    `;
                    document.head.appendChild(styles);
                }
                
                // Add to page
                document.body.appendChild(backdrop);
                document.body.appendChild(message);
                
                // Close functionality
                function closeModal() {
                    backdrop.style.animation = 'fadeOut 0.3s ease-out';
                    message.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(() => {
                        if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
                        if (message.parentNode) message.parentNode.removeChild(message);
                    }, 300);
                }
                
                // Email form submission
                document.getElementById('comingSoonForm').addEventListener('submit', async function(e) {
                    e.preventDefault();
                    const email = document.getElementById('notifyEmail').value;
                    const submitBtn = e.target.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    
                    // Show loading state
                    submitBtn.textContent = 'Saving...';
                    submitBtn.disabled = true;
                    
                    try {
                        // Supabase integration for email capture
                        console.log('Attempting to save email to Supabase:', email);
                        
                        const supabaseResponse = await fetch('https://zhmigznmwhnellxwfxni.supabase.co/rest/v1/email_signups', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobWlnem5td2huZWxseHdmeG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTg1MjIsImV4cCI6MjA3MzAzNDUyMn0.jRGwM-X6LJxRM6tHdJbgDJCSAJsQJm4caNmN5Z7gdRc',
                                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobWlnem5td2huZWxseHdmeG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTg1MjIsImV4cCI6MjA3MzAzNDUyMn0.jRGwM-X6LJxRM6tHdJbgDJCSAJsQJm4caNmN5Z7gdRc',
                                'Prefer': 'return=minimal'
                            },
                            body: JSON.stringify({
                                email: email,
                                source: 'coming_soon_popup',
                                user_agent: navigator.userAgent,
                                referrer: document.referrer || 'direct'
                            })
                        });

                        if (supabaseResponse.ok) {
                            console.log('Email successfully saved to Supabase:', email);
                            submitBtn.textContent = '✓ Added!';
                            submitBtn.style.background = '#78B57E'; // Success green
                        } else {
                            throw new Error('Supabase save failed');
                        }
                        
                        // Close modal after short delay
                        setTimeout(() => {
                            closeModal();
                        }, 1500);
                        
                    } catch (error) {
                        console.error('Error saving email to Supabase:', error);
                        
                        // Fallback to localStorage if Supabase fails
                        try {
                            const existingEmails = JSON.parse(localStorage.getItem('wbf_notify_emails') || '[]');
                            if (!existingEmails.some(entry => entry.email === email)) {
                                existingEmails.push({
                                    email: email,
                                    timestamp: new Date().toISOString(),
                                    source: 'coming_soon_popup'
                                });
                                localStorage.setItem('wbf_notify_emails', JSON.stringify(existingEmails));
                                console.log('Email saved to localStorage as backup:', email);
                                submitBtn.textContent = '✓ Saved!';
                                submitBtn.style.background = '#78B57E';
                                
                                setTimeout(() => {
                                    closeModal();
                                }, 1500);
                            } else {
                                submitBtn.textContent = 'Already registered';
                                submitBtn.style.background = '#78B57E';
                                setTimeout(() => {
                                    closeModal();
                                }, 1500);
                            }
                        } catch (localError) {
                            console.error('Error saving to localStorage backup:', localError);
                            submitBtn.textContent = 'Error - Try again';
                            submitBtn.style.background = '#F35D6F'; // Error red
                            setTimeout(() => {
                                submitBtn.textContent = originalText;
                                submitBtn.style.background = '';
                                submitBtn.disabled = false;
                            }, 2000);
                        }
                    }
                });
                
                document.getElementById('closeComingSoon').addEventListener('click', closeModal);
                backdrop.addEventListener('click', closeModal);
                
                // Close on Escape key
                const escHandler = (e) => {
                    if (e.key === 'Escape') {
                        closeModal();
                        document.removeEventListener('keydown', escHandler);
                    }
                };
                document.addEventListener('keydown', escHandler);
            });
        }
    });
    
    console.log('🚀 Wellbeing Financial AI Landing Page Loaded');
});