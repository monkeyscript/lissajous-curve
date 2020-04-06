import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'lissajous-curve';

  // Parameters 
  A: number = 10;
  a: number = 1;
  B: number = 10;
  b: number = 2;
  t: number = 0;

  // Result 
  x: number = 0;
  y: number = 0;

  // Timer 
  timer: any

  // Canvas element reference 
  @ViewChild('canvas', {
    static: false
  }) public canvas: ElementRef;

  // Canvas context var
  private ctx: CanvasRenderingContext2D;

  // Canvas dimension
  canvasDimension: number;

  ngAfterViewInit() {

    // Get the context 
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');

    setTimeout(() => {

      // Get offset width
      this.canvasDimension = canvasEl.offsetWidth;
      console.log(this.canvasDimension, canvasEl.width)

      // Update height and width
      canvasEl.width = this.canvasDimension;
      canvasEl.height = this.canvasDimension;

      // Start simulation 
      this.simulate()

    }, 5000);


  }

  simulate() {

    // Init 
    this.t = 0;
    this.x = 0;
    this.y = 0;

    // Clear canvas
    this.ctx.clearRect(0,0,this.canvasDimension,this.canvasDimension)

    // Stop timer 
    clearInterval(this.timer)

    this.timer = setInterval(() => {

      // Calculate x and y 
      this.x = this.A * Math.sin((this.a * this.t))
      this.y = this.B * Math.sin((this.b * this.t))

      // Mark point 
      this.strokePoint(this.x, this.y);

      // Increement time 
      this.t++;

    }, 100);

  }

  strokePoint(x: number, y: number) {

    var pointSize = 2; // Change according to the size of the point.

    this.ctx.fillStyle = "#ff2626"; // Red color

    this.ctx.beginPath(); //Start path
    this.ctx.arc((this.canvasDimension / 2) + (x * 10), (this.canvasDimension / 2) - (y * 10), pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    this.ctx.fill(); // Close the path and fill.

  }

}
