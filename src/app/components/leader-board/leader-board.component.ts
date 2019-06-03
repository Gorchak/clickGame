import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';

export interface Leader {
  date: string;
  id: number;
  winner: string;
}

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {

  constructor(
    private gameService: GameService
  ) {
    this.resultSubscr = this.gameService.getResult().subscribe(message => {
      this.gameWinner = message.winner;
      this.ngOnInit();
    });
  }
  
  gameWinner;
  resultSubscr: Subscription;
  leaders: Array<Leader>;

  getLeaders() {
    this.gameService.getLeaders().subscribe(data => {
      this.leaders = data;
    }
    );
  }

  ngOnInit() {
    this.getLeaders();
  }

}
