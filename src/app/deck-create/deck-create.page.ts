import { Component, OnInit } from '@angular/core';
import { AlertController, IonicSlides } from '@ionic/angular';
import { chunk } from 'lodash';
import { parse } from 'csv-parse/browser/esm/sync';
import SwiperCore, { Keyboard, Grid, Navigation, Pagination, Scrollbar, Zoom } from 'swiper';
import { LocalStorage } from 'ngx-webstorage';

import { CardType, ICard, IDeck } from '../../../interfaces';
import { ApiService } from '../api.service';
import { CardsService } from '../cards.service';
import { NotifyService } from '../notify.service';
import { ActivatedRoute, Router } from '@angular/router';

SwiperCore.use([Keyboard, Grid, Navigation, Pagination, Scrollbar, Zoom, IonicSlides]);

const resetDeck = (): IDeck => ({
  name: 'New Deck',
  description: '',
  author: '',
  revisions: [],
  cards: {}
});

@Component({
  selector: 'app-deck-create',
  templateUrl: './deck-create.page.html',
  styleUrls: ['./deck-create.page.scss'],
})
export class DeckCreatePage implements OnInit {

  @LocalStorage() currentDeck: IDeck;
  @LocalStorage() searchExpansion;
  @LocalStorage() searchRefinement;

  public filteredCards = [];
  public deckStats: any = {};
  public isSaving = false;

  public activeCard: ICard;

  public cardsByLevelThenStack = {
    [0]: [],
    [1]: [],
    [2]: [],
    [3]: [],
    climax: []
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private notifyService: NotifyService,
    private cardsService: CardsService,
    private apiService: ApiService
  ) { }

  ngOnInit() {

    const finalize = () => {
      if(!this.searchExpansion) {
        this.searchExpansion = '';
      }

      if(!this.searchRefinement) {
        this.searchRefinement = '';
      }

      this.updateShownCards();
      this.recalculateDeck();
      this.recalculateStats();
    };

    const isEdit = window.location.href.includes('edit');
    if(isEdit) {
      const deckId = this.route.snapshot.paramMap.get('id');
      this.apiService.getDeckById(deckId).subscribe(deck => {
        if(!deck) {
          this.router.navigate(['/deck/create']);
          return;
        }

        this.currentDeck = deck;
        this.potentiallyLoadRevision();
        this.saveDeck();
        finalize();
      }, () => {
        this.router.navigate(['/deck/create']);
      });

      return;
    }

    if(!this.currentDeck) {
      this.currentDeck = resetDeck();
    }

    finalize();
  }

  private potentiallyLoadRevision() {
    const revision = this.route.snapshot.queryParams.revision || '';
    if(!revision) {
      return;
    }

    const revisionData = this.currentDeck.revisions.find(rev => rev.id === revision);
    this.currentDeck.cards = revisionData.cards;
  }

  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Deck Creation Help',
      message: `To get started, type an set in the "Expansion" box. This will show you all cards in that set.
      <br>
      <br>
      From there, you can further filter down cards using the same syntax on the search page using the "Refinement" box.
      <br>
      <br>
      <strong>Gesture Help</strong>
      <br>
      <br>
      · When hovering over a card, you can right click it to add it to your deck.
      <br>
      · When hovering over a card in your deck, you can right click to remove it.`,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  setActiveCard(card: ICard) {
    this.activeCard = card;
  }

