export function Log(stack, level, module, msg) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level}] [${module}] ${msg}`;
    console.log(logMessage);
}