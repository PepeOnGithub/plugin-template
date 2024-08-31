import { logger } from "@vendetta";
import Settings from "./Settings";

export default {
    onLoad: () => {
        logger.log("Testing!");
    },
    onUnload: () => {
        logger.log("Pepe is the goat real.");
    },
    settings: Settings,
}
