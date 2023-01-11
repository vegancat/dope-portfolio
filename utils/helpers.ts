// @ts-ignore
import _ from "lodash";

export const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export function pkShortener(pubkey: string, length: number = 3): string {
  if (_.isNil(pubkey)) {
    return "";
  }

  // skipping '0x' for start
  return pubkey.slice(0, length + 2) + "..." + pubkey.slice(-1 * length);
}
