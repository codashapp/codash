import chalk from 'chalk';
export default function log (message: string, status: boolean = true) {
    console.log("[  " + (status ? chalk.green("OK") : chalk.red("ERROR")) + "  ]: " + message);
}