import { CharacterComponent } from "@characterxyz/three-character";
import { Vector3 } from "three";
import SpriteText from "three-spritetext";

export class OverheadNameTextComponent extends CharacterComponent {
  private displayText: string = "Player";
  private text: SpriteText | null = null;

  constructor(displayText: string, position: Vector3) {
    super();
    this.displayText = displayText;
    this.position.copy(position as any);
  }

  init() {
    this.initializeText();
  }

  update(deltaTime: number) {}

  private initializeText() {
    this.text = new SpriteText(this.displayText, 0.2, "#ffffff");
    this.text.fontFace = "Arial";
    this.text.fontSize = 25;
    this.text.fontWeight = "bold";
    this.text.position.copy(new Vector3(0, 0, 0));
    this.attachToParent(this.text as any);
  }
}
