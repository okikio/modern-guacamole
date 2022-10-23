export class VisibleLayer {
  private static nextID = 0;
  private uniqueId = VisibleLayer.nextID++;

  x = 0;
  y = 0;
  z = 0;
  alpha = 0xFF;

  matrix = [1, 0, 0, 1, 0, 0];
  parent: VisibleLayer = null;
  children = new Map<number, VisibleLayer>();

  private translateStr = "translate(0px, 0px)";
  private matrixStr = "matrix(1, 0, 0, 1, 0, 0)";

  private div = document.createElement("div");

  constructor(protected width: number, protected height: number) {
    // Set layer position
    var canvas = this.getCanvas();
    Object.assign(canvas.style, {
      position: "absolute",
      left: "0px",
      top: "0px",
    });

    // Create div with given size
    this.div.appendChild(canvas);
    Object.assign(this.div.style, {
      width: width + "px",
      height: height + "px",
      position: "absolute",
      left: "0px",
      top: "0px",
      overflow: "hidden",
    });
  }

  getElement() { return this.div; }
  getCanvas() { }

  translate(x: number, y: number) {
    this.x = x;
    this.y = y;

    // Generate translation
    this.translateStr = `translate(${x}px, ${y}px)`;

    // Set layer transform 
    Object.assign(this.div.style, {
      transform: this.translateStr + " " + this.matrixStr
    });

  }
  /**
   * Superclass resize() function.
   * @private
   */
  resize(width: number, height: number) {
    // Resize containing div
    Object.assign(this.div.style, {
      width: width + "px",
      height: height + "px",
    })

    // super.resize();
  }

  move(parent: VisibleLayer, x: number, y: number, z: number) {
    // Set parent if necessary
    if (this.parent !== parent) {
      // Maintain relationship
      if (this.parent)
        this.parent.children.delete(this.uniqueId);

      this.parent = parent;
      parent.children.set(this.uniqueId, this);

      // Reparent element
      const parent_element = parent.getElement();
      parent_element.appendChild(this.div);

    }

    // Set location
    this.translate(x, y);
    this.z = z;
    Object.assign(this.div.style, { zIndex: z });
  };

  shade(alpha: number) {
    this.alpha = alpha;
    Object.assign(this.div.style, { opacity: alpha / 255.0 });
  }

  dispose() {

    // Remove from parent container
    if (this.parent) {
      this.parent.children.delete(this.uniqueId);
      this.parent = null;
    }

    // Remove from parent element
    if (this.div.parentNode)
      this.div.parentNode.removeChild(this.div);

  }

  distort(a, b, c, d, e, f) {

    // Store matrix
    this.matrix = [a, b, c, d, e, f];

    /* a c e
     * b d f
     * 0 0 1
     */
    // Generate matrix transformation
    this.matrixStr = "matrix(" + a + "," + b + "," + c + "," + d + "," + e + "," + f + ")";

    // Set layer transform 
    Object.assign(this.div, {
      transform: this.translateStr + " " + this.matrixStr;
    });
  }
}

export class Display {
  constructor() {

    var displayWidth = 0;
    var displayHeight = 0;
    var displayScale = 1;

    // Create display
    var display = document.createElement("div");
    display.style.position = "relative";
    display.style.width = displayWidth + "px";
    display.style.height = displayHeight + "px";

    // Ensure transformations on display originate at 0,0
    display.style.transformOrigin = "0 0";

    // Create default layer
    var default_layer = new VisibleLayer(displayWidth, displayHeight);

    // Create cursor layer
    var cursor = new VisibleLayer(0, 0);
    cursor.setChannelMask(Guacamole.Layer.SRC);

    // Add default layer and cursor to display
    display.appendChild(default_this.getElement());
    display.appendChild(cursor.getElement());

    // Create bounding div 
    var bounds = document.createElement("div");
    bounds.style.position = "relative";
    bounds.style.width = (displayWidth * displayScale) + "px";
    bounds.style.height = (displayHeight * displayScale) + "px";

    // Add display to bounds
    bounds.appendChild(display);
  }
}