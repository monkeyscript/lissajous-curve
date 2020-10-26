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
  a: number = 6;
  B: number = 10;
  b: number = 5;
  c:number=0;
  t: number = 0;

  // Result 
  x: number = 0;
  y: number = 0;

  // Timer 
  timer: any

  // Canvas element reference 
  @ViewChild('canvas') public canvas: ElementRef;

  // Canvas context var
  private ctx: CanvasRenderingContext2D;

  // Canvas dimension
  canvasDimension: number;

  // Class for loader
  loaderClass: string = 'd-block';

  ngAfterViewInit() {

    // Get the context 
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');

    // Wait till canvas render 
    setTimeout(() => {

      // Hide loader
      this.loaderClass = 'd-none';

      // Get offset width
      this.canvasDimension = canvasEl.offsetWidth;

      // Update height and width
      canvasEl.width = this.canvasDimension;
      canvasEl.height = this.canvasDimension;

      // Start simulation 
      this.simulate()

    }, 2000);


  }

  //
  // Start simulation
  //
  simulate() {

    // Init 
    this.t = 0;
    this.x = 0;
    this.y = 0;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvasDimension, this.canvasDimension)

    // Stop timer 
    clearInterval(this.timer)

    this.timer = setInterval(() => {

      // Calculate x and y 
      this.x = this.A * Math.sin((this.a * this.t) + (this.c*Math.PI))
      this.y = this.B * Math.sin((this.b * this.t))

      // Mark point 
      this.strokePoint(this.x, this.y);

      // Increement time 
      this.t += 0.01;

    }, 10);

  }

  //
  // Stroke a point by coordinates
  //
  strokePoint(x: number, y: number) {

    var pointSize = 1;
    this.ctx.fillStyle = "#ff6e6e";

    // Start path 
    this.ctx.beginPath();
    // Draw circle
    this.ctx.arc((this.canvasDimension / 2) + (x * 10), (this.canvasDimension / 2) - (y * 10), pointSize, 0, Math.PI * 2, true);
    // Fill circle
    this.ctx.fill();

  }

}
