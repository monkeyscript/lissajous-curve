import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lissajous-curve';

  // Parameters 
  A: number = 1;
  a: number = 1;
  B: number = 1;
  b: number = 1;
  t: number = 0;

  // Result 
  x: number = 0;
  y: number = 0;

  // Timer 
  timer: any

  ngOnInit() {

    this.simulate()

  }

  simulate() {

    // Init 
    this.t = 0;
    this.x = 0;
    this.y = 0;

    // Stop timer 
    clearInterval(this.timer)

    this.timer = setInterval(() => {

      // Calculate x and y 
      this.x = this.A * Math.sin((this.a * this.t))
      this.y = this.B * Math.sin((this.b * this.t))

      // Increement time 
      this.t++;

    }, 2000);

  }

}
