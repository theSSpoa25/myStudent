import { Component, OnInit } from '@angular/core';
import { faBoxOpen, faClipboardList, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { TicketStats } from 'src/app/_models/ticket/ticket-stats';
import { SseService } from 'src/app/_services/sse.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faTicketAlt = faTicketAlt;
  faClipboardList = faClipboardList;
  faOpenBox = faBoxOpen;
  stats: TicketStats;
  basicOptions: any;
  data: { labels: string[]; datasets: { label: string; backgroundColor: string; data: number[]; }[]; };

  constructor(
    private sseService: SseService
  ) {
    this.applyTheme();
    this.data = {
      labels: ['Kerkesa te hapura', 'Kerkesa te krijuara', 'Kerkesa te marra'],
      datasets: [
          {
              label: 'kerkesat',
              backgroundColor: '#42A5F5',
              data: this.stats ?  [
                this.stats.openTickets,
                this.stats.ownedTickets,
                this.stats.assignedTickets
              ]

              : [50, 50, 50]
          },
      ]
  };
  }

  ngOnInit(): void {
    this.sseService.getTeamsStream().subscribe(res => {
      console.log(res)
      this.stats = res;
      this.data.datasets[0].data = [this.stats.openTickets,
        this.stats.ownedTickets,
        this.stats.assignedTickets]
    })

  }


  private applyTheme() {
    this.basicOptions = {
      legend: {
        labels: {
          fontColor: '#495057'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#495057'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: '#495057',
            min: 0,
            max: 100
          }
        }]
      }
    };
  }
}
