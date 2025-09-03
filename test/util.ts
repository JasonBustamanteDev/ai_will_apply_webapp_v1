import fs from "fs";

export function forceLog(...args: any) {
    process.stderr.write("\x1b[36m[TEST LOG]\x1b[0m " + args.join(" ") + "\n");
}

export function logToFile(message: string) {
    fs.appendFileSync("debug.log", `${new Date().toISOString()}: ${message}\n`);
}

export function delay(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
