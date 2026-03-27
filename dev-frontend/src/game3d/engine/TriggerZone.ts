import * as THREE from 'three';

export interface TriggerConfig {
  id: string;
  position: THREE.Vector3;
  size: THREE.Vector3;
  once: boolean; // only fire once?
  promptText?: string; // e.g. "[E] Enter"
  autoTrigger?: boolean; // trigger on walk-in without pressing E
}

export class TriggerZone {
  id: string;
  box: THREE.Box3;
  once: boolean;
  fired = false;
  promptText: string;
  autoTrigger: boolean;
  private isPlayerInside = false;

  constructor(config: TriggerConfig) {
    this.id = config.id;
    this.once = config.once;
    this.promptText = config.promptText || '[E] Interact';
    this.autoTrigger = config.autoTrigger || false;

    const half = config.size.clone().multiplyScalar(0.5);
    this.box = new THREE.Box3(
      config.position.clone().sub(half),
      config.position.clone().add(half)
    );
  }

  check(
    playerPos: THREE.Vector3,
    ePressed: boolean,
    onTrigger: (id: string) => void,
    onProximity?: (id: string, prompt: string) => void
  ) {
    if (this.once && this.fired) return;

    const inside = this.box.containsPoint(playerPos);

    if (inside) {
      if (this.autoTrigger && !this.isPlayerInside) {
        this.fired = true;
        onTrigger(this.id);
      } else if (!this.autoTrigger) {
        onProximity?.(this.id, this.promptText);
        if (ePressed) {
          this.fired = true;
          onTrigger(this.id);
        }
      }
    }

    this.isPlayerInside = inside;
  }

  reset() {
    this.fired = false;
    this.isPlayerInside = false;
  }
}

export class TriggerManager {
  private triggers: TriggerZone[] = [];
  private ePressed = false;
  private onTrigger: (id: string) => void;
  private proximityId: string | null = null;
  private proximityPrompt = '';

  constructor(onTrigger: (id: string) => void) {
    this.onTrigger = onTrigger;

    document.addEventListener('keydown', (e) => {
      if (e.code === 'KeyE') this.ePressed = true;
    });
    document.addEventListener('keyup', (e) => {
      if (e.code === 'KeyE') this.ePressed = false;
    });
  }

  add(config: TriggerConfig) {
    this.triggers.push(new TriggerZone(config));
  }

  clear() {
    this.triggers = [];
  }

  update(playerPos: THREE.Vector3) {
    this.proximityId = null;
    this.proximityPrompt = '';

    for (const trigger of this.triggers) {
      trigger.check(
        playerPos,
        this.ePressed,
        this.onTrigger,
        (id, prompt) => {
          this.proximityId = id;
          this.proximityPrompt = prompt;
        }
      );
    }

    // Consume E press
    this.ePressed = false;
  }

  getPrompt(): string | null {
    return this.proximityId ? this.proximityPrompt : null;
  }
}
