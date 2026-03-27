# PRD: ShadowIntern — 3D Narrative Phase
### Product Requirements Document v2.0
### Author: 3D Phase Lead | Hackathon: Randomize

---

## PLANNING ASSESSMENT (v1.0 → v2.0)

**What was good in v1.0:**
- Scene breakdown with timings is solid
- Pixelation pipeline is technically correct
- Priority tiers (P0/P1/P2) are essential for a hackathon
- File architecture is clean and implementable
- Dialogue JSON format is correct

**What changed in v2.0:**
The entire transition mechanic has been redesigned based on the new visual direction:
> The 2D game renders **ON the in-game monitor** while the 3D office stays visible around it.
> Like a TV in a room — the player is still sitting at the desk in 3D space, but the simulation
> is playing on the screen in front of them.
>
> Reference: Super Mario World on a CRT TV — the game is inside the screen, the physical world
> surrounds it. That's the exact feel. The 3D world does NOT unmount.

---

## 1. Executive Summary

The 3D phase is the **emotional hook** of ShadowIntern. 3-5 minutes, linear, one purpose: make
the player feel the nervous excitement of getting their first internship — then trap them at a desk
staring at a monitor that never lets them leave.

When the player sits down, the 2D simulation game appears **inside the monitor in the 3D world**.
The office, the coworkers, the fluorescent lights — they stay. The player is still physically
there. But now the screen is their entire reality. The 3D world becomes a cage, not a memory.

---

## 2. Visual Identity & Art Direction

### 2.1 The Aesthetic
- **Resolution**: Render at `1/4` native resolution, upscale with `NearestFilter`
- **Lighting**: Single directional (warm orange) + ambient fill (cool blue) = late afternoon office
- **Palette**: Slate blues, warm grays, off-white walls, fluorescent glow
- **Materials**: MeshStandardMaterial, low roughness — the pixelation does the work
- **Skybox**: Gradient sky through windows — the world exists outside, you just can't go there

### 2.2 Pixelation Pipeline
```
Scene renders to → WebGLRenderTarget (width/4, height/4)
                → EffectComposer applies:
                    1. RenderPass (base scene)
                    2. Custom PixelationPass (quantize to 32-level palette)
                    3. Optional: CRT scanline overlay
                → Output to screen (NearestFilter upscale)
```

The pixelation is not decoration — it is the art style. Simple geometry looks intentional.
Judges see "art direction", not "placeholder assets."

### 2.3 THE MONITOR — Core Visual Mechanic

The in-game monitor is the most important asset in the game.

```
Monitor Setup:
├── Monitor mesh (box geometry with bezel)
├── Screen plane (PlaneGeometry mapped to a WebGLRenderTarget)
│   └── This render target is WHERE THE 2D GAME RENDERS
├── Screen glow (emissive plane slightly in front, animated)
└── CRT curvature shader on screen material (optional but +++ visual impact)
```

**How it works technically:**
```
Main render loop:
  1. Render 2D game canvas → offscreen CanvasTexture
  2. Apply that texture to monitor screen PlaneGeometry
  3. Render full 3D scene (office + player desk + monitor-with-2D-game-showing)
  4. Apply pixelation post-process to full output
```

The 2D game is essentially a texture on a surface in 3D space. The Three.js scene
renders the whole picture — office walls, desk, monitor showing the game.

**Why this is better than hard-unmount:**
- The office doesn't disappear when you start working — it looms over you
- Coworkers are still visible in your peripheral vision
- You feel trapped at the desk, not transported somewhere new
- Visually stunning in demos — judges see the whole picture at once
- Matches the exact Super Mario World TV reference image

### 2.4 Geometry Style
- **Walls/floors/ceilings**: BoxGeometry with texture atlas UV
- **Furniture**: Low-poly (< 200 tris each)
- **NPCs**: Billboard sprites OR very low-poly humanoids (capsule + cube head)
- **Monitor screen**: PlaneGeometry with CanvasTexture updated each frame

---

## 3. Scene Breakdown

5 sequential scenes. Player walks forward, hits triggers, things happen.
No backtracking, no choice branching.

---

### Scene 1: THE STREET
**Duration**: ~30 seconds

