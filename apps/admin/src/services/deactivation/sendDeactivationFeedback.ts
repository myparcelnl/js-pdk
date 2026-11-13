export interface DeactivationFeedback {
  reason: string;
  details: string;
}

/**
 * Sends the reason for deactivation to MyParcel.
 *
 * @TODO: INT-2271 Send the feedback through a PDK endpoint. Until then, nothing is sent.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sendDeactivationFeedback = async (feedback: DeactivationFeedback): Promise<void> => {
  // Intentionally empty.
};
