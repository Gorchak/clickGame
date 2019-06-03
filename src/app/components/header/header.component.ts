import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject, Subscription } from 'rxjs';
import { FieldComponent } from '../field/field.component';
import { SettingsService } from 'src/app/services/settings.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private settingsService: SettingsService,
    private gameService: GameService
  ) {
    this.subscription = this.settingsService.getSettings().subscribe(message => {
      this.settingsService.currentSettings = message.currentSettings;
      this.ngOnInit();
    });
    this.progressSubscr = this.gameService.getProgress().subscribe(message => {
      this.isFinished = message.isFinished;
    });
  }

  @ViewChild(FieldComponent, { static: false })
  private fieldComponent: FieldComponent;

  progressSubscr: Subscription;
  subscription: Subscription;
  selectedMode;
  settingsObj: object;
  settings = [];
  isFinished = true;

  sendSettings(value): void {
    this.settingsService.sendSetings(value);
  }

  selectSettings(value) {
    this.selectedMode = value;
    this.sendSettings(value)
  }

  getSettings() {
    this.settingsService.getSettingsData().subscribe(data => {
      this.settings = [];
      for (let item in data) {
        let itemObj = data[item];
        itemObj['title'] = item;

        this.settings.push(itemObj);
      }
      if (!this.selectedMode) {
        this.selectedMode = this.settings[1];
        this.sendSettings(this.selectedMode);
      }
    }
    );
  }

  sendWinner(value): void {
    this.gameService.sendResult(value);
  }
  sendProgress(value): void {
    this.gameService.sendProgress(value);
  }

  clickStartGame(userName, size, delay) {
    this.sendWinner('');
    this.sendProgress(false);
    this.fieldComponent.userScore = 0;
    this.fieldComponent.computerScore = 0;
    this.fieldComponent.checkedItems = 0;
    this.fieldComponent.makeField(this.settingsService.currentSettings.field);
    this.fieldComponent.gameSession(this.fieldComponent.field, userName, size, delay);
  }

  clickStopGame() {
    this.sendProgress(true);
    this.fieldComponent.userScore = 0;
    this.fieldComponent.computerScore = 0;
    this.fieldComponent.checkedItems = 0;
    this.fieldComponent.finishGame('');
    this.getSettings();
  }

  ngOnInit() {
    this.sendProgress(true);
    this.getSettings();
  }

}