**Player experience**:
- Spawn on sidewalk facing building
- Walk toward glass doors
- Trigger at door → fade to black → Scene 2

**Assets**:
- Sidewalk plane
- Building facade (stacked BoxGeometry, window cutouts)
- Glass door (semi-transparent material)
- Sign: "NEXUS CORP — Building Futures, One Sprint at a Time"

**Environmental storytelling**:
- Poster: "NOW HIRING: INTERNS — No Experience Needed (But You'll Get Plenty)"
- Trash can with overflowing resumes

**Technical**:
- Skybox: warm gradient, late afternoon
- Ambient: city hum loop (Web Audio API)

---

### Scene 2: THE LOBBY
**Duration**: ~45 seconds

**Player experience**:
- Walk to reception desk → NPC dialogue triggers
- **Receptionist**: "Name? ... Ah yes. Conference room B. Don't be nervous. Or do. It won't matter."
- Dialogue as screen-space text overlay
- Arrow/light guides to hallway
- Walk to hall end → trigger → Scene 3

**Assets**:
- Reception desk, receptionist NPC (billboard)
- 2-3 waiting chairs, potted plant
- Hallway with closed doors
- Floor: tiled, slightly reflective (metalness: 0.1)

**Environmental storytelling**:
- Magazine: "Forbes: Top 10 Companies That Definitely Don't Exploit Interns"
- Empty water cooler
- Chair in dark corner: "RESERVED FOR CANDIDATES"

---

### Scene 3: THE INTERVIEW
**Duration**: ~45 seconds

**Player experience**:
- Walk to the empty chair (subtle glow/different color)
- Sit → camera auto-positions to seated POV
- **Interviewer**: "So... tell me about yourself."
- 3 choices (UI overlay):
  - A) "I'm passionate about synergy and disrupting paradigms"
  - B) "I just need the experience honestly"
  - C) "..."
- **ALL 3 lead to same result** (Stanley Parable — illusion of choice)
- **Interviewer**: "Perfect. You start Monday."
- **Interviewer 2**: "Welcome to Nexus. You'll love it here." [zero enthusiasm]
- Fade → Scene 4

**Assets**:
- Conference table (long box), 4-6 chairs
- Whiteboard: "Q3 OKRs: SYNERGY | LEVERAGE | DISRUPT | PIVOT"
- 2 seated NPC interviewers, 1 empty player chair

**Environmental storytelling**:
- Whiteboard crossed-out: "Q2 OKR: Don't Lose Any More Interns"
- Poster: "TEAMWORK — Because None of Us Is As Underpaid As All of Us"
- Coffee ring stain on table

**Technical**:
- 3 buttons overlaid on screen — all map to same next state
- Camera lerp to seated position (GSAP or manual lerp)

---

### Scene 4: THE OFFICE FLOOR
**Duration**: ~60 seconds

**Player experience**:
- Walk through open-plan office toward YOUR desk
- **Coworker 1** (at printer): "Oh, new intern? The last one cried on day two. Day one was orientation."
- **Coworker 2** (at desk, not looking up): "Don't touch my stapler."
- Walk past 4-6 desk pods
- Reach YOUR desk → trigger → Scene 5

**Assets**:
- 8-12 desk setups (InstancedMesh for performance)
- 3-4 NPC coworkers (seated + standing)
- Printer area
- Fluorescent lights (emissive rectangles)
- YOUR desk: name tag "INTERN"
- Sprint board on wall (sticky note textures — foreshadows Phase 2)

**Environmental storytelling**:
- Counter: "Days without incident: 0"
- One desk: 14 coffee cups
- Sign: "Please Do Not Discuss Salary. Or Feelings."
- One monitor showing a Jira board (foreshadows 2D phase)

**Technical**:
- InstancedMesh for desks
- NPC dialogue: distance check trigger

---

### Scene 5: THE DESK — AND THE MONITOR THAT NEVER LETS GO
**Duration**: ~30 seconds + forever (the 2D game)

**Player experience**:
- Camera fixes behind YOUR chair, looking at monitor
- Sticky note: "TODO: Everything"
- **Narrator** (text overlay, Stanley Parable style):
  > "And so you sat down. Ready to make a difference. Ready to change the world.
  > Ready to... read your first Jira ticket."
