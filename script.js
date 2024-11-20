let t1 = gsap.timeline({ paused: true });
let t2 = gsap.timeline({ paused: true });

let flap = CSSRulePlugin.getRule(".envelope::before");

if (flap) {
    t1.set('.letter', {
        zIndex: 40
    })
    .to(flap, { 
        duration: 0.5, 
        cssRule: {
            rotateX: 180
        }
    })
    .set(flap, {
        cssRule: {
            zIndex: 10
        }
    })
    .to('.letter', {
        translateY: -200,
        duration: 0.5,
        ease: "back.inOut(1.5)"
    })
    .to('.letter', {
        duration: 0.5,
        ease: "back.out(0.4)",
        translateY: -5,
        translateZ: 250
    });

    t2.to('.shadow', {
        delay: 1.4,
        width: 450,
        boxShadow: "-75px 150px 10px 5px #fce4ec",
        ease: "back.out(0.2)",
        duration: 0.7
    });

    function openCard() {
        t1.play();
        t2.play();
        document.querySelector('.letter').classList.add('open');

        // Play the music
        const music = document.getElementById("background-music");
        music.play();

        document.querySelector('.background').classList.add('blurred');
        document.querySelector('.falling-sunflowers').classList.add('blurred');
        document.querySelector('.falling-images').classList.add('blurred');
        createFallingSunflower();
    }

    function closeCard() {
        t1.reverse();
        t2.reverse();
        document.querySelector('.letter').classList.remove('open');
        document.querySelector('.background').classList.remove('blurred');
        document.querySelector('.falling-sunflowers').classList.remove('blurred');
        document.querySelector('.falling-images').classList.remove('blurred');
    }
} else {
    console.error("Flap rule not found.");
}

function createFallingSunflower() {
    const sunflower = document.createElement('div');
    sunflower.classList.add('sunflower');
    sunflower.style.left = `${Math.random() * 100}vw`;
    const size = 20 + Math.random() * 60;
    sunflower.style.width = `${size}px`;
    sunflower.style.height = `${size}px`;
    sunflower.style.animationDuration = `${5 + Math.random() * 5}s`;
    document.querySelector('.falling-sunflowers').appendChild(sunflower);
    sunflower.addEventListener('animationend', () => {
        sunflower.remove();
    });
}

setInterval(createFallingSunflower, 2500);

function createFallingImage(imageUrl) {
    const image = document.createElement('div');
    image.classList.add('falling-image');
    image.style.backgroundImage = `url(${imageUrl})`;
    image.style.left = `${Math.random() * 100}vw`;
    const size = 20 + Math.random() * 60;
    image.style.width = `${size}px`;
    image.style.height = `${size}px`;
    image.style.animationDuration = `${5 + Math.random() * 5}s`;
    document.querySelector('.falling-images').appendChild(image);
    image.addEventListener('animationend', () => {
        image.remove();
    });
}

setInterval(() => {
    createFallingImage('pink_heart_falls.png');
}, 2500);

let piggy;

function createWalkingCharacter(imageClass, container) {
    if (container.querySelector(`.${imageClass}`)) {
        return;
    }
    const character = document.createElement('div');
    character.classList.add('falling-character', imageClass);
    character.style.bottom = '0';
    container.appendChild(character);
    return character;
}

function openCard() {
    const container = document.querySelector('.letter .falling-characters');
    if (!piggy) {
        piggy = createWalkingCharacter('pig', container);
    }
    piggy.classList.add('walking');
    createFallingSunflower();
}

function closeCard() {
    if (piggy) piggy.remove();
    piggy = null;
}

const audio = new Audio('your-audio-file.mp3');
const volumeIcon = document.getElementById('volume-icon');

function toggleAudio() {
    if (audio.paused) {
        audio.play();
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-xmark');  // Change to a different icon when playing
    } else {
        audio.pause();
        volumeIcon.classList.remove('fa-volume-xmark');
        volumeIcon.classList.add('fa-volume-high');  // Change back when paused
    }
}

function changeBackgroundImage() {
    document.body.style.backgroundImage = "url('background.jpg')";
}


