const canvasDiv = document.getElementById("mainCanvas")
const answersDiv = document.getElementById("answers")
const firstAn = document.getElementById("f1st")
const secAn = document.getElementById("s2nd")
const thirdAn = document.getElementById("t3rd")
const FourthAn = document.getElementById("f4th")
const textBox = document.getElementById("mainTxt")
const main = document.getElementById("game")
const start = document.getElementById("start")
const an1 = document.getElementById("1st")
const an2 = document.getElementById("2nd")
const an3 = document.getElementById("3rd")
const an4 = document.getElementById("4th")

main.style.display = "none"





function renderLvl(lvl) {
    canvasDiv.style.backgroundImage = `url('imgs/${lvl}.png')`
    canvasDiv.style.backgroundSize = "contain"
    canvasDiv.style.backgroundRepeat = "no-repeat"
    canvasDiv.style.backgroundPositionX = "center"
    //if anything img resolution is 750x500 rendered
}

let currentScroll = null

function tSfx(src) {
    if (currentScroll) {
        currentScroll.pause()
    }

    currentScroll = new Audio(src)
    currentScroll.play()
}

function lSfx(src) {
    const sound = new Audio(src)
    sound.loop = true
    sound.play()
}

function stopSfx() {
    if (currentScroll) {
        currentScroll.pause()
        currentScroll.currentTime = 0
    }
}

let typewriterTimeouts = []

function typewriter(text) {
    textBox.innerHTML = ""

    typewriterTimeouts.forEach(t => clearTimeout(t))
    typewriterTimeouts = []

    let i = 0
    const totalTime = 5000
    const intervalTime = totalTime / text.length

    for (let i = 0; i < text.length; i++) {
        const timeout = setTimeout(() => {
            textBox.innerHTML += text.charAt(i)
        }, intervalTime * i)

        typewriterTimeouts.push(timeout)
    }
}

firstAn.addEventListener("mouseenter", () => {
    // tSfx("sfx/hover.wav")
})

secAn.addEventListener("mouseenter", () => {
    // tSfx("sfx/hover.wav")
})

thirdAn.addEventListener("mouseenter", () => {
    // tSfx("sfx/hover.wav")
})

FourthAn.addEventListener("mouseenter", () => {
    // tSfx("sfx/hover.wav")
})

//game logic
let currentScene = "lvl1"




