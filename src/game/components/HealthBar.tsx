interface HealthBarProps {
  health: number;
  maxHealth: number;
}

/**
 * Displays current and maximum health.
 * @param props - Component props.
 * @returns HealthBar component.
 */
export function HealthBar({ health, maxHealth }: HealthBarProps): JSX.Element {
  const percentage = (health / maxHealth) * 100;
  const healthColor = health > maxHealth * 0.5 ? '#4CAF50' : health > maxHealth * 0.25 ? '#FF9800' : '#F44336';

  return (
    <div style={{ margin: '10px 0' }}>
      <h4>Health: {health} / {maxHealth}</h4>
      <div
        style={{
          width: '300px',
          height: '30px',
          border: '2px solid #333',
          borderRadius: '4px',
          backgroundColor: '#f0f0f0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: healthColor,
            transition: 'width 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          {health > 0 && `${health}`}
        </div>
      </div>
    </div>
  );
}

