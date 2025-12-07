import type { EquippedWeapon } from '../state/types';
import { CardView } from './CardView';

interface EquippedWeaponProps {
  weapon: EquippedWeapon | null;
}

/**
 * Displays the currently equipped weapon and stacked slain monsters.
 * @param props - Component props.
 * @returns EquippedWeapon component.
 */
export function EquippedWeapon({ weapon }: EquippedWeaponProps): JSX.Element {
  if (!weapon) {
    return (
      <div style={{ margin: '10px 0' }}>
        <h4>Weapon: None</h4>
      </div>
    );
  }

  return (
    <div style={{ margin: '10px 0' }}>
      <h4>Equipped Weapon</h4>
      <CardView card={weapon.card} />
      <div style={{ marginTop: '10px' }}>
        <p>Power: {weapon.card.value}</p>
        <p>
          Max monster value: {weapon.maxMonsterValueUsedOn ?? 'None (unused)'}
        </p>
        <p>Monsters slain: {weapon.slainMonsters.length}</p>
        {weapon.slainMonsters.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <strong>Slain Monsters:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {weapon.slainMonsters.map((monster) => (
                <CardView key={monster.id} card={monster} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

