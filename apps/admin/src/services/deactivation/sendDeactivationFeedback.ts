export interface DeactivationFeedback {
  reason: string;
  details: string;
}

/**
 * Sends the reason for deactivation to MyParcel.
 *
 * @TODO: INT-312 Send the feedback through a PDK endpoint when INT-2272 stores it. Until then, nothing is sent.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sendDeactivationFeedback = async (feedback: DeactivationFeedback): Promise<void> => {
  // Intentionally empty.
};
