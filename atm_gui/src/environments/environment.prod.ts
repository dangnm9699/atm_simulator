export const environment = {
  production: true,
  ATM_API_GATEWAY: window["env"]["apiUrl"] || "http://117.5.229.237:8024",
  ATM_CARD_READER: window["env"]["reader"] || "/api/v1",
  ATM_CARD_DISPENSER: window["env"]["reader"] || "/api/v1",
  ATM_BANK: window["env"]["bank"] || "/api/v1",
};
