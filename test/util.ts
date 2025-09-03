import fs from "fs";
import { render, screen, prettyDOM } from "@testing-library/vue";
import { writeFileSync } from "fs";
import { join } from "path";
import type { UserEvent } from "@testing-library/user-event";

export function forceLog(...args: any) {
    process.stderr.write("\x1b[36m[TEST LOG]\x1b[0m " + args.join(" ") + "\n");
}

export function logToFile(message: string) {
    fs.appendFileSync("debug.log", `${new Date().toISOString()}: ${message}\n`);
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
    await user.type(element, value);
}

export async function forceVueLog (message: string){
    prettyDOM()
}