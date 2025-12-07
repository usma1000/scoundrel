import React from "react";

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
  onSkipRoom: _onSkipRoom,
  canSkipRoom: _canSkipRoom,
  status,
}: ControlsProps): React.ReactElement | null {
  if (status !== "playing") {
    return null;
  }

  return null;
}
