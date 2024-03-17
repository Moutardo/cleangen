import { copyDir } from "../utils/files";
import { buildPath } from "../utils/files";

export async function init_core(target: string) {
    const src = buildPath([__dirname, "..", "..", "src", "base_files", target, "core"]);
    const dest = buildPath(["core"]);
    copyDir(src, dest, true);

    console.log("Clean architecture core created");
}