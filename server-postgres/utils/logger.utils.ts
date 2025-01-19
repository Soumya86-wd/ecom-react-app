import pino from "pino";
import dayjs from "dayjs";

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `TIMESTAMP: ${dayjs().format("DD/MM/YYYY")}`,
});