- Monitor screen starts glowing
- Camera slowly dollies toward monitor (2 seconds)
- Monitor fills ~60% of viewport — BUT THE OFFICE STAYS VISIBLE AROUND IT
- **THE 2D GAME BOOTS UP ON THE MONITOR SCREEN**
- Player now interacts with the 2D game — but they're still in the 3D office

**This is the key moment:**
The screen doesn't take over the full viewport. The office is still there.
The player can see their desk, the fluorescent lights, maybe a coworker walking past.
But everything that matters is happening on that monitor.

```
THE FINAL COMPOSITION:
┌─────────────────────────────────────────┐
│  [dark office ceiling & walls]          │
│                                         │
│    [monitor bezel]                      │
│   ┌─────────────────────┐               │
│   │  2D GAME RUNS HERE  │  [coworker   │
│   │  (React canvas as   │   visible in │
│   │   WebGL texture)    │   bg)        │
│   └─────────────────────┘               │
│  [desk surface, keyboard, sticky notes] │
└─────────────────────────────────────────┘
```

**Assets**:
- High-detail desk (most fidelity in game — player stares at it forever)
- Monitor mesh with screen plane (this screen renders the 2D game)
- Keyboard, mouse, sticky notes, sad plant
- Mug: "I Survived Onboarding"
- Post-it: "Wi-Fi: NexusCorp_Guest / intern123"
- Pinned email: "RE: RE: RE: RE: Please Fix The Bug"
- Calendar: every day marked "MEETING"

---

## 4. Technical Architecture — Monitor-as-Portal

### The Core Rendering Setup

```typescript
// Two canvases, one world

// Canvas 1: The 2D game (React/Canvas2D or Pixi.js)
const game2DCanvas = document.createElement('canvas');
game2DCanvas.width = 512;   // Monitor resolution
game2DCanvas.height = 320;
const game2DCtx = game2DCanvas.getContext('2d');

// Canvas 2: The 3D world (Three.js)
const renderer = new THREE.WebGLRenderer({ canvas: mainCanvas });

// Bridge: 2D canvas → Three.js texture on monitor
const monitorTexture = new THREE.CanvasTexture(game2DCanvas);
monitorMesh.material = new THREE.MeshStandardMaterial({
  map: monitorTexture,
  emissive: new THREE.Color(0xffffff),
  emissiveMap: monitorTexture,
  emissiveIntensity: 0.8,
});

// Render loop:
function tick(delta: number) {
  // Step 1: Tick the 2D game (updates game2DCanvas)
  game2D.update(delta);
  game2D.render(game2DCtx);

  // Step 2: Tell Three.js the texture changed
  monitorTexture.needsUpdate = true;

  // Step 3: Render the 3D scene (which now shows the updated 2D game on monitor)
  renderer.render(scene, camera);
}
```

### Monitor Boot Sequence

```
1. Scene 5 loads, camera fixes at desk
2. Monitor screen = black (emissiveIntensity: 0)
3. Narrator text plays (3 lines, 4 seconds)
4. Camera dolly: position.z decreases over 2 seconds
5. Monitor screen: boot animation plays on 2D canvas
   └── "NEXUSCORP OS v3.1 ... Loading Workstation ... Welcome, INTERN"
   └── Simulates old Windows/Linux boot (fits the aesthetic)
6. 2D game fades in on monitor
7. Input handling switches: WASD stops, mouse now controls 2D game UI
8. HUD elements appear: stress bar, points counter, day counter
```

### Input Mode Switching

```typescript
enum InputMode { WALKING, CUTSCENE, DESK }

// When player reaches desk trigger:
inputMode = InputMode.DESK;
controls.unlock();  // Release pointer lock
// Mouse now clicks on 2D game elements
// 2D game receives mouse events mapped to monitor screen UV coordinates
```

### File Structure

