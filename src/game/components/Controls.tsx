interface ControlsProps {
  onSkipRoom: () => void;
  canSkipRoom: boolean;
  status: string;
}

/**
 * Control buttons for game actions.
 * @param props - Component props.
 * @returns Controls component.
 */
export function Controls({
  onSkipRoom,
  canSkipRoom,
  status,
}: ControlsProps): JSX.Element {
  if (status !== "playing") {
    return null;
  }

  return null;
}
