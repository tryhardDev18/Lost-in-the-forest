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
const footer = document.getElementById("footer")
const github = document.getElementById("github")
const linkedin = document.getElementById("linkedin")
const tiktok = document.getElementById("tiktok")

footer.style.display = "none"
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
    ],
  },

    windowPeek: {
    background: "cabinwindow",
    text: "You try to look through the windows but the curtains are blocking your view.",
    choices: [
      { text: "Open the door → go inside the cabin", next: "insideCabin" },
      { text: "Go back → stand at the entrance of the cabin", next: "entrancecabin" },
      { text: "", next: "" },
      { text: "", next: "" }
    ],
  },

    insideCabin: {
    background: "insidecabin",
    text: "The cabin is small but dry. A table, some shelves, and a single closed door leading deeper inside. The place feels strangely warmer, like someone was here recently.",
    choices: [
      { text: "Look at the table → scratched marks", next: "table" },
      { text: "Look at the shelves → old objects", next: "shelves" },
      { text: "Try the door → locked", next: "doorLocked" },
      { text: "Sit and rest → slight memory flash", next: "cabinRest" }
    ],
  },

    table: {
    background: "table",
    text: "You see scratches, maybe someone carved a symbol here.",
    choices: [
      { text: "Keep exploring → examine other things", next: "insideCabin" },
      { text: "Sit and rest → slight memory flash", next: "cabinRest" },
      { text: "", next: "" },
      { text: "", next: "" }
    ],
  },

    shelves: {
    background: "shelves",
    text: "Old jars, Dusty bottle, Some books and an old camera. Nothing useful...",
    choices: [
      { text: "Keep exploring → examine other things", next: "insideCabin" },
      { text: "Sit and rest → slight memory flash", next: "cabinRest" },
      { text: "", next: "" },
      { text: "", next: "" }
    ],
  },

    doorLocked: {
    background: "doorlocked",
    text: "It’s locked. Something heavy might be behind it.",
    choices: [
      { text: "Keep exploring → examine other things", next: "insideCabin" },
      { text: "Sit and rest → slight memory flash", next: "cabinRest" },
      { text: "", next: "" },
      { text: "", next: "" }
    ],
  },

    cabinRest: {
    background: "cabinrest",
    text: "Your head hurts. A blurry memory tries to surface, then disappears. Then a sudden click comes from the closed door, like it unlocked itself…",
    choices: [
      { text: "Keep exploring → examine other things", next: "insideCabin1" },
      { text: "Examine the door → see what's inside", next: "insideDoor" },
      { text: "", next: "" },
      { text: "", next: "" }
    ],
  },

    insideCabin1: {
    background: "insidecabin",
    text: "The cabin is small but dry. A table, some shelves, and a single closed door leading deeper inside. The place feels strangely warmer, like someone was here recently.",
    choices: [
      { text: "Look at the table → scratched marks", next: "table" },
      { text: "Look at the shelves → old objects", next: "shelves" },
      { text: "Try the door → see what's inside", next: "insideDoor" },
      { text: "Sit and rest → slight memory flash", next: "cabinRest" }
    ],
  },

    cabinRest1: {
    background: "cabinrest",
    text: "You rest. Maybe it's best to examine the basement?",
    choices: [
      { text: "Keep exploring → examine other things", next: "insideCabin2" },
      { text: "Examine the door → see what's inside", next: "insideDoor" },
      { text: "", next: "" },
      { text: "", next: "" }
    ],
  },

    insideDoor: {
    background: "basement",
    text: "The door creaks open into a narrow hallway lit only by a weak lantern. Dust floats in the air. Wooden stairs lead downward into darkness. A cold breeze rises from below, carrying a faint smell of damp earth.",
    choices: [
      { text: "Go back → you feel scared?", next: "insideCabin2" },
      { text: "Examine the basement → see what's inside", next: "basement" },
      { text: "", next: "" },
      { text: "", next: "" }
    ],
  },

    insideCabin2: {
    background: "insidecabin",
    text: "The cabin is small but dry. A table, some shelves, and a single closed door leading deeper inside. The place feels strangely warmer, like someone was here recently.",
    choices: [
      { text: "Go back to the door → see what's inside", next: "insideDoor" },
      { text: "Sit and rest → rest more", next: "cabinRest1" },
      { text: "", next: "" },
      { text: "", next: "" }
    ],
  },

    basement: {
    background: "basement1",
    text: "The basement is small and empty except for an old table. On it lies a single item covered in dust. The air down here feels colder than upstairs.",
    choices: [
      { text: "Look at the item", next: "itemtake" },
      { text: "Check the corners", next: "cornercheck" },
      { text: "Look behind the table", next: "behindtable" },
      { text: "Take a moment to think", next: "clearHead" }
    ],
  },

    itemtake: {
    background: "basementcompass",
    text: "It’s a compass. The needle keeps pointing in one direction, no matter how you move it.",
    choices: [
      { text: "Take the compass", next: "backoutside" },
      { text: "Hold it tightly", next: "backoutside" },
      { text: "Put it in your pocket", next: "backoutside" },
      { text: "Head back upstairs", next: "backoutside" }
    ],
  },

    cornercheck: {
    background: "basementcompass",
    text: "Just old stones and dirt… but you notice the compass on the table.",
    choices: [
      { text: "Take the compass", next: "backoutside" },
      { text: "Hold it tightly", next: "backoutside" },
      { text: "Put it in your pocket", next: "backoutside" },
      { text: "Head back upstairs", next: "backoutside" }
    ],
  },

    behindtable: {
    background: "basementcompass",
    text: "Nothing there — just a compass on the table.",
    choices: [
      { text: "Take the compass", next: "backoutside" },
      { text: "Hold it tightly", next: "backoutside" },
      { text: "Put it in your pocket", next: "backoutside" },
      { text: "Head back upstairs", next: "backoutside" }
    ],
  },

    clearHead: {
    background: "basementcompass",
    text: "Your head clears a little. You notice a compass on the table.",
    choices: [
      { text: "Take the compass", next: "backoutside" },
      { text: "Hold it tightly", next: "backoutside" },
      { text: "Put it in your pocket", next: "backoutside" },
      { text: "Head back upstairs", next: "backoutside" }
    ],
  },

    backoutside: {
    background: "cabin",
    text: "You step out of the cabin. The forest feels different now—quieter, almost expectant. The compass in your hand points steadily north. Somewhere along that direction, your way forward awaits.",
    choices: [
      { text: "Follow the compass north → deeper into the forest", next: "ontheway" },
      { text: "Walk cautiously along the cabin edge → check for hidden paths", next: "cabinedge" },
      { text: "Climb a nearby tree → scout ahead", next: "scout" },
      { text: "Rest a moment → gather your thoughts", next: "gatherthoughts" }
    ],
  },

    ontheway: {
    background: "ontheway",
    text: "The path winds between tall pines. Sunlight barely reaches the ground. A faint clearing appears ahead.",
    choices: [
      { text: "Follow the compass", next: "follow" },
      { text: "Go back", next: "backoutside" },
      { text: "", next: "" },
      { text: "", next: "" }
    ],
  },

    cabinedge: {
    background: "ontheway",
    text: "You notice faint footprints leading in the same direction as the compass. Following them confirms you’re on the right path.",
    choices: [
      { text: "Follow footprints", next: "follow" },
      { text: "Go back", next: "backoutside" },
      { text: "", next: "" },
      { text: "", next: "" }
    ],
  },

    scout: {
    background: "scout",
    text: "From the top, you see a break in the forest canopy: a small clearing northward. That’s where the compass is pointing.",
    choices: [
      { text: "Follow the compass", next: "follow" },
      { text: "Go back", next: "backoutside" },
      { text: "", next: "" },
      { text: "", next: "" }
    ],
  },

    gatherthoughts: {
    background: "gatherthoughts",
    text: "You feel your memory returning in flashes—enough to know the compass points toward something important.",
    choices: [
      { text: "Follow the compass", next: "follow" },
      { text: "Go back", next: "backoutside" },
      { text: "", next: "" },
      { text: "", next: "" }
    ],
  },

    follow: {
    background: "shadow",
    text: "As you step into the clearing, the shadow emerges from the trees. It stretches and twists unnaturally, always just at the edge of your vision. The forest itself seems alive, pushing you forward. You feel an ominous, threatning energy.",
    choices: [
      { text: "ApproachW̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "approach" },
      { text: "W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "approach" },
      { text: "W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "approach" },
      { text: "W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "approach" }
    ],
  },

    approach: {
    background: "shadowcloser",
    text: "RUNW̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝ ",
    choices: [
      { text: "RUN W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "run" },
      { text: "RUN W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "run" },
      { text: "RUN W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "run" },
      { text: "RUN W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "run" }
    ],
  },

    run: {
    background: "branches2",
    text: "RUNW̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝ ",
    choices: [
      { text: "RUN W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "run1" },
      { text: "RUN W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "run1" },
      { text: "RUN W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "run1" },
      { text: "RUN W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "run1" }
    ],
  },

    run1: {
    background: "ontheway1",
    text: "RUNW̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝ ",
    choices: [
      { text: "RUN W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "run2" },
      { text: "RUN W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "run2" },
      { text: "RUN W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "run2" },
      { text: "RUN W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "run2" }
    ],
  },

    run1: {
    background: "glowend",
    text: "YOU SEE THE END OF THE FOREST W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝ ",
    choices: [
      { text: "GO IN THE LIGHTW̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "wakeup" },
      { text: "GO IN THE LIGHTW̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "wakeup" },
      { text: "GO IN THE LIGHTW̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "wakeup" },
      { text: "GO IN THE LIGHTW̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝W̶̢̌ę̷̈́ ̸̮̀S̸̪̓è̸̢ẽ̵ͅ ̷̢́Ỷ̴͉ö̸͎́ủ̶͉.̶̗͝", next: "wakeup" }
    ],
  },

    wakeup: {
    background: "hospital",
    text: "A blinding white light surrounds you. The forest, the shadow, the chase… it all fades. You feel weight on your body, the steady beep of a heart monitor, the soft hum of machines. Blinking, you realize: you’re lying in a hospital bed.",
    choices: [
      { text: "Next", next: "wakeup1" },
      { text: "Next", next: "wakeup1" },
      { text: "", next: "wakeup" },
      { text: "", next: "wakeup" }
    ],
  },

    wakeup1: {
    background: "hospital",
    text: "The smell of antiseptic fills the air. Sunlight filters through the blinds. You remember… nothing at first. Then flashes: the cabin, the compass, the forest.",
    choices: [
      { text: "Next", next: "wakeup2" },
      { text: "Back", next: "wakeup" },
      { text: "", next: "wakeup" },
      { text: "", next: "wakeup" }
    ],
  },

    wakeup2: {
    background: "hospital",
    text: "Somewhere in the back of your mind, you understand: it was all a dream, or something like it—a reflection of your memory trying to return. You were in a car crash. You have been in a coma for the past 3 weeks...",
    choices: [
      { text: "Next", next: "aftermath" },
      { text: "Back", next: "wakeup1" },
      { text: "", next: "wakeup" },
      { text: "", next: "wakeup" }
    ],
  },

    aftermath: {
    background: "building",
    text: "After the doctors send you home you go to a therapist looking for answers.",
    choices: [
      { text: "Next", next: "aftermath1" },
      { text: "Back", next: "wakeup2" },
      { text: "", next: "wakeup" },
      { text: "", next: "wakeup" }
    ],
  },

    aftermath1: {
    background: "therapist",
    text: "therapist: The forest you experienced in your mind represents the unknown and disoriented state of your subconscious while you were in a coma. Waking up in a strange place, with no memory, mirrors the disorientation and confusion many patients feel when emerging from long unconscious states.",
    choices: [
      { text: "Next", next: "aftermath2" },
      { text: "Back", next: "aftermath" },
      { text: "", next: "wakeup" },
      { text: "", next: "wakeup" }
    ],
  },

    aftermath2: {
    background: "therapist",
    text: "The cabin symbolizes a part of your psyche seeking safety and structure—a familiar anchor in the chaotic mental landscape. Exploring the cabin and basement reflects the mind trying to retrieve fragmented memories, sorting through stored experiences and personal history.",
    choices: [
      { text: "Next", next: "aftermath3" },
      { text: "Back", next: "aftermath1" },
      { text: "", next: "wakeup" },
      { text: "", next: "wakeup" }
    ],
  },

    aftermath3: {
    background: "therapist",
    text: "The compass is your internal guidance system, an intuitive push from your subconscious, directing you toward clarity and coherence as your brain reconstructs your sense of self.",
    choices: [
      { text: "Next", next: "aftermath4" },
      { text: "Back", next: "aftermath2" },
      { text: "", next: "wakeup" },
      { text: "", next: "wakeup" }
    ],
  },

    aftermath4: {
    background: "therapist",
    text: "The shadow chasing you is particularly significant—it represents lost memories and unresolved thoughts pressing on your consciousness. The chase is not meant to harm you, but to motivate your mind to reconnect with those fragments, a symbolic process of reintegration.",
    choices: [
      { text: "Next", next: "aftermath5" },
      { text: "Back", next: "aftermath3" },
      { text: "", next: "wakeup" },
      { text: "", next: "wakeup" }
    ],
  },

    aftermath5: {
    background: "therapist",
    text: "Finally, stepping into the light and waking in the hospital represents the return to reality, where your cognitive and sensory systems re-engage with the world. The lingering sense of the forest reflects the subconscious imprint of trauma and memory: even though you’ve awoken physically, the mind’s journey through disorientation leaves a subtle echo.”",
    choices: [
      { text: "Next", next: "ending" },
      { text: "Back", next: "aftermath4" },
      { text: "", next: "wakeup" },
      { text: "", next: "wakeup" }
    ],
  },

    aftermath5: {
    background: "ending",
    text: "If you enjoyed this story check out my tiktok, github or linkedIn :)",
    choices: [
      { text: "Thanks for playing!", next: "" },
      { text: "Thanks for playing!", next: "" },
      { text: "Thanks for playing!", next: "" },
      { text: "Thanks for playing!", next: "" }
    ],
  },

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
    start.style.display = "none";
    main.style.display = "block";
    main.style.transition = ".5s";
    footer.style.display = "block"
    currentScene = "lvl1"
    renderScene(currentScene)
    lSfx("sfx/ambience.wav")
}

github.addEventListener("click", () => {
  window.open("https://github.com/tryhardDev18")
})

linkedin.addEventListener("click", () => {
  window.open("https://www.linkedin.com/in/luka-ilashvili-32884039b/")
})

tiktok.addEventListener("click", () => {
  window.open("https://www.tiktok.com/@tryharddev3?lang=en")
})