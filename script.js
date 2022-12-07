const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = 600;
const canvasHeight = canvas.height = 600;
const animationDescription = document.getElementById('animationInfo');

const playerImage = new Image();
playerImage.src = './shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 2;
const spriteAnimations = [];
const animations = [
    {
        name: 'idle',
        frames: 7,
        key: 'Digit2',
        description: 'El perro está inactivo'
    },
    {
        name: 'jump',
        frames: 7,
        key: 'Digit3',
        description: 'El perro salta'
    },
    {
        name: 'fall',
        frames: 7,
        key: 'Digit4',
        description: 'El perro se cae'
    },
    {
        name: 'run',
        frames: 9,
        key: 'Digit1',
        description: 'El perro corre'
    },
    {
        name: 'dizzy',
        frames: 11,
        key: 'Digit5',
        description: 'El perro está mareado'
    },
    {
        name: 'sit',
        frames: 5,
        key: 'Digit6',
        description: 'El perro está sentado'
    },
    {
        name: 'roll',
        frames: 7,
        key: 'Digit7',
        description: 'El perro está rodando'
    },
    {
        name: 'bite',
        frames: 7,
        key: 'Digit8',
        description: 'El perro muerde'
    },
    {
        name: 'ko',
        frames: 12,
        key: 'Digit9',
        description: 'El perro está KO'
    },
    {
        name: 'getHit',
        frames: 4,
        key: 'Digit0',
        description: 'El perro es golpeado'
    },
];

animations.forEach((state, index) => {
    let frames = {
        loc: [],
    }

    for (let i = 0; i < state.frames; i++){
        let positionX = i * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }

    spriteAnimations[state.name] = frames;
});

function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[selectedAnimation].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[selectedAnimation].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    
    gameFrame++;
    requestAnimationFrame(animate);
}

const defaultAnimation = animations[3].name;
const defaultAnimationDescription = animations[3].description

let selectedAnimation = defaultAnimation;
animationDescription.innerText = defaultAnimationDescription;

document.addEventListener('keypress', (event) => {
    let keyPressed = event.code;

    function checkAnimation () {
        animations.forEach((animation) => {
            if (animation.key === keyPressed) {
                selectedAnimation = animation.name;
                animationDescription.innerText = animation.description
            }
        })
    }

    return checkAnimation();
});


animate();