import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  constructor(
    private settingsService: SettingsService,
    private gameService: GameService
  ) {
    this.subscription = this.settingsService.getSettings().subscribe(message => {
      this.currentSettings = message.currentSettings;
      this.ngOnInit();
    });
    this.resultSubscr = this.gameService.getResult().subscribe(message => {
      this.gameWinner = message.winner;
      this.ngOnInit();
    });
    this.progressSubscr = this.gameService.getProgress().subscribe(message => {
      this.isFinished = message.isFinished;
    });
  }

  currentSettings;
  subscription: Subscription;
  resultSubscr: Subscription;
  progressSubscr: Subscription;
  gameWinner: string;
  field = [];
  isGameStart = false;
  userName: string;
  fieldSize: number;
  delay: number;
  checkedItems = 0;
  isFinished;

  // Score
  userScore = 0;
  computerScore = 0;

  makeField(size) {
    this.field = [];

    for (let row = 0; row < size; row++) {
      this.field[row] = [];

      for (let square = 0; square < size; square++) {
        let fieldItem = {
          checked: false,
          pending: false,
          checkedBy: null,
          id: null
        }
        this.field[row].push(fieldItem);
      }
    }
  }

  randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

  gameSession(field, userName, fieldSize, delay) {

    this.userName = userName;
    this.fieldSize = fieldSize;
    this.delay = delay;
    let iterationCount = (fieldSize * fieldSize) / 2;

    let self = this;

    function getRandomItem() {
      let randomItemFirst = self.randomInteger(0, fieldSize - 1);
      let randomItemSecond = self.randomInteger(0, fieldSize - 1);
      if (!field[randomItemFirst][randomItemSecond].checked) {
        field[randomItemFirst][randomItemSecond].pending = true;
        self.delayFunction(field[randomItemFirst][randomItemSecond], delay);
        self.checkedItems++;
      }
      else {
        return getRandomItem();
      }
    }

    getRandomItem();

    let timeout = setTimeout(
      function () {
        if (self.checkedItems <= iterationCount) {
          return self.gameSession(field, self.userName, self.fieldSize, self.delay);
        } else {
          return self.finishGame(userName);
        }
      }, delay
    )

    if (this.isFinished) {
      clearInterval(timeout);
    }
  }



  delayFunction(item, delay) {
    let self = this;
    setTimeout(
      function () {
        if (!item.checked) {
          self.computerScore++;
          item.pending = false;
          item.checked = true;
          item.checkedBy = 'Computer';
        }
      }, delay)
  };

  checkItem(item) {
    if (item.pending) {
      item.checked = true;
      item.checkedBy = 'User';
      this.userScore++;
    }
  }

  getCurrentDate() {
    function getDate(day) {
      return String("0" + day).slice(-2);
    }
    let today = new Date();
    const month = today.toLocaleString('en-us', { month: 'long' });
    var time = today.getHours() + ":" + today.getMinutes();
    var date = getDate(today.getDate()) + ' ' + month + ' ' + today.getFullYear();
    return time + '; ' + date;
  }

  sendWinner(value): void {
    this.gameService.sendResult(value);
  }

  sendProgress(value): void {
    this.gameService.sendProgress(value);
  }

  finishGame(userName) {
    if (userName) {
      let date = this.getCurrentDate();
      let winner = this.userScore > this.computerScore ? userName : 'Computer';
      let result = {
        winner: winner,
        date: date
      }
      this.sendProgress(true);
      this.gameWinner = winner;
      this.sendWinner(winner);
      // this.gameService.postResult(result).subscribe(data => {
      //   this.gameWinner = winner;
      //   this.sendWinner(winner);
      // }
      // );
    } else {
      this.sendWinner('');
      return "The game was not finish"
    }

  }

  ngOnInit() {
    if (this.settingsService.currentSettings) {
      this.makeField(this.settingsService.currentSettings.field);
      this.gameService.field = this.field;
    }
  }

}
