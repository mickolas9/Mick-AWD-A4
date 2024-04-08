document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Panel fade-in animations
    gsap.utils.toArray('.panel').forEach(panel => {
        gsap.fromTo(panel, { opacity: 0, y: 50 }, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            scrollTrigger: {
                trigger: panel,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            }
        });
    });

    // Crazy font and color change
    const crazy = document.getElementById('crazy');
    const fonts = ["'Courier New', Courier, monospace", "'Times New Roman', Times, serif", "'Arial', sans-serif"];
    const colors = ["#e63946", "#f1faee", "#a8dadc"];
    let index = 0;
    setInterval(() => {
        crazy.style.fontFamily = fonts[index % fonts.length];
        crazy.style.color = colors[index % colors.length];
        index++;
    }, 200);

    // Misfits scatter and gather
    const misfitsContainer = document.querySelector('#misfits');
    const misfitsSpans = misfitsContainer.querySelectorAll('span');

    // Ensuring the container is ready to position its children absolutely
    gsap.set(misfitsContainer, { position: 'relative', display: 'block', width: '100%', height: '100vh' });

    // Dynamically set initial positions for each span to prevent stacking
    misfitsSpans.forEach(span => {
        // Calculate a 'random' transform offset, keeping elements within view
        const offsetX = Math.random() * 100 - 50; // Random offset between -50px and 50px
        const offsetY = Math.random() * 20 - 10; // Smaller vertical offset for a more 'natural' look

        gsap.set(span, {
            transform: `translate(${offsetX}px, ${offsetY}px)`,
            opacity: 1 // Ensure visible if previously set to 0
        });
    });


    // Example of how you might animate them to come together
    ScrollTrigger.create({
        trigger: misfitsContainer,
        start: 'top center',
        onEnter: () => {
            gsap.to(misfitsSpans, {
                x: 0,
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: 'power1.out',
                duration: 1.5,
            });
        },
        // Assuming you want them to scatter again when scrolling back
        onLeaveBack: () => {
            misfitsSpans.forEach(span => {
                const posX = Math.random() * (misfitsContainer.offsetWidth - span.offsetWidth);
                const posY = Math.random() * (misfitsContainer.offsetHeight - span.offsetHeight);
                gsap.to(span, {
                    x: posX,
                    y: posY,
                    opacity: 0,
                    duration: 1.5,
                });
            });
        }
    });

    // Animating round pegs
    const pegs = document.querySelectorAll('#roundPegs span');

    pegs.forEach(span => {
        ScrollTrigger.create({
            trigger: '#roundPegs',
            start: "top center", // Animation starts when the top of #roundPegs hits the center of the viewport
            end: "bottom center", // Animation completes when the bottom of #roundPegs leaves the center
            scrub: true, // Smooth scrubbing effect with scroll
            markers: false, // Helpful for debugging, remove in production
            onEnter: () => gsap.to(span, { borderRadius: '50%', duration: 1 }),
            onLeaveBack: () => gsap.to(span, { borderRadius: '0%', duration: 1 }), // Reverses the animation when scrolling back up
        });
    });
});

gsap.fromTo(".scrolling-circle",
    { x: 0 }, // Explicitly start from 0 for clarity
    {
        x: () => {
            // Calculate the distance needed for the circle to travel
            const containerWidth = document.querySelector("#differentView").clientWidth;
            return containerWidth - document.querySelector(".scrolling-circle").offsetWidth;
        },
        ease: "none",
        scrollTrigger: {
            trigger: "#differentView",
            scrub: true, // Link the animation progress to the scroll position
            start: "top bottom",
            end: "bottom top"
        }
    }
);

document.querySelectorAll('.rules-content span').forEach((span, i) => {
    // Animate each span to move up then back down across a larger distance
    gsap.to(span, {
        y: '-50%', // Move up by half of its height
        rotation: 45, // Optionally add a slight rotation for more dynamism
        ease: 'sine.inOut', // Smooth easing for a more natural feel
        scrollTrigger: {
            trigger: span,
            start: "top bottom-=100", // Trigger earlier as the section comes into view
            end: "bottom top+=100", // Extend the animation range
            scrub: true,
        }
    });
});

const variableText = document.querySelector('.variable-font');

ScrollTrigger.create({
    trigger: '.status-quo-content',
    start: 'top bottom', // When the top of the content hits the bottom of the viewport
    end: 'bottom top', // When the bottom of the content leaves the top of the viewport
    scrub: true, // Smooth scrubbing effect with scroll
    onEnter: () => gsap.to(variableText, { css: { 'font-variation-settings': '"wght" 900' }, ease: "none" }),
    onLeaveBack: () => gsap.to(variableText, { css: { 'font-variation-settings': '"wght" 400' }, ease: "none" })
});
const quote = document.querySelector('#quote');
const quoteMarks = gsap.utils.toArray('#quote .quote-mark');
const disagree = document.querySelector('#disagree');
const glorify = document.querySelector('#glorify');
const vilify = document.querySelector('#vilify');

