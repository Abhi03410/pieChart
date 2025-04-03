import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  myFirstValue: any;
  mySecondValue: any;
  myChart: any;
  myValiationMessage1 = '';
  myValiationMessage2 = '';
  @ViewChild('inputOne') myFirstBox: any;
  @ViewChild('inputTwo') mySecondBox: any;
  @ViewChild('myCanvasOne') myCanvasOne: any;

  constructor() {
    Chart.register(...registerables);
  }
  ngAfterViewInit(): void {

  }
  handInput(inp: string) {
    this.myChart?.destroy();
    this.myValiationMessage1 = '';
    this.myValiationMessage2 = '';
    let maxvalue = 100;
    if (inp === 'one') {
      if (this.myFirstBox.nativeElement.value > 100) {
        this.myValiationMessage1 = '*Incorrect value';

      } else {
        this.mySecondBox.nativeElement.value = maxvalue - this.myFirstBox.nativeElement.value;
        this.mySecondValue = this.mySecondBox.nativeElement.value;
      }
    }
    if (inp === 'two') {
      if (this.mySecondBox.nativeElement.value > 100) {
        this.myValiationMessage2 = '*Incorrect value';
      } else {
        this.myFirstBox.nativeElement.value = maxvalue - this.mySecondBox.nativeElement.value;
        this.myFirstValue = this.myFirstBox.nativeElement.value;
      }
    }
  }
  onSubmit() {
    console.log('box first value >>>', this.myFirstValue);
    console.log('box second value >>>', this.mySecondValue);
    this.myChart = new Chart(
      this.myCanvasOne?.nativeElement.getContext('2d'),
      {
        type: 'pie',
        data: {
          labels: ['Box-1', 'Box-2'],
          datasets: [{
            data: [this.myFirstValue, this.mySecondValue]
          }]
        },
        options: {
          plugins: {
            legend: {
              display: true,
            }
          }
        }
      }
    )
  }

}
