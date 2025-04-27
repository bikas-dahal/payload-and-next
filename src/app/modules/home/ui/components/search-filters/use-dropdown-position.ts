import { RefObject } from "react";

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // Set your dropdown width here

    // intial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY + 10; // 10px below the button

    // check it goes off the screen
    if (left + dropdownWidth > window.innerWidth) {
      left = rect.right - dropdownWidth + window.scrollX; // Align to the right of the button

      if (left < 0) {
        left = window.innerWidth - 16 - dropdownWidth; // Align to the left of the screen
      }

      if (left < 0) {
        left = 16; // Align to the left of the screen
      }
      return { top, left };
    }
  };
  return { getDropdownPosition };
};