// Italicize and animate quotation marks for "quote"
ScrollTrigger.create({
    trigger: '#quote',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
    onEnter: () => {
        gsap.to(quote, { fontStyle: "italic", duration: 0.5 });
        gsap.to(quoteMarks, { opacity: 1, scale: 1, duration: 0.5 });
    },
    onLeaveBack: () => {
        gsap.to(quote, { fontStyle: "normal", duration: 0.5 });
        gsap.to(quoteMarks, { opacity: 0, scale: 0, duration: 0.5 });
    },
});

// "Disagree" continuous shake animation
ScrollTrigger.create({
    trigger: '#disagree',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
    onEnter: () => gsap.fromTo(disagree, { x: -5 }, { x: 5, repeat: 5, yoyo: true, duration: 0.2 }),
    onLeaveBack: () => gsap.to(disagree, { x: 0, duration: 0.2 }),
});

// "Glorify" animation starting from black to gold with glow
ScrollTrigger.create({
    trigger: '#glorify',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
    onEnter: () => {
        gsap.fromTo(glorify, { color: "black" }, { color: "gold", textShadow: "0 0 8px gold, 0 0 10px yellow, 0 0 20px orange", ease: "none", duration: 0.5 });
    },
    onLeaveBack: () => gsap.to(glorify, { color: "black", textShadow: "none", duration: 0.5 }),
});

// "Vilify" animation with a red glow effect
ScrollTrigger.create({
    trigger: '#vilify',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
    onEnter: () => {
        gsap.to(vilify, { textShadow: "0 0 10px red, 0 0 20px darkred, 0 0 30px darkred", color: "darkred", ease: "none", duration: 0.5 });
    },
    onLeaveBack: () => gsap.to(vilify, { textShadow: "none", color: "black", duration: 0.5 }),
});

const cannotIgnore = document.querySelector('#cannot-ignore');
const underline = cannotIgnore.querySelector('.underline');

ScrollTrigger.create({
    trigger: '#cannot-ignore',
    start: 'top bottom',
    end: 'top center',
    scrub: true,
    onEnter: () => {
        gsap.to(cannotIgnore, {
            scaleY: 3, // Increase for a more dramatic stretch
            duration: 3,
            ease: "power1.inOut" // Easing for a smoother transition
        });

        gsap.to(underline, {
            transform: 'scaleX(1)', // Reveal the underline
            duration: 1,
            delay: 0.5, // Slight delay before starting the underline animation
            ease: "power1.inOut"
        });
    },
    onLeaveBack: (self) => {
        gsap.to(cannotIgnore, {
            scaleY: 1, // Return to normal size
            duration: 1,
            ease: "power1.inOut"
        });

        gsap.to(underline, {
            transform: 'scaleX(0)', // Hide the underline
            duration: 1,
            ease: "power1.inOut"
        });
    }
});

const letters = document.querySelectorAll('#change-things span');

letters.forEach((letter, i) => {
    gsap.fromTo(letter, {
        scale: 1,
        color: '#000', // Starting color
    }, {
        scrollTrigger: {
            trigger: '#change-things',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            markers: false, // Remove in production
        },
        scale: 1.2, // Adjust scaling as needed
        color: `hsl(${i * 36}, 100%, 100%)`, // Creates a rainbow effect
        ease: 'none',
    });
});

const raceForward = document.getElementById('race-forward');

// Ensure the text starts italicized through JS or directly in CSS
gsap.set(raceForward, { fontStyle: 'italic', opacity: 0 });

// Animation for the racing effect
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '#race-forward',
        start: "top bottom", // Start when the top of the element hits the bottom of the viewport
        end: "top center", // End when the top of the element hits the center
        toggleActions: 'play none none reverse',
    }
});

tl.fromTo(raceForward, {
    x: '-100%', // Starts off-screen to the left
}, {
    x: '0%', // Ends aligned with its normal position
    opacity: 1,
    duration: 3, // Duration of the slide-in effect, adjust as needed
    ease: "power3.out", // Mimics deceleration
    textShadow: "0px 0px 8px rgba(0,0,0,0.5)", // Initial 'smoke' shadow
    onComplete: () => {
        // Animate the 'smoke' dispersing
        gsap.to(raceForward, {
            textShadow: "0px 0px 20px rgba(0,0,0,0)", // Fades and disperses the shadow
            duration: 1,
            ease: "power1.out"
        });
    }
})
    .to(raceForward, {
        fontStyle: 'normal', // Transition to normal font style at the end of the animation
        duration: 0.2, // Short duration for immediate effect
        ease: "power1.out",
    });

const crazyOnes = document.querySelector('.crazy-ones');
const genius = document.querySelector('.genius');
const perceptionShift = document.getElementById('perception-shift');

ScrollTrigger.create({
    trigger: "#perception-shift",
    start: "top center",
    end: "bottom center",
    onUpdate: (self) => {
        const progress = self.progress; // Current scroll progress (0 to 1)

        // Calculate opacity and blur based on scroll progress
        const opacity = progress;
        const blur = 4 - progress * 4;

        // Apply animations to the elements
        gsap.to(crazyOnes, { opacity: opacity, filter: `blur(${blur}px)` });
        gsap.to(genius, { opacity: opacity, filter: `blur(${blur}px)`, fontWeight: progress >= 1 ? "bold" : "normal" });
    }
});