  async resetPrompt() {
    const alert = await this.alertController.create({
      header: 'Reset Deck',
      message: 'This will reset your current deck. This action is irreversible. Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reset Deck',
          role: 'destructive',
          handler: (data) => {
            this.currentDeck = resetDeck();
            this.saveDeck();
            this.recalculateStats();
          }
        },
      ]
    });

    await alert.present();
  }

  async addCardsPrompt() {
    const alert = await this.alertController.create({
      header: 'Deck Import',
      subHeader: 'Import from TSV',
      message: `When pasting cards below, they should be in the format "Card Name,Quantity" or "Card Code,Quantity".
        Doing this will overwrite your current deck.`,
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

    this.currentDeck.cards = {};
    validCards.forEach(card => {
      this.currentDeck.cards[card.card.code] = card.quantity;
    });

    this.saveDeck();
    this.recalculateDeck();
    this.recalculateStats();
  }

  updateShownCards() {
    if(!this.searchExpansion && !this.searchRefinement) {
      this.filteredCards = [];
      return;
    }

    const searchQuery = `expansion:"${this.searchExpansion}" ${this.searchRefinement}`;
    this.filteredCards = this.cardsService.searchCards(searchQuery);
  }

  addCardToDeck($event, cardId: string) {
    $event.preventDefault();
    $event.stopPropagation();

    this.currentDeck.cards[cardId] = (this.currentDeck.cards[cardId] || 0) + 1;

    this.saveDeck();
    this.recalculateDeck();
    this.recalculateStats();
  }

  removeCardFromDeck($event, cardId: string) {
    $event.preventDefault();
    $event.stopPropagation();

    this.currentDeck.cards[cardId] = (this.currentDeck.cards[cardId] || 0) - 1;
    if(this.currentDeck.cards[cardId] <= 0) {
      delete this.currentDeck.cards[cardId];
    }

    this.saveDeck();
    this.recalculateDeck();
    this.recalculateStats();
  }

  public saveDeck() {
    this.currentDeck = this.currentDeck;
  }

  private recalculateDeck() {
    this.cardsByLevelThenStack = {
      [0]: [],
      [1]: [],
      [2]: [],
      [3]: [],
      climax: []
    };

    [0, 1, 2, 3].forEach(level => {
      const cards = this.getCardsAtLevel(level);
      this.cardsByLevelThenStack[level] = this.breakCardsIntoStacks(cards);
    });

    const climaxCards = this.getClimaxCards();
    this.cardsByLevelThenStack.climax = climaxCards.map(cardId => Array(this.currentDeck.cards[cardId]).fill(cardId));
  }

  private recalculateStats() {
    this.deckStats = this.cardsService.getCardStatsForDeck(this.currentDeck);
  }

  trackBy(index) {
    return index;
  }

  numCards() {
    return this.cardsService.numCardsInDeck(this.currentDeck);
  }

  canSave() {
    return this.numCards() === 50 && !this.isSaving;
  }

  getCardsAtLevel(level = 0) {
    return Object.keys(this.currentDeck.cards || {}).filter(card => {
      const cardData = this.cardsService.getCardById(card);
      return cardData.level === level && cardData.type !== CardType.Climax;
    });
  }

  getClimaxCards() {
    return Object.keys(this.currentDeck.cards || {}).filter(card => {
      const cardData = this.cardsService.getCardById(card);
      return cardData && cardData.type === CardType.Climax;
    });
  }

  breakCardsIntoStacks(cardIds: string[]): string[][] {
    const expanded = cardIds.map(cardId => Array(this.currentDeck.cards[cardId]).fill(cardId)).flat();
    return chunk(expanded, 4);
  }

  async save() {
    this.isSaving = true;

    const finalize = (res: IDeck) => {
      this.searchExpansion = '';
      this.searchRefinement = '';
      this.currentDeck = resetDeck();
      this.notifyService.showMessage('Deck saved successfully!');

      this.router.navigate(['/deck/view', res.id]);
      this.isSaving = false;
    };

    if(this.route.snapshot.queryParams.remix) {
      const revision = this.route.snapshot.queryParams.revision || '';
      this.apiService.remixDeck(this.currentDeck.id, revision, this.currentDeck).subscribe((res: IDeck) => {
        finalize(res);
      });
      return;
    }

    this.apiService.createOrUpdateDeck(this.currentDeck).subscribe((res: IDeck) => {
      finalize(res);
    });
  }

}