```
dev/frontend/src/
├── App.tsx                     # Orchestrates input mode, renders both canvases
├── game3d/
│   ├── Game3D.tsx              # Three.js setup, render loop, scene manager
│   ├── engine/
│   │   ├── SceneManager.ts
│   │   ├── PlayerController.ts
│   │   ├── DialogueSystem.ts
│   │   ├── TriggerZone.ts
│   │   └── MonitorPortal.ts   # ← NEW: manages 2D-canvas-as-texture pipeline
│   ├── scenes/
│   │   ├── StreetScene.ts
│   │   ├── LobbyScene.ts
│   │   ├── InterviewScene.ts
│   │   ├── OfficeScene.ts
│   │   └── DeskScene.ts       # Loads MonitorPortal, boots 2D game
│   └── shaders/
│       ├── PixelationPass.ts
│       └── CRTEffect.ts
└── game2d/
    ├── Game2D.ts               # 2D game logic (renders to Canvas2D context)
    ├── systems/
    │   ├── TaskSystem.ts       # Jira tickets, PRDs, emails
    │   ├── StressSystem.ts     # Mental health bar
    │   ├── MeetingSystem.ts    # Meeting minigame
    │   └── GeminiAPI.ts        # AI task generation + fallback data
    └── ui/
        ├── HUD.ts              # Points, stress bar, day counter
        ├── EmailClient.ts
        ├── JiraBoard.ts
        └── MeetingRoom.ts
```

### Performance Budget

- **Target**: 60fps on mid-range laptop (integrated GPU)
- **Monitor texture**: 512x320 (looks great pixelated, very cheap to update)
- **Triangle count**: < 10K per scene
- **Texture memory**: < 50MB total
- **Draw calls**: < 50 per scene (InstancedMesh for desks)
- **monitorTexture.needsUpdate**: only true when 2D game actually changed pixels

---

## 5. Player Controls

### Phase 1 — Walking (Scenes 1-4)
- **PointerLockControls** — WASD on XZ plane, mouse look
- Pitch clamped ±80°
- Walk speed: 3 units/sec | Sprint (Shift): 1.5x
- [E] to interact with triggers

### Phase 2 — At Desk (Scene 5+)
- WASD disabled
- Pointer lock released
- Mouse click events raycast against monitor screen plane
  → Map UV coordinates to 2D game input coordinates
- Keyboard: typing for 2D game inputs

### Interaction Prompts
- "[E] Talk" / "[E] Sit" when near trigger zones
- Subtle pulse effect on interactive objects (emissive intensity animation)

---

## 6. Dialogue & Narrative

### Tone
Dry corporate satire. The office is absurd but nobody acknowledges it.
"This is normal" energy while everything is clearly NOT normal.

### Narrator (Scene 5 only)
Stanley Parable: omniscient, slightly condescending, warmly sarcastic.
Centered text, larger font, typewriter effect. Different style from NPC dialogue.

### All Dialogue in JSON

```json
{
  "receptionist": [
    { "text": "Name?", "delay": 500 },
    { "text": "...", "delay": 800 },
    { "text": "Ah yes. Conference room B.", "delay": 0 },
    { "text": "Down the hall, second left.", "delay": 0 },
    { "text": "Don't be nervous.", "delay": 1000 },
    { "text": "Or do. It won't matter.", "delay": 0 }
  ],
  "interviewer_1": [
    { "text": "So... tell me about yourself.", "delay": 0 }
  ],
  "interviewer_result": [
    { "text": "Perfect. You start Monday.", "delay": 0 }
  ],
  "interviewer_2": [
    { "text": "Welcome to Nexus. You'll love it here.", "delay": 0 }
  ],
  "coworker_printer": [
    { "text": "Oh, new intern?", "delay": 400 },
    { "text": "Good luck.", "delay": 600 },
    { "text": "The last one cried on day two.", "delay": 0 },
    { "text": "Day one was orientation.", "delay": 0 }
  ],
  "coworker_desk": [
    { "text": "Don't touch my stapler.", "delay": 0 }
  ],
  "narrator_scene5": [
    { "text": "And so you sat down.", "delay": 1000 },
    { "text": "Ready to make a difference.", "delay": 800 },
    { "text": "Ready to change the world.", "delay": 800 },
    { "text": "Ready to... read your first Jira ticket.", "delay": 2000 }
  ]
}
```

---

## 7. Audio Design

