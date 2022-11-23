import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardTrigger, ICard } from '../../../interfaces';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  public cardData: ICard = undefined;
  public soulArray = [];

  public similarCards: Array<{ card: ICard; score: number }> = [];

  public deckStats: any = { decks: [] };

  // this is going to be a mess
  public encodedCardName = '';
  public encoreDecksId = '';

  public tcgplayerPrice = 0;

  public hotcCode = '';

  public json = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public cardsService: CardsService
  ) { }

  ngOnInit() {
    const cardId = this.route.snapshot.paramMap.get('id');
    this.cardData = this.cardsService.getCardById(cardId);

    if(!this.cardData) {
      this.router.navigate(['/']);
      return;
    }

    this.soulArray = Array(this.cardData.soul).fill(CardTrigger.Soul);

    this.loadCardExtraData();
    this.getCardsLikeThisCard();
  }

  search(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

  private async loadCardExtraData() {

    this.encodedCardName = encodeURIComponent(this.cardData.name);
    this.json = JSON.stringify(this.cardData);
    this.hotcCode = this.cardData.code.split('-E').join('-');

    const cardId = this.cardData.code;
    const cardRarity = this.cardData.rarity;

    // encore decks
    const encoreDecks = async () => {
      try {
        const encoreSearch = await fetch(`https://encoredecks.com/api/card?text=${cardId}`);
        const encoreSearchBody = await encoreSearch.json();

        if(encoreSearchBody.length > 0) {
          this.encoreDecksId = encoreSearchBody[0].id;
        }
      } catch(e) {
        console.error('Encore decks failed', e);
      }
    };

    // tcgplayer
    const tcgplayer = async () => {
      try {
        const price = await fetch(
          `${environment.priceApi}/api/cards/tcgplayerprice?code=${cardId}&rarity=${cardRarity}&name=${this.encodedCardName}`);
        const priceBody = await price.json();

        this.tcgplayerPrice = priceBody;
      } catch(e) {
        console.error('Weiss price failed', e);
      }
    };

    const deckStats = async () => {
      this.apiService.getDeckStatsForCard(cardId).subscribe((d: any) => {
        this.deckStats = d.stats;
      });
    };

    encoreDecks();
    tcgplayer();
    deckStats();
  }

  searchTag(tag: string) {
    this.search(`tag:"${tag}"`);
  }

  private getCardsLikeThisCard() {
    this.similarCards = this.cardsService.getCardsLikeCard(this.cardData, 4);
  }

}
