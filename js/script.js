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
                        values: {
                            'US': '#60a5fa', 'SG': '#60a5fa', 'ID': '#60a5fa', 'MY': '#60a5fa', 'CN': '#60a5fa', 
                            'NZ': '#60a5fa', 'IN': '#60a5fa', 'TW': '#60a5fa', 'JP': '#60a5fa', 'KR': '#60a5fa', 
                            'TH': '#60a5fa', 'FR': '#60a5fa', 'ES': '#60a5fa', 'PT': '#60a5fa', 'MO': '#60a5fa', 
                            'VN': '#60a5fa', 'DK': '#60a5fa', 'NO': '#60a5fa', 'BE': '#60a5fa', 'NL': '#60a5fa', 
                            'HK': '#60a5fa', 'IT': '#60a5fa', 'GB': '#60a5fa', 'CH': '#60a5fa', 'AT': '#60a5fa', 'TR': '#60a5fa',
                            'DE': '#f59e0b', 'AU': '#f59e0b', 'CA': '#f59e0b', 'PE': '#f59e0b'
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
