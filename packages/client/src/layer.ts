/**
 * The number of pixels the width or height of a layer must change before
 * the underlying canvas is resized. The underlying canvas will be kept at
 * dimensions which are integer multiples of this factor.
 */
const CANVAS_SIZE_FACTOR: number = 64;

     /**
      * The canvas element backing this Layer.
      */
    //  var canvas: HTMLCanvasElement = document.createElement("canvas");
 
     /**
      * The 2D display context of the canvas element backing this Layer.
      */
    //  var context: CanvasRenderingContext2D = canvas.getContext("2d");
    //  context.save();

export class Layer {
  canvasEl: HTMLCanvasElement = document.createElement("canvas");
  canvas: OffscreenCanvas & { style: CSSStyleDeclaration } | HTMLCanvasElement = null;
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D = null;
  constructor() {
    this.canvas = 'OffscreenCanvas' in globalThis
      ? this.canvasEl.transferControlToOffscreen() as OffscreenCanvas & { style: CSSStyleDeclaration }
      : this.canvasEl;
    
    Object.assign(this.canvas, {
      style: { width: 0, height: 0 }
    });
    
    this.context = this.canvas.getContext("2d");
    this.context.save();
  }
}



/**
 * Channel mask for the composite operation "rout".
 */
export const ROUT: number = 0x2;

/**
 * Channel mask for the composite operation "atop".
 */
export const ATOP: number = 0x6;

/**
 * Channel mask for the composite operation "xor".
 */
export const XOR: number = 0xA;

/**
 * Channel mask for the composite operation "rover".
 */
export const ROVER: number = 0xB;

/**
 * Channel mask for the composite operation "over".
 */
export const OVER: number = 0xE;

/**
 * Channel mask for the composite operation "plus".
 */
export const PLUS: number = 0xF;

/**
 * Channel mask for the composite operation "rin".
 * Beware that WebKit-based browsers may leave the contents of the destination
 * layer where the source layer is transparent, despite the definition of this
 * operation.
 */
export const RIN: number = 0x1;

/**
 * Channel mask for the composite operation "in".
 * Beware that WebKit-based browsers may leave the contents of the destination
 * layer where the source layer is transparent, despite the definition of this
 * operation.
 */
export const IN: number = 0x4;

/**
 * Channel mask for the composite operation "out".
 * Beware that WebKit-based browsers may leave the contents of the destination
 * layer where the source layer is transparent, despite the definition of this
 * operation.
 */
export const OUT: number = 0x8;

/**
 * Channel mask for the composite operation "ratop".
 * Beware that WebKit-based browsers may leave the contents of the destination
 * layer where the source layer is transparent, despite the definition of this
 * operation.
 */
export const RATOP: number = 0x9;

/**
 * Channel mask for the composite operation "src".
 * Beware that WebKit-based browsers may leave the contents of the destination
 * layer where the source layer is transparent, despite the definition of this
 * operation.
 */
export const SRC: number = 0xC;