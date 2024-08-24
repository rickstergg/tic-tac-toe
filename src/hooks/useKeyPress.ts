import { useEffect, useMemo, useRef, useState } from "react";

type KeyCode = string | Array<string>;
type KeyOrCode = "key" | "code";
type KeyPressCallback = (event: KeyboardEvent) => void;
type Keys = Array<string>;
type PressedKeys = Set<string>;

interface UseKeyPressOptions {
  callback?: KeyPressCallback;
  preventDefault?: boolean;
  target?: Window | Document | HTMLElement | ShadowRoot | null;
}

/**
 * @description Determines if one of the combination of keys in all possible keys were pressed.
 *
 * @param keyCodes the array of combinations to return true e.g. ['a', 'a+d']
 * @param pressedKeys keys currently pressed ['Shift' , 'b']
 * @param isUp boolean representing if it's a keyup event, false if keydown
 * @returns a boolean, true if one of the combinations was pressed, false otherwise
 */
function isMatchingKey(
  keyCodes: Array<Keys>,
  pressedKeys: PressedKeys,
  isUp: boolean,
): boolean {
  return keyCodes
    .filter((keys) => isUp || keys.length === pressedKeys.size)
    .some((keys) => keys.every((k) => pressedKeys.has(k)));
}

/**
 * @description Determines whether to use an Event's key or code property, useful for altKey, Meta, etc.
 *
 * @param eventCode the KeyboardEvent's code property, e.g. KeyA
 * @param keysToWatch an array of keys to watch out for
 * @returns 'key' or 'code'
 */
function determineKeyOrCode(
  eventCode: string,
  keysToWatch: KeyCode,
): KeyOrCode {
  return keysToWatch.includes(eventCode) ? "code" : "key";
}

/**
 * @description Based off xyflow's useKeyPress,
 * Fires a function to fire when certain keys are pressed, or returns true for conditional rendering.
 *
 * @param keyCode can be a string or arrays of strings: 'a' or ['a', 'a+d']
 * @param options additional flags and modifiers for the keyPress
 * @param options.target an element to add the event listeners for, defaults to document
 * @param options.callback an optional callback function that gets fired if one of the combinations is found
 * @param options.preventDefault an optional flag that prevents bubbling
 * @returns a boolean, true if keys are pressed, false otherwise
 */

export const useKeyPress = (
  keyCode: KeyCode,
  options: UseKeyPressOptions = { preventDefault: true },
): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);
  const pressedKeys = useRef<PressedKeys>(new Set([]));
  const modifierPressed = useRef(false);

  const [keyCodes, keysToWatch] = useMemo<[Array<Keys>, Keys]>(() => {
    if (keyCode !== null) {
      const keyCodeArr = Array.isArray(keyCode) ? keyCode : [keyCode];
      const keys = keyCodeArr
        .filter((kc) => typeof kc === "string")
        .map((kc) => kc.split("+"));
      const keysFlattened = keys.reduce(
        (res: Keys, item) => res.concat(...item),
        [],
      );

      return [keys, keysFlattened];
    }

    return [[], []];
  }, [keyCode]);

  useEffect(() => {
    const doc = typeof document !== "undefined" ? document : null;
    const target = options?.target || doc;

    if (keyCode !== null) {
      const downHandler = (event: KeyboardEvent) => {
        modifierPressed.current =
          event.ctrlKey || event.metaKey || event.shiftKey;

        const keyOrCode = determineKeyOrCode(event.code, keysToWatch);
        pressedKeys.current.add(event[keyOrCode]);

        if (isMatchingKey(keyCodes, pressedKeys.current, false)) {
          if (options.preventDefault) {
            event.preventDefault();
          }
          setKeyPressed(true);
          if (options.callback) {
            options.callback(event);
          }
        }
        return;
      };

      const upHandler = (event: KeyboardEvent) => {
        const keyOrCode = determineKeyOrCode(event.code, keysToWatch);

        if (isMatchingKey(keyCodes, pressedKeys.current, true)) {
          setKeyPressed(false);
          pressedKeys.current.clear();
        } else {
          pressedKeys.current.delete(event[keyOrCode]);
        }

        // Keyup isn't triggered on macs when Meta key is pressed, so reset.
        // https://stackoverflow.com/questions/27380018/when-cmd-key-is-kept-pressed-keyup-is-not-triggered-for-any-other-key
        if (event.key === "Meta") {
          pressedKeys.current.clear();
        }

        modifierPressed.current = false;
        return;
      };

      const resetHandler = () => {
        pressedKeys.current.clear();
        setKeyPressed(false);
      };

      target?.addEventListener(
        "keydown",
        downHandler as EventListenerOrEventListenerObject,
      );
      target?.addEventListener(
        "keyup",
        upHandler as EventListenerOrEventListenerObject,
      );
      window.addEventListener("blur", resetHandler);

      return () => {
        target?.removeEventListener(
          "keydown",
          downHandler as EventListenerOrEventListenerObject,
        );
        target?.removeEventListener(
          "keyup",
          upHandler as EventListenerOrEventListenerObject,
        );
        window.removeEventListener("blur", resetHandler);
      };
    }

    return;
  }, [keyCode, keyCodes, keysToWatch, options, setKeyPressed]);

  return keyPressed;
};
