# Scoundrel – Game Design (For Implementation)

This doc defines the rules and behavior of the single-player card game **Scoundrel**, adapted for a digital implementation with a standard 52-card deck.

The goal is to **survive** to the end of the dungeon (the deck) starting from 20 health.

---

## Core Concepts

- **Players**: 1
- **Starting health**: 20
- **Max health**: 20
- **Deck**: Standard 52-card deck, with modifications.

### Deck Composition

Start from a standard 52-card deck:

- Remove all **Jokers** (if present).
- Remove **red face cards**:
  - J♦, Q♦, K♦, J♥, Q♥, K♥
- Remove **red Aces**:
  - A♦, A♥

The remaining cards are mapped as:

- **Monsters**:
  - Suits: Clubs (♣), Spades (♠)
  - Ranks: 2–A
  - Monster value:
    - 2–10 → 2–10
    - J = 11, Q = 12, K = 13, A = 14
- **Weapons**:
  - Suit: Diamonds (♦)
  - Ranks: 2–10 only
  - Weapon value: 2–10 (rank value)
- **Potions**:
  - Suit: Hearts (♥)
  - Ranks: 2–10 only
  - Potion value: 2–10 (heal amount)

---

## Room / Turn Structure

The deck represents a **dungeon**. You encounter it room by room.

### Room

- A **room** is up to **4 face-up cards**.
- You must **resolve exactly 3 cards** each time you enter a room.
- The **4th card** is **carried forward** into the next room.

### Turn Overview

Each **turn**:

1. **Build the room**:
   - If there’s a carried-over card from the previous turn, start the room with that card.
   - Draw cards from the deck until there are **4 cards** in the room, or the deck is empty.

2. **Choose: Skip or Enter the room**:
   - **Skip Room**:
     - Allowed only if you **did NOT skip the previous room**.
     - Move **all room cards** (however many are present) to the **bottom** of the deck, in order.
     - Start a new turn and build a new room.
   - **Enter Room**:
     - You must resolve **exactly 3 cards** in any order.
     - The remaining 1 card is carried over to the next room.

3. **Resolve cards**:
   - For each of the 3 chosen cards:
     - Apply its effect based on whether it’s a **monster**, **weapon**, or **potion**.
     - Remove that card from the room (discard it or stack it on weapon, depending on type).

4. **End of turn**:
   - 1 card remains in the room.
   - That card is carried into the next room (it starts the next room).
   - Build the next room and repeat until death or deck cleared.

---

## Card Effects

### Weapons (Diamonds 2–10)

When you select a **weapon**:

- If there is an equipped weapon:
  - The **old weapon** and all monsters stacked on it are moved to the **discard pile**.
- The selected weapon becomes the **new equipped weapon**.
- The weapon has:
  - `power` (2–10, its rank value)
  - A list of `slain monsters` (initially empty)
  - A `maxMonsterValueUsedOn` constraint (see below).

#### Weapon constraint

Weapons are limited by the **strongest monster they’ve been used on**:

- When a weapon is used to fight a monster of value `M`:
  - If it has never been used before → this sets `maxMonsterValueUsedOn = M`.
  - On subsequent uses, it can only be used on monsters with value **≤ `maxMonsterValueUsedOn`**.
- If a monster’s value is **greater** than `maxMonsterValueUsedOn`, you **cannot** use the weapon against that monster and must fight barehanded.

When a weapon is used against a monster:

- Damage taken = `max(0, monsterValue - weaponPower)`.
- Health decreases by that amount.
- The monster is considered **slain** and is added to the weapon’s `slainMonsters` stack.
- `maxMonsterValueUsedOn` is updated to the current monster value (or consistently updated so that the rule “cannot exceed last used value” is enforced).

### Potions (Hearts 2–10)

When you select a **potion**:

- You can only gain healing from **one potion per turn**.
- If it’s the **first potion** used this turn:
  - Heal = potion value.
  - New health = `min(maxHealth, health + potionValue)`.
- If it’s **not** the first potion this turn:
  - It has **no effect** (wasted card).
- After resolution, the potion is moved to the **discard pile**.

### Monsters (Clubs & Spades, 2–A)

When you select a **monster**, you either:

1. Fight **with weapon** (if allowed), or  
2. Fight **barehanded**.

#### Fighting with weapon

Conditions:

- There **is** an equipped weapon.
- Either:
  - The weapon has never been used (no previous monster), or
  - Monster value ≤ `maxMonsterValueUsedOn`.

If allowed:

- Damage taken = `max(0, monsterValue - weaponPower)`.
- Health decreases by that amount.
- The monster is **slain** and stacked on the weapon.
- `maxMonsterValueUsedOn` updated to the current monster value (or according to the chosen rule).

If not allowed (monster too strong, or no weapon):

#### Fighting barehanded

- Damage taken = full monster value.
- Health decreases by monsterValue.
- The monster card is discarded.

If health drops to **0 or below** at any point, the game ends in **death**.

---

## Skipping Rooms

- You **cannot skip two rooms in a row**.
- When you skip:
  - All current room cards go to the **bottom of the deck**.
  - You build a new room from the deck.
  - You keep your current health, weapon, etc.

---

## End of Game & Scoring

### Death

You die when `health <= 0`.

On death:

- Compute the total value of all **remaining monster cards** left in the **deck**.
- Final score = `currentHealth - sum(remainingMonsterValues)` (this will be ≤ 0).
- The game state is shown as **“dead”**.

### Dungeon Cleared (Survive)

You clear the dungeon if:

- The deck is empty **and**
- All rooms are fully resolved (no more cards to draw or resolve).

Scoring when cleared:

- If `health < 20`:  
  - Final score = `health`.
- If `health === 20` **and** the **last resolved card** was a **potion**:
  - Final score = `health + valueOfLastPotion` (overhealed bonus).

The game state is shown as **“cleared”** with the final score.
