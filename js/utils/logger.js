

const LogLevel = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
};


const CURRENT_LOG_LEVEL = LogLevel.DEBUG;

export const Logger = {
    debug: (message, ...data) => {
        if (CURRENT_LOG_LEVEL <= LogLevel.DEBUG) {
            console.debug(`[DEBUG] ${message}`, ...data);
        }
    },
    info: (message, ...data) => {
        if (CURRENT_LOG_LEVEL <= LogLevel.INFO) {
            console.info(`[INFO] 🔵 ${message}`, ...data);
        }
    },
    warn: (message, ...data) => {
        if (CURRENT_LOG_LEVEL <= LogLevel.WARN) {
            console.warn(`[WARN] 🟠 ${message}`, ...data);
        }
    },
    error: (message, errorObj = null) => {
        if (CURRENT_LOG_LEVEL <= LogLevel.ERROR) {
            console.error(`[ERROR] 🔴 ${message}`);
            if (errorObj) {
                console.error(errorObj);
            }
        }
    }
};
