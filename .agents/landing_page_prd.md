# PRD: ShadowIntern — Landing Page & Main Menu
### Product Requirements Document v1.0
### Author: UI/UX Lead | Hackathon: Randomize

---

## 1. Executive Summary
The Landing Page is the user's first interaction with **ShadowIntern**. It must establish the "liminal corporate space" atmosphere immediately. Using a curved CRT monitor effect and a recursive "screen-within-a-screen" visual, it sets the tone of being trapped within a system.

The menu serves as the hub for game initialization, history management, and accessibility settings (skipping the 3D intro).

---

## 2. Visual Identity & 3D Atmosphere

### 2.1 The CRT Physical Model
- **Geometry**: A 3D-modeled retro CRT monitor case with a separate `PlaneGeometry` for the screen.
- **Glass Curvature**: The screen plane will use a custom shader or a high-tessellation mesh with a slight bulge to simulate the convex glass of an old monitor.
- **Lighting**: Cinematic spot lights hitting the bezel; emissive glow from the screen reflecting on the "desk" (implied).

### 2.2 The Recursive 3D Mirror
- **Concept**: The monitor screen displays the 3D scene itself, including the monitor, creating a recursive "tunnel" effect.
- **Implementation**: 
  - Use `WebGLRenderTarget` to capture the `Scene` from the main camera's perspective.
  - Apply the resulting texture back onto the Monitor's screen material.
  - **Optimization**: Limit recursive texture resolution and use a `NearestFilter` for the pixelated look.
- **Interactivity**: 
  - On **Mouse Move**: The camera subtly swivels or dollies, causing the recursive tunnel to shift and distort.

### 2.3 Visual Pipeline (3D)
1. **Scene**: Monitor model + Desk + Background darkness.
2. **Buffer A**: Render the Scene to a texture.
3. **Screen Material**: Use Buffer A as the `map` and `emissiveMap`.
4. **Post-Process**: Apply Pixelation, Scanlines, and Chromatic Aberration to the final 3D render.

### 2.3 Typography: "THE FONT"
- **Style**: Old retro bold, heavily pixelated.
- **Technical**: **NO anti-aliasing**. Crispy, jagged edges are mandatory.
- **Primary CTA**: "TAP TO START" or "CLICK TO BEGIN" pulsing slowly in the center of the largest screen.

---

## 3. Functional Requirements: The Main Menu

The menu appears after the initial "Tap to Start" interaction or is overlaid on the CRT screen.

### 3.1 Game Initialization
- **Begin Game**: Starts the 3D scenario (Act 1: The Street). This is the intended "True" beginning.
- **Skip to Work (Direct 2D)**: A "Settings" or "Advanced" toggle that allows skipping the 10-minute 3D narrative and booting directly into the NexusCorp OS (Phase 2).

### 3.2 Data Management & Persistence (The Cache)
- **Clear History**: Wipes the browser's `localStorage` and `cache`, resetting the game to Act 0. Prompt with a corporate-style warning box: *"Warning: Asset liquidation will result in total data loss. Proceed?"*
- **Previous Playthroughs & High Scores**: A log/list showing previous attempts.
  - **High Score**: The maximum "Productivity Score" achieved across all playthroughs, displayed prominently.
  - **Metrics**: Total Productivity, Burnout reached, Ending achieved.
  - **Vibe**: A "Personnel File" layout.

### 3.3 Settings & Configuration
- **Volume**: Master slider (Standard UI but pixelated).
- **Graphics Quality**:
  - **Ultrakill (Low)**: Heavy pixelation (1/4 res), CRT effects on max.
  - **Standard (High)**: 1/2 res, cleaner lines but still stylized.
- **Fullscreen Toggle**: Essential for immersion.

---

## 4. Technical Implementation Strategy

### 4.1 Shader Pipeline
```glsl
// Pincushion Distortion (Fish-eye)
vec2 distort(vec2 uv) {
  vec2 centered = uv - 0.5;
  float dist = dot(centered, centered);
  return uv + centered * (dist * uDistortionPower);
}
```
- Use `EffectComposer` with a custom `ShaderPass` for the CRT curvature.

### 4.2 Recursive Component
- A React component that renders itself up to a fixed depth (e.g., 5-8 layers).
- Each layer calculates its offset based on human-input (mouse position) stored in a global state or relayed via props.

### 4.3 Transition to 3D
- When "Begin Game" is pressed:
  - The CRT screen "implodes" (shrinks to a white dot in the center and disappears).
  - Fade to black.
  - Initialize the `Game3D` scene at Act 1 coordinates.

---

## 5. Stanley Parable Influence
- **Static Menu**: The menu isn't just a UI; it's a physical place. The camera might be positioned at a desk looking at the monitor (foreshadowing the game's end).
- **Meta-Narrative**: Settings descriptions should be slightly "off". 
  - *Volume:* "How loud should the silence be?"
  - *Graphics:* "Adjust the fidelity of your reality."

---

## 6. Definition of Done (Landing Page)
- [ ] CRT distortion effect covers the entire window.
- [ ] Recursive UI moves away from mouse cursor smoothly.
- [ ] "TAP TO START" uses jagged, pixelated font.
- [ ] "Clear History" successfully wipes `localStorage`.
- [ ] "Skip to 2D" flag is stored and readable by the SceneManager.
- [ ] Menu transitions to 3D Street Scene on "Begin".
