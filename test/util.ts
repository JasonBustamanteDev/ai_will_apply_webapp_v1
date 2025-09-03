import fs from "fs";
import { render, screen, prettyDOM } from "@testing-library/vue";
import { writeFileSync } from "fs";
import { join } from "path";
import { nextTick } from "vue";
import type { UserEvent } from "@testing-library/user-event";

export function forceLog(...args: any) {
    process.stderr.write("\x1b[36m[TEST LOG]\x1b[0m " + args.join(" ") + "\n");
}

export function forceLogElement(el: HTMLElement | Element) {
    const msg = prettyDOM(el, Infinity);
    process.stderr.write("\x1b[36m[TEST LOG]\x1b[0m " + msg);
}
export function delay(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function fillInputField(
    user: UserEvent,
    element: HTMLElement,
    value: string
) {
    await user.click(element);
    await user.clear(element);
    await user.type(element, value);
}

export async function selectDropdownOption(
    user: UserEvent,
    element: HTMLElement,
    arrowDownCount: number = 1,
) {
    await user.click(element);
    
    // Apply the specified number of arrow down keypresses
    for (let i = 0; i < arrowDownCount; i++) {
        await user.keyboard("{ArrowDown}");
    }
    
    await user.keyboard("{Enter}");
}