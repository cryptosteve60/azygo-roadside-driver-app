
import { ServiceType } from "@/contexts/AppContext";

export const getServicePrice = (type: ServiceType): number => {
  switch (type) {
    case "battery": return 49;
    case "tire": return 69;
    case "fuel": return 45;
    case "lockout": return 75;
    case "tow": return 99;
    case "charging": return 59;
    default: return 69;
  }
};

export const getServiceTitle = (type: ServiceType): string => {
  switch (type) {
    case "battery": return "Battery Jump";
    case "tire": return "Tire Change";
    case "fuel": return "Fuel Delivery";
    case "lockout": return "Lockout Service";
    case "tow": return "Towing Service";
    case "charging": return "EV Charging";
    default: return "Roadside Service";
  }
};
