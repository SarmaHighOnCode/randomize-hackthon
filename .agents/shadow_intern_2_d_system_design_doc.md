# ShadowIntern: Virtual Industry Simulation Engine

## Overview
This document contains the full design and implementation guide for the **2D gameplay system** of ShadowIntern. The goal is to simulate real corporate workflows (tickets, meetings, interruptions, deadlines) using accessible puzzle mechanics.

---

# Core Design Philosophy

You are NOT building a puzzle game.
You are building a **workflow simulator disguised as puzzles**.

Every mechanic maps to real-world systems:
- Jira → Tasks
- Outlook → Meetings
- Slack → Interruptions
- Manager → Pressure
- Intern → Overload

---

# Core Game Loop

```
Get Task → Work on Puzzle
     ↑           ↓
Interruptions   Deadlines
     ↑           ↓
Meetings ← Outlook
```

---

# Core Systems

## Variables
- Productivity Score
- Burnout Meter
- Time (global clock)
- Reputation (hidden HR metric)

---

# Fake OS Design

## Theme
"Government office PC from 2008"

## Color Palette
```
--bg-main: #c9c9c9
--window: #e3e3e3
--border: #9a9a9a
--text: #2b2b2b
--accent: #3a6ea5
--error: #a54a4a
```

## UI Style
- No rounded corners
- Thick borders
- Slight bevel buttons
- Low contrast
- Minimal hover feedback

## Fonts
- Tahoma
- MS Sans Serif
- Arial fallback

## Effects
- Slight UI delay (100–200ms)
- Random loading pauses
- Subtle flicker

---

# Audio & Atmosphere

## Ambient
- Low office AC hum
- Distant keyboard typing
- Occasional cough or chair movement

## Notifications
- Quiet but annoying ping

## Psychological Design
- Repetition
- Slight delay
- Subtle frustration

---

# Subtitle System

## Purpose
- Display dialogue
- Reinforce immersion

## Data Model
```
{
  text: string,
  duration: number
}
```

## Behavior
- Appears bottom center
- Auto disappears

---

# Task System (Jira)

## Structure
```
{
  type: "jira_task",
  title: string,
  description: string,
  difficulty: "easy|medium|hard",
  mechanic: string
}
```

## Puzzle Types

### 1. Pattern Matching
- Fix corrupted data

### 2. Node Connection
- Restore systems

### 3. Sorting
- Prioritize tickets

### 4. Logic Grid
- Resolve dependencies

### 5. Pathfinding
- Optimize routes

---

# Gemini + Fallback System

## Logic
- 20% Gemini tasks
- 80% local tasks

## Flow
```
if random < 0.2:
    try Gemini
    else fallback
```

## Fallback Tasks
- Must be large dataset
- Instant load

## Strategy
- First task always local
- Gemini loads in background

---

# Meeting System

## Structure
```
Meeting Start
   ↓
Audio Loop
   ↓
Dialogue Choices
   ↓
Outcome
```

## Audio
Loop phrases:
- "let's circle back"
- "align on this"
- "take this offline"

## Dialogue Options

### Productive
- Ends meeting faster
- Score boost

### Corporate Speak
- Neutral

### Escape
- Leaves early

### Honest
- Risk penalty

### Silent
- Meeting continues

---

# Meeting Outcomes

| Outcome | Effect |
|--------|-------|
| Efficient | +score |
| Neutral | none |
| Dragged | +burnout |
| Rude | penalty |

---

# Slack Interruptions

## Examples
- "quick question"
- "urgent"

## Player Choice
- Respond
- Ignore

---

# Deadline System

- Each task has timer
- Late = penalty
- Fast = reward

---

# Realism Events

- Scope change
- Task reopened
- Manager check-in
- Coffee break

---

# Game Modes

## Deadline Rush
- Many tasks

## Meeting Hell
- Constant meetings

## Balanced
- Realistic mix

## Nightmare
- Everything combined

---

# Burnout System

## Increases
- Meetings
- Overwork
- Interruptions

## Decreases
- Breaks

---

# Endings

## Success
- Full-time offer

## Neutral
- Contract extended

## Burnout
- System collapse

---

# UI Architecture

```
<App>
 ├── Desktop
 ├── TaskWindow
 ├── MeetingWindow
 ├── Notifications
 ├── SubtitleOverlay
```

---

# Key Insight

This is not about difficulty.
This is about **managing chaos under pressure**.

---

# Final Goal

Simulate:
- Work overload
- Inefficiency
- Decision making

While remaining:
- Playable
- Clear
- Engaging

---

End of Document

