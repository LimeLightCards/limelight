import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { parse } from 'csv-parse/browser/esm/sync';
import { ICard } from '../../../interfaces';

import { ApiService } from '../api.service';
import { CardsService } from '../cards.service';

type CardWithQuantity = ICard & { quantity: number };

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  public searchString = '';

  public collectionCards: CardWithQuantity[] = [];
  public displayCards: CardWithQuantity[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private apiService: ApiService,
    private cardsService: CardsService
  ) { }

  ngOnInit() {
    this.updateCollectionCards();
  }

  search(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

  doSearch() {
    const search = this.searchString.toLowerCase();

    if(search === '') {
      this.displayCards = this.collectionCards.slice(0);
    } else {
      this.displayCards = this.collectionCards.filter(card =>
        card.name.toLowerCase().includes(search)
     || card.code.toLowerCase().includes(search)
     || card.expansion.toLowerCase().includes(search));
    }

    this.table.offset = 0;
  }

  adjustCardQuantity(card: CardWithQuantity, quantity: -1|1) {

    const callback = () => {
      card.quantity += quantity;
      if(card.quantity <= 0) {
        this.cardsService.removeCardFromCollection(card.code);
        this.updateCollectionCards();
      }
    };

    if(quantity < 0) {
      this.apiService.removeCards({ [card.code]: -quantity }).subscribe(callback);
    }

    if(quantity > 0) {
      this.apiService.addCards({ [card.code]: quantity }).subscribe(callback);
    }
  }

  private updateCollectionCards() {
    this.collectionCards = Object.keys(this.cardsService.cardCollection)
      .map(code => ({ ...this.cardsService.getCardById(code), quantity: this.cardsService.cardCollection[code] }));

    this.displayCards = this.collectionCards.slice(0);
  }

  async resetCardsPrompt() {
    const alert = await this.alertController.create({
      header: 'Reset Collection',
      message: 'Are you sure you want to reset your collection? This cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Reset',
          role: 'destructive',
          handler: () => {
            this.apiService.resetCards().subscribe();
          }
        }
      ]
    });

    await alert.present();
  }

  async addCardsPrompt() {
    const alert = await this.alertController.create({
      header: 'Card Collection Import',
      subHeader: 'Import from TSV',
      message: 'When pasting cards below, they should be in the format "Card Name,Quantity" or "Card Code,Quantity"',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add Cards',
          handler: (data) => {
            if(!data.cards) {
              return;
            }

            const output = parse(data.cards, {
              delimiter: ['\t'],
              quote: '',
              trim: true
            });

            this.addCards(output);
          }
        },
      ],
      inputs: [
        {
          type: 'textarea',
          name: 'cards',
          placeholder: 'Paste your TSV here',
          attributes: {
            rows: 6
          }
        },
      ],
    });

    await alert.present();
  }

  async addCards(cards: string[][]) {
    const validCards = [];
    const invalidCards = [];

    cards.forEach(([codeOrName, quantity]) => {
      const card = this.cardsService.getCardByCodeOrName(codeOrName);

      if(card) {
        validCards.push({ card, quantity: +quantity });
      } else {
        invalidCards.push(codeOrName);
      }
    });

    if(invalidCards.length > 0) {
      let cardsString = invalidCards.slice(0, 25).join('<br>');
      if(invalidCards.length > 25) {
        cardsString += '<br>... and ' + (invalidCards.length - 25) + ' more';
      }

      const alert = await this.alertController.create({
        header: 'Invalid Cards',
        subHeader: 'The following cards were not found, please fix or remove them before importing:',
        message: cardsString,
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    const sendCards = {};
    validCards.forEach(card => {
      sendCards[card.card.code] = card.quantity;
    });

    this.apiService.addCards(sendCards).subscribe(() => {
      this.cardsService.addCardsToCollection(sendCards);
      this.updateCollectionCards();
    });
  }

}
