import type { Card, GameState } from "./types";
import {
  createBaseDeck,
  filterScoundrelDeck,
  mapCardTypes,
  shuffle,
} from "./deck";

/**
 * Creates the initial game state with a shuffled Scoundrel deck.
 * @returns Initial GameState ready to play.
 */
export function createInitialGameState(): GameState {
  const baseDeck = createBaseDeck();
  const filteredDeck = filterScoundrelDeck(baseDeck);
  const typedDeck = mapCardTypes(filteredDeck);
  const shuffledDeck = shuffle(typedDeck);

  return {
    dungeonDeck: shuffledDeck,
    roomCards: [],
    discardPile: [],
    equippedWeapon: null,
    resolvedCardIds: [],
    health: 20,
    maxHealth: 20,
    skippedLastRoom: false,
    potionUsedThisTurn: false,
    cardsResolvedThisTurn: 0,
    status: "playing",
    score: null,
    lastResolvedCard: null,
  };
}

/**
 * Builds a room by drawing cards until there are 4 cards or the deck is empty.
 * Preserves any carry-over card already in roomCards.
 * @param state - Current game state.
 * @returns New game state with room built.
 */
export function buildRoom(state: GameState): GameState {
  if (state.status !== "playing") {
    return state;
  }

  const newRoomCards = [...state.roomCards];
  const newDeck = [...state.dungeonDeck];

  while (newRoomCards.length < 4 && newDeck.length > 0) {
    const card = newDeck.shift();
    if (card) {
      newRoomCards.push(card);
    }
  }

  return {
    ...state,
    dungeonDeck: newDeck,
    roomCards: newRoomCards,
    resolvedCardIds: [],
  };
}

/**
 * Skips the current room by moving all room cards to the bottom of the deck.
 * Only allowed if the previous room was not skipped.
 * @param state - Current game state.
 * @returns New game state with room skipped.
 */
export function skipRoom(state: GameState): GameState {
  if (state.status !== "playing" || state.skippedLastRoom) {
    return state;
  }

  const newDeck = [...state.dungeonDeck, ...state.roomCards];

  return {
    ...state,
    dungeonDeck: newDeck,
    roomCards: [],
    resolvedCardIds: [],
    skippedLastRoom: true,
    potionUsedThisTurn: false,
    cardsResolvedThisTurn: 0,
  };
}

/**
 * Enters the room, resetting turn flags.
 * @param state - Current game state.
 * @returns New game state with room entered.
 */
export function enterRoom(state: GameState): GameState {
  if (state.status !== "playing") {
    return state;
  }

  return {
    ...state,
    skippedLastRoom: false,
    potionUsedThisTurn: false,
    cardsResolvedThisTurn: 0,
    resolvedCardIds: [],
  };
}

/**
 * Resolves a card based on its type (monster, weapon, or potion).
 * @param state - Current game state.
 * @param cardId - ID of the card to resolve.
 * @param useWeapon - Whether to use equipped weapon for monsters (default: true if available).
 * @returns New game state after card resolution.
 */
export function resolveCard(
  state: GameState,
  cardId: string,
  useWeapon: boolean = true
): GameState {
  if (state.status !== "playing") {
    return state;
  }

  const cardIndex = state.roomCards.findIndex((c) => c.id === cardId);
  if (cardIndex === -1) {
    return state;
  }

  if (state.cardsResolvedThisTurn >= 3) {
    return state;
  }

  if (state.resolvedCardIds.includes(cardId)) {
    return state;
  }

  const card = state.roomCards[cardIndex];
  const newResolvedCardIds = [...state.resolvedCardIds, cardId];

  let newState: GameState = {
    ...state,
    resolvedCardIds: newResolvedCardIds,
    cardsResolvedThisTurn: state.cardsResolvedThisTurn + 1,
    lastResolvedCard: card,
  };

  if (card.type === "monster") {
    newState = resolveMonster(newState, card, useWeapon);
  } else if (card.type === "weapon") {
    newState = resolveWeapon(newState, card);
  } else if (card.type === "potion") {
    newState = resolvePotion(newState, card);
  }

  if (newState.health <= 0) {
    newState = {
      ...newState,
      status: "dead",
      score: computeDeathScore(newState),
    };
  }

  return newState;
}

/**
 * Resolves a monster card through combat.
 * @param state - Current game state.
 * @param monster - Monster card to fight.
 * @param useWeapon - Whether to use equipped weapon (default: true if available).
 * @returns New game state after combat.
 */
