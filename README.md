Link: https://lostintheforest.netlify.app/<br>
Make sure to play on a laptop or a pc :)<br>
Im too lazy to optimize it for small screens :((<br>

---

# 🎮 Choice-Based Game Engine (JavaScript)

This project is a **lightweight, JavaScript-based choice-driven game engine** designed for creating interactive narrative games directly in the browser.

The included forest story is **only a demo** to showcase how scenes, choices, audio, and progression work. The engine itself is flexible and can be reused to build entirely different stories with minimal changes.

---

## 🧠 What This Engine Does

The engine allows you to define a game using **scene objects**, each containing:

* background image
* narrative text
* four player choices
* scene transitions
* sound effects

All game logic is data-driven — adding or modifying a scene requires **no changes to the core engine code**.

---

## 🧱 Create Your Own Game

This engine is **story-agnostic**. To create your own game, you only need to define scenes — no changes to the engine core are required.

### 1️⃣ Define Scenes

Games are built using a single `scenes` object. Each scene acts as a **node** in a scene graph.

```js
const scenes = {
  start: {
    background: "forest",
    text: "You wake up with no memory of how you got here.",
    choices: [
      { text: "Walk forward", next: "path" },
      { text: "Look around", next: "clearing" },
      { text: "Call out", next: "echo" },
      { text: "Stay still", next: "silence" }
    ]
  }
}
```

## ⚙️ Core Features

* Choice-based scene system (4 choices per scene)
* Scene graph / branching logic
* Typewriter text effect
* Scene-based background rendering
* Looping ambient SFX per scene
* Click & hover sound triggers
* Simple state handling
* No external libraries or frameworks

---

Each scene supports:

* `background` → scene background asset
* `text` → narrative content
* `choices[]` → up to four selectable paths
* `next` → target scene key

---

## 🧩 Engine Structure

* `scenes` object defines the entire game flow
* `renderScene()` handles transitions and rendering
* Choices automatically route to the next scene
* Audio is managed per scene (looping & one-shot SFX)
* Easily extendable with inventory, flags, or variables

---

## 🧪 Demo Story

The demo game is a psychological mystery where the player wakes up in a forest with no memory.
It exists purely to demonstrate:

* branching paths
* atmosphere control
* narrative pacing
* scene transitions

You can replace it with your own story by editing the `scenes` object.

---

## 🛠 Built With

* Vanilla JavaScript
* HTML
* CSS

No frameworks. No engines. Just logic.

---

### 2️⃣ Scene Graph Logic

Scenes connect by referencing each other through `next`.

This creates:

* linear paths
* branching narratives
* looping structures
* soft-gated progression

The engine resolves transitions automatically.

---

### 3️⃣ Rendering & Flow

The engine handles:

* background rendering
* text typing effects
* audio playback
* button updates
* scene transitions

You only focus on **story structure**, not UI logic.

---