const scenes = {
  lvl1: {
    background: "lvl1",
    text: "You wake up on damp moss. The air smells of pine and earth. You can barely remember your own name… everything is a blur. You need to get out of here.",
    choices: [
      { text: "Follow the trail of footprints → maybe someone's been here.", next: "cabin" },
      { text: "Head toward the glowing light → it might guide you.", next: "glowlight" },
      { text: "Climb a tree → see where you are from above.", next: "treetop" },
      { text: "Shout for help → hope someone hears you.", next: "shout" }
    ]
  },

  cabin: {
    background: "cabin",
    text: "You follow the footprints. They disappear after a while, but you spot a small cabin ahead.",
    choices: [
      { text: "Knock on the door → maybe someone lives here.", next: "entrancecabin" },
      { text: "Keep walking → follow the path further.", next: "forestpath" },
      { text: "Rest by a tree → regain energy.", next: "restTree1" },
      { text: "Look around carefully → maybe something is hidden.", next: "forestpath" }
    ]
  },

  entrancecabin: {
    background: "entrancecabin",
    text: "You knock gently. The old wood gives a dull, hollow sound. Nothing answers. But a gust of wind pushes the door slightly… as if it wasn’t fully closed.",
    choices: [
      { text: "Open the door → see inside the cabin.", next: "insideCabin" },
      { text: "Look through a window → peek at the cabin interior", next: "windowPeek" },
      { text: "Step back → observe the surroundings", next: "cabin" },
      { text: "Call out → see if anything reacts", next: "callOut" }
    ]
  },

  callOut: {
    background: "entrancecabin",
    text: "You shout. No one responds...",
    choices: [
      { text: "Open the door → see inside the cabin.", next: "insideCabin" },
      { text: "Look through a window → peek at the cabin interior", next: "windowPeek" },
      { text: "Step back → observe the surroundings", next: "cabin" },
      { text: "Call out → see if anything reacts", next: "callOut" }
    ]
  },

  glowlight: {
    background: "glowlight",
    text: "You move toward the soft, flickering glow. The forest thickens. Fog curls around roots and branches. The path twists unexpectedly.",
    choices: [
      { text: "Approach the light → see what it is", next: "lantern" },
      { text: "Ignore the light → continue deeper into the forest", next: "forestClearing" },
      { text: "Look around carefully → check for clues nearby", next: "forestClearing" },
      { text: "Rest near a tree → regain energy safely", next: "restTree" }
    ]
  },

  treetop: {
    background: "treetop",
    text: "You scramble up a sturdy pine. Branches creak under your weight. From the top, you can see farther than before. The forest stretches endlessly. Smoke rises in the distance.",
    choices: [
      { text: "Head toward the smoke → investigate where it comes from", next: "forestClearing" },
      { text: "Climb higher → try to see even farther", next: "higherTree" },
      { text: "Go back down → explore the ground instead", next: "forestClearing" },
      { text: "Shout from the tree → hope the echo reveals something", next: "shout1" }
    ]
  },

  shout: {
    background: "lvl1",
    text: "You shout loudly, but only the wind replies. The forest seems endless.",
    choices: [
      { text: "Look around → continue exploring", next: "forestClearing" },
      { text: "Turn around → go back to where you woke up", next: "forestClearing" },
      { text: "", next: "" },
      { text: "", next: "" }
    ]
  },

  forestClearing: {
    background: "forestclearing",
    text: "After walking for a while, you reach a small clearing. The fog lifts slightly. Mossy stones form strange arrangements, almost like markers.",
    choices: [
      { text: "Inspect the stone markers → maybe a clue", next: "cabin" },
      { text: "Walk toward the trees in the distance → continue path", next: "cabin" },
      { text: "Rest in the clearing → catch your breath", next: "restTree" },
      { text: "Look around carefully → search for anything unusual", next: "cabin" }
    ]
  },

  lantern: {
    background: "branches1",
    text: "You move closer to the lantern. The fog shifts around it, revealing patterns in the branches.",
    choices: [
      { text: "Take the lantern → carry it", next: "forestClearing" },
      { text: "Follow the branch patterns → see where they lead", next: "forestClearing" },
      { text: "Ignore and continue walking → deeper into the forest", next: "forestClearing" },
      { text: "Rest near the lantern → watch the fog shift", next: "restTree" }
    ]
  },

    higherTree: {
    background: "highertree",
    text: "You climb higher, branches cracking beneath your feet. At this point you cant see anything other than mountains.",
    choices: [
      { text: "Climb down → Go back down and explore the forest", next: "forestClearing" },
      { text: "Go towards the smoke → explore the sign of life", next: "cabin" },
      { text: "", next: "" },
      { text: "", next: "" }
    ]
  },

    shout1: {
    background: "treetop",
    text: "You shout loudly, but only the wind replies. The forest seems endless.",
    choices: [
      { text: "Climb down → Go back down and explore the forest", next: "forestClearing" },
      { text: "Go towards the smoke → explore the sign of life", next: "cabin" },
      { text: "", next: "" },
      { text: "", next: "" }
    ]
  },

    restTree: {
    background: "resting1",
    text: "You sit in the middle of the forest. You feel a strange sense of calm. You feel Content.",
    choices: [
      { text: "Look around → continue exploring", next: "forestClearing" },
      { text: "Turn around → go back to where you woke up", next: "forestClearing" },
      { text: "", next: "" },
      { text: "", next: "" }
    ]
  },

    restTree1: {
    background: "resting1",
    text: "You sit in the middle of the forest. You feel a strange sense of calm. You feel Content.",
    choices: [
      { text: "Look around → continue exploring", next: "forestpath" },
      { text: "Turn around → go back to the cabin", next: "cabin" },
      { text: "", next: "" },
      { text: "", next: "" }
    ]
  },

    forestpath: {
    background: "deadend",
    text: "You come across a dead end. The path ends here.",
    choices: [
      { text: "Try to climb a tree → see where you are", next: "treetop" },
      { text: "Turn around → go back to the cabin", next: "cabin" },
      { text: "", next: "" },
      { text: "", next: "" }
    ]
  },
  // ...continue defining all other scenes like restTree, lookAround, insideCabin, windowPeek, carryLantern, followBranches, forestpath, higherTree, stoneClue
};





function renderScene(scenekey) {
    const scene = scenes[scenekey]
    if (!scene) return


    currentScene = scenekey

    renderLvl(scene.background)
    typewriter(scene.text)
    scroll()

    an1.innerText = scene.choices[0]?.text || ""
    an2.innerText = scene.choices[1]?.text || ""
    an3.innerText = scene.choices[2]?.text || ""
    an4.innerText = scene.choices[3]?.text || ""
}




function scroll() {
    tSfx("sfx/scroll.wav")
}

start.addEventListener("click", startGame)
firstAn.addEventListener("click", () => {
    const next = scenes[currentScene].choices[0]?.next
    if (next) renderScene(next)
})

secAn.addEventListener("click", () => {
    const next = scenes[currentScene].choices[1]?.next
    if (next) renderScene(next)
})

thirdAn.addEventListener("click", () => {
    const next = scenes[currentScene].choices[2]?.next
    if (next) renderScene(next)
})

FourthAn.addEventListener("click", () => {
    const next = scenes[currentScene].choices[3]?.next
    if (next) renderScene(next)
})





function startGame() {
    start.style.display = "none"
    main.style.display = "block"
    main.style.transition = ".5s"
    renderScene("lvl1")
}



    // an1.innerText = ""
    // an2.innerText = ""
    // an3.innerText = ""
    // an4.innerText = ""