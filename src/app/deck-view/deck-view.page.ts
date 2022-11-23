import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { chunk, groupBy, sortBy, sum, shuffle } from 'lodash';

import { IDeck } from '../../../interfaces';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-deck-view',
  templateUrl: './deck-view.page.html',
  styleUrls: ['./deck-view.page.scss'],
})
export class DeckViewPage implements OnInit {

  public deckView: 'visual'|'list'|'stats' = 'visual';
  public deckSort: 'level'|'color'|'type' = 'level';

  public deck: IDeck;
  public deckStats = {};

  public viewingRevision = '';
  public viewingCards = {};
  public cardsSortedByHeaderAndType = [];
  public listCards = [];

  public deckCards = [];
  public drawnHand = [];
  public drawnCards = [];

  public parentDeck: IDeck;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    public cardsService: CardsService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    const deckId = this.route.snapshot.paramMap.get('id');
    this.apiService.getDeckById(deckId).subscribe(deck => {
      if(!deck) {
        this.router.navigate(['/deck/list']);
        return;
      }

      this.deck = deck;
      this.recalculateStats();
      this.setLayoutViews();
      this.setCardViewBasedOnRevision();
      this.drawHand();
    }, () => {
      this.router.navigate(['/deck/list']);
    });
  }

  search(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

  private setLayoutViews() {
    this.deckView = this.route.snapshot.queryParamMap.get('view') as any || 'visual';
    this.deckSort = this.route.snapshot.queryParamMap.get('sort') as any || 'level';
  }

  private recalculateStats() {
    this.deckStats = this.cardsService.getCardStatsForDeck(this.deck);
  }

  private setCardViewBasedOnRevision() {
    const revisionId = this.route.snapshot.queryParamMap.get('revision');
    if(!revisionId) {
      this.setCardView('', this.deck.cards);
      return;
    }

    const revision = this.deck.revisions.find(rev => rev.id === revisionId);
    if(!revision) {
      this.setCardView('', this.deck.cards);
      return;
    }

    this.setCardView(revisionId, revision.cards);
    this.drawHand();
  }

  public setCardView(revisionId: string, cards: Record<string, number>) {
    this.viewingRevision = revisionId;
    this.viewingCards = cards;
    this.resortCards();
  }

  public buildDeck() {
    this.deckCards = [];
    this.drawnHand = [];
    this.drawnCards = [];

    Object.keys(this.viewingCards).forEach(cardId => {
      for(let i = 0; i < this.viewingCards[cardId]; i++) {
        this.deckCards.push(this.cardsService.getCardById(cardId));
      }
    });

    this.deckCards = shuffle(this.deckCards);
  }

  public drawHand() {
    this.buildDeck();

    for(let i = 0; i < 5; i++) {
      this.drawnHand.push(this.deckCards.pop());
    }
  }

  public drawCard(quantity = 1) {
    for(let i = 0; i < quantity; i++) {
      this.drawnCards.push(this.deckCards.pop());
    }
  }

  private resortCards() {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { revision: this.viewingRevision, sort: this.deckSort, view: this.deckView },
      queryParamsHandling: 'merge'
    });

    if(this.deckView === 'stats') {
      return;
    }

    if(this.deckView === 'visual') {
      this.cardsSortedByHeaderAndType = [];
      const cards = [];

      Object.keys(this.viewingCards).forEach(cardId => {
        for(let i = 0; i < this.viewingCards[cardId]; i++) {
          cards.push(this.cardsService.getCardById(cardId));
        }
      });

      const sorted = sortBy(cards, 'name');
      const groups = groupBy(sorted, card => card[this.deckSort]);

      if(this.deckSort === 'level') {
        const climax = [];

        for(let i = 0; i <= 3; i++) {
          const groupCards = groups[i];
          if(!groupCards) {
            continue;
          }

          const allClimax = groupCards.filter(card => card.type === 'Climax');
          climax.push(...allClimax);

          const nonClimax = groupCards.filter(card => card.type !== 'Climax');

          const grouping = {
            header: `Level ${i}`,
            cards: chunk(nonClimax, 4) || []
          };

          if(grouping.cards.length > 0) {
            this.cardsSortedByHeaderAndType.push(grouping);
          }
        }

        const climaxGrouping = {
          header: 'Climax',
          cards: chunk(climax, 4) || []
        };

        if(climaxGrouping.cards.length > 0) {
          this.cardsSortedByHeaderAndType.push(climaxGrouping);
        }
      }

      if(this.deckSort === 'color') {
        const climax = [];

        ['Red', 'Blue', 'Green', 'Yellow'].forEach(color => {
          const groupCards = groups[color.substring(0, 1)];
          if(!groupCards) {
            return;
          }

          const allClimax = groupCards.filter(card => card.type === 'Climax');
          climax.push(...allClimax);

          const nonClimax = groupCards.filter(card => card.type !== 'Climax');

          const grouping = {
            header: `${color}`,
            cards: chunk(nonClimax, 4) || []
          };

          if(grouping.cards.length > 0) {
            this.cardsSortedByHeaderAndType.push(grouping);
          }
        });

        const climaxGrouping = {
          header: 'Climax',
          cards: chunk(climax, 4) || []
        };

        if(climaxGrouping.cards.length > 0) {
          this.cardsSortedByHeaderAndType.push(climaxGrouping);
        }
      }

      if(this.deckSort === 'type') {
        ['Character', 'Event', 'Climax'].forEach(type => {
          if(!groups[type]) {
            return;
          }

          const grouping = {
            header: `${type}`,
            cards: chunk(groups[type], 4) || []
          };

          if(grouping.cards.length > 0) {
            this.cardsSortedByHeaderAndType.push(grouping);
          }
        });
      }
    }

    if(this.deckView === 'list') {
      this.listCards = [];

      Object.keys(this.viewingCards).forEach(cardId => {
        const card = this.cardsService.getCardById(cardId);
        const owned = this.cardsService.getQuantityOwned(cardId);
        const quantity = this.viewingCards[cardId];

        this.listCards.push({
          ...card,
          price: 0,
          owned,
          quantity: this.viewingCards[cardId],
          needToBuy: quantity - owned,
        });
      });

      const getPrices = async () => {
        const allNames = this.listCards.map(card => encodeURIComponent(card.name)).join('|');
        const allCodes = this.listCards.map(card => card.code).join('|');
        const allRarities = this.listCards.map(card => card.rarity).join('|');

        const prices = await fetch(
          `${environment.priceApi}/api/cards/tcgplayerpricemulti?code=${allCodes}&rarity=${allRarities}&name=${allNames}`);
        const priceBody = await prices.json();

        for(let i = 0; i < this.listCards.length; i++) {
          this.listCards[i].price = priceBody[i];
        }
      };

      getPrices();
    }
  }

  totalPrice() {
    return sum(this.listCards.map(card => card.price * card.needToBuy));
  }

  trackBy(index) {
    return index;
  }

  export() {
    const tsv = Object.keys(this.deck.cards)
      .map(cardId => `${cardId}\t${this.deck.cards[cardId]}`)
      .join('\n');

    const el = document.createElement('a');
    el.setAttribute('href', 'data:text/tab-separated-values,' + encodeURIComponent(tsv));
    el.setAttribute('download', `${this.deck.name}.tsv`);

    el.click();
  }

}
