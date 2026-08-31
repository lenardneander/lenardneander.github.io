document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger once on load
    revealOnScroll();

    // Tabs functionality
    const tabContainers = document.querySelectorAll('.tabs-container');
    
    tabContainers.forEach(container => {
        const section = container.closest('.section');
        const tabBtns = container.querySelectorAll('.tab-btn');
        const tabContents = section.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
                
                setTimeout(revealOnScroll, 50);
            });
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Very simple toggle logic - in a real app you might want to animate this better
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
                navLinks.style.padding = '1rem 0';
                navLinks.style.borderBottom = '1px solid var(--border)';
            }
        });
    }

    // Initialize jsVectorMap for Travel Section
    if (document.getElementById('visited-map')) {
        try {
            new jsVectorMap({
                selector: '#visited-map',
                map: 'world',
                backgroundColor: 'transparent',
                zoomOnScroll: false,
                regionsSelectable: false,
                series: {
                    regions: [{
                        attribute: 'fill',
                        scale: {
                            visited: '#60a5fa',
                            lived: '#f59e0b'
                        },
                        values: {
                            'US': 'visited', 'SG': 'visited', 'ID': 'visited', 'MY': 'visited', 'CN': 'visited', 
                            'NZ': 'visited', 'IN': 'visited', 'TW': 'visited', 'JP': 'visited', 'KR': 'visited', 
                            'TH': 'visited', 'FR': 'visited', 'ES': 'visited', 'PT': 'visited', 'MO': 'visited', 
                            'VN': 'visited', 'DK': 'visited', 'NO': 'visited', 'BE': 'visited', 'NL': 'visited', 
                            'HK': 'visited', 'IT': 'visited', 'GB': 'visited', 'CH': 'visited', 'AT': 'visited', 'TR': 'visited',
                            'DE': 'lived', 'AU': 'lived', 'CA': 'lived', 'PE': 'lived'
                        }
                    }]
                },
                onRegionTooltipShow: function(event, tooltip, code) {
                    if (code === 'CA') {
                        tooltip.text(tooltip.text() + ' - Presented poster at UBC (2022)');
                    } else if (code === 'AU') {
                        tooltip.text(tooltip.text() + ' - Studied at University of Sydney');
                    } else if (code === 'PE') {
                        tooltip.text(tooltip.text() + ' - Volunteer Work at School');
                    } else if (code === 'DE') {
                        tooltip.text(tooltip.text() + ' - Lived & Worked');
                    }
                },
                regionStyle: {
                    initial: {
                        fill: '#cbd5e1',
                        stroke: 'none',
                        strokeWidth: 0,
                        strokeOpacity: 1
                    }
                }
            });
        } catch(e) {
            document.getElementById('visited-map').innerHTML = '<div style="color:red; padding:20px; font-weight:bold;">MAP ERROR: ' + e.message + '</div>';
            console.error('Map error:', e);
        }
    }
});