function resolveMonster(
  state: GameState,
  monster: Card,
  useWeapon: boolean = true
): GameState {
  const canUseWeapon =
    useWeapon &&
    state.equippedWeapon !== null &&
    (state.equippedWeapon.maxMonsterValueUsedOn === null ||
      monster.value <= state.equippedWeapon.maxMonsterValueUsedOn);

  if (canUseWeapon && state.equippedWeapon) {
    const weapon = state.equippedWeapon;
    const damage = Math.max(0, monster.value - weapon.card.value);
    const newHealth = state.health - damage;

    const updatedWeapon = {
      ...weapon,
      slainMonsters: [...weapon.slainMonsters, monster],
      maxMonsterValueUsedOn: monster.value,
    };

    return {
      ...state,
      health: newHealth,
      equippedWeapon: updatedWeapon,
    };
  } else {
    const damage = monster.value;
    const newHealth = state.health - damage;

    return {
      ...state,
      health: newHealth,
      discardPile: [...state.discardPile, monster],
    };
  }
}

/**
 * Resolves a weapon card by equipping it.
 * @param state - Current game state.
 * @param weaponCard - Weapon card to equip.
 * @returns New game state with weapon equipped.
 */
function resolveWeapon(state: GameState, weaponCard: Card): GameState {
  const oldWeapon = state.equippedWeapon;
  const newDiscardPile = [...state.discardPile];

  if (oldWeapon) {
    newDiscardPile.push(oldWeapon.card, ...oldWeapon.slainMonsters);
  }

  const newWeapon = {
    card: weaponCard,
    slainMonsters: [],
    maxMonsterValueUsedOn: null,
  };

  return {
    ...state,
    equippedWeapon: newWeapon,
    discardPile: newDiscardPile,
  };
}

/**
 * Resolves a potion card by healing.
 * Only the first potion per turn has effect.
 * @param state - Current game state.
 * @param potion - Potion card to use.
 * @returns New game state after potion use.
 */
function resolvePotion(state: GameState, potion: Card): GameState {
  if (state.potionUsedThisTurn) {
    return {
      ...state,
      discardPile: [...state.discardPile, potion],
    };
  }

  const newHealth = Math.min(state.maxHealth, state.health + potion.value);

  return {
    ...state,
    health: newHealth,
    potionUsedThisTurn: true,
    discardPile: [...state.discardPile, potion],
  };
}

/**
 * Ends the turn if 3 cards have been resolved.
 * Carries over 1 card to the next room.
 * @param state - Current game state.
 * @returns New game state after turn ends.
 */
export function endTurnIfReady(state: GameState): GameState {
  if (state.status !== "playing") {
    return state;
  }

  if (state.cardsResolvedThisTurn !== 3) {
    return state;
  }

  const unresolvedCards = state.roomCards.filter(
    (c) => !state.resolvedCardIds.includes(c.id)
  );

  if (unresolvedCards.length !== 1) {
    return state;
  }

  const newState: GameState = {
    ...state,
    roomCards: unresolvedCards,
    resolvedCardIds: [],
    potionUsedThisTurn: false,
    cardsResolvedThisTurn: 0,
  };

  if (newState.dungeonDeck.length === 0 && newState.roomCards.length === 1) {
    return {
      ...newState,
      status: "cleared",
      score: computeClearScore(newState),
    };
  }

  return newState;
}

/**
 * Computes the death score when health drops to 0 or below.
 * Score = currentHealth - sum of remaining monster values in deck.
 * @param state - Game state at death.
 * @returns Death score (typically negative or zero).
 */
export function computeDeathScore(state: GameState): number {
  const unresolvedRoomCards = state.roomCards.filter(
    (c) => !state.resolvedCardIds.includes(c.id)
  );
  const remainingMonsters = [
    ...state.dungeonDeck,
    ...unresolvedRoomCards,
  ].filter((card) => card.type === "monster");

  const totalMonsterValue = remainingMonsters.reduce(
    (sum, card) => sum + card.value,
    0
  );

  return state.health - totalMonsterValue;
}

/**
 * Computes the clear score when the dungeon is cleared.
 * If health < 20: score = health
 * If health === 20 and last resolved card was a potion: score = health + potion value
 * @param state - Game state when cleared.
 * @returns Clear score.
 */
export function computeClearScore(state: GameState): number {
  if (state.health < 20) {
    return state.health;
  }

  if (
    state.health === 20 &&
    state.lastResolvedCard &&
    state.lastResolvedCard.type === "potion"
  ) {
    return state.health + state.lastResolvedCard.value;
  }

  return state.health;
}