| Layer | What | Implementation |
|---|---|---|
| Ambient | Office hum, AC drone | Looping AudioBuffer, always on |
| Footsteps | Carpet footstep samples | 3-4 samples, play on movement tick |
| UI blip | Dialogue appear sound | Short sine wave, slight pitch variance |
| Music | Lo-fi beat, quiet | Starts Scene 4, builds to Scene 5 |
| Monitor boot | Rising tone + white noise | Plays during boot sequence |
| 2D game audio | Notification pings, meeting chimes | Managed by Game2D |

Audio is optional enhancement. Game works without it. Do not let audio block progress.

---

## 8. Transition Contract (3D → 2D Handoff)

**THIS IS THE KEY CHANGE FROM v1.0:**
Three.js does NOT unmount. The 3D world stays alive. The 2D game runs inside it.

```typescript
// MonitorPortal.ts — the bridge
class MonitorPortal {
  private game2D: Game2D;
  private monitorTexture: THREE.CanvasTexture;
  private offscreenCanvas: HTMLCanvasElement;

  init(monitorMesh: THREE.Mesh) {
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.width = 512;
    this.offscreenCanvas.height = 320;

    this.game2D = new Game2D(this.offscreenCanvas);
    this.game2D.boot(); // Shows OS boot sequence

    this.monitorTexture = new THREE.CanvasTexture(this.offscreenCanvas);
    (monitorMesh.material as THREE.MeshStandardMaterial).map = this.monitorTexture;
    (monitorMesh.material as THREE.MeshStandardMaterial).emissiveMap = this.monitorTexture;
  }

  update(delta: number) {
    this.game2D.update(delta);
    this.game2D.render();
    this.monitorTexture.needsUpdate = true;
  }

  handleClick(uv: THREE.Vector2) {
    // Convert monitor UV to 2D game screen coordinates
    const x = uv.x * 512;
    const y = (1 - uv.y) * 320;
    this.game2D.handleClick(x, y);
  }
}
```

```typescript
// App.tsx — nothing needs to unmount
function App() {
  // No phase switching needed
  // Three.js runs the whole game
  // Game2D lives inside MonitorPortal
  return <canvas id="main-canvas" />;
}
```

---

## 9. Cut Priority (Hackathon Triage)

| Tier | Feature | Impact if cut |
|---|---|---|
| **P0 — MUST** | Monitor-as-portal rendering pipeline | This IS the game's identity |
| **P0 — MUST** | Pixelation shader | Without it, looks like student project |
| **P0 — MUST** | Scene 5 (desk + monitor boot) | The whole payoff |
| **P0 — MUST** | Basic WASD movement | Unplayable without it |
| **P1 — SHOULD** | Scene 3 (interview with fake choice) | Biggest laugh, demo moment |
| **P1 — SHOULD** | Scene 4 (office floor NPCs) | World-building, sets tone |
| **P2 — NICE** | Scene 1 (street exterior) | Can start in lobby |
| **P2 — NICE** | Scene 2 (lobby) | Can start in interview |
| **P2 — NICE** | Audio | Silent works |
| **P3 — STRETCH** | CRT curvature shader on monitor | Pure polish |
| **P3 — STRETCH** | NPC animations | Static NPCs work fine |
| **P3 — STRETCH** | Camera shake / ambient coworker movement | Immersion only |

**Emergency mode (2 hours left):**
- Skip to desk immediately (no walking scenes)
- Camera at desk looking at monitor
- Narrator text plays
- Monitor boots up with 2D game
- Minimum viable 3D: one room, one desk, one monitor
- The portal mechanic STILL works — this is still impressive

---

## 10. Definition of Done

- [ ] Player can walk from street to desk in < 5 minutes
- [ ] Pixelation shader rendering at target resolution
- [ ] At least 3 NPC interactions with dialogue
- [ ] Interview choice UI renders (all options → same result)
- [ ] 2D game canvas renders as texture on monitor screen in 3D world
- [ ] Monitor boot sequence plays when player sits
- [ ] Mouse clicks on monitor screen correctly route to 2D game
- [ ] 3D office remains visible around monitor during 2D gameplay
- [ ] 60fps on Chrome with integrated GPU
- [ ] No console errors in production build
- [ ] Three.js renderer stays alive for full game session

---

*"The 3D phase doesn't need to be long. It needs to be memorable."*
*"The office doesn't disappear when you start working. Neither should ours."*