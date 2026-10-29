export const PRICES = {
  Small: 120,
  Medium: 180,
  Large: 250,
};

export const STATION_CUT = 0.68;
export const RIDER_CUT = 0.2;
export const GASAPP_CUT = 0.12;

export const RIDERS = ["Kwame Osei", "Abena Mensah", "Kofi Boateng", "Yaw Darko", "Adjoa Frimpong"];

const STREETS = [
  "Harper Rd · Adum",
  "Ring Rd Central",
  "Ashaade Quaye St",
  "Oxford St · Osu",
  "Spintex Rd",
  "Bantama High St",
  "Tanoso Link Rd",
  "Labone Crescent",
  "Kwabre Ave · Suame",
  "Cantonments Rd",
];

const CUSTOMERS = [
  { name: "Akosua Darko", phone: "024 712 5588" },
  { name: "Emmanuel Owusu", phone: "055 341 9021" },
  { name: "Gifty Appiah", phone: "020 983 1147" },
  { name: "Samuel Asante", phone: "027 455 6302" },
  { name: "Nana Yaa Boateng", phone: "059 112 7784" },
  { name: "Isaac Mensah", phone: "024 889 0021" },
  { name: "Comfort Addo", phone: "050 221 7793" },
  { name: "Daniel Tetteh", phone: "026 774 4410" },
  { name: "Linda Opoku", phone: "054 903 2287" },
  { name: "Joseph Amankwah", phone: "020 667 1152" },
];

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeOrder(id, status, overrides = {}) {
  const size = overrides.size || rand(["Small", "Medium", "Large"]);
  const cylinders = overrides.cylinders || (Math.random() > 0.7 ? 2 : 1);
  const price = PRICES[size] * cylinders;
  const tip = overrides.tip ?? (Math.random() > 0.5 ? rand([5, 10, 15, 20]) : 0);
  const customer = overrides.customer || rand(CUSTOMERS);
  return {
    id,
    customer: customer.name,
    phone: customer.phone,
    rider: overrides.rider || rand(RIDERS),
    address: overrides.address || rand(STREETS),
    size,
    cylinders,
    price,
    tip,
    time: overrides.time || "—",
    status,
  };
}

export const TODAY_ORDERS = [
  makeOrder("ORD-2291", "incoming", {
    customer: { name: "Akosua Darko", phone: "024 712 5588" },
    rider: "Kwame Osei",
    address: "Harper Rd · Adum",
    size: "Medium",
    cylinders: 2,
    tip: 10,
    time: "2 min ago",
  }),
  makeOrder("ORD-2290", "filled", {
    customer: { name: "Emmanuel Owusu", phone: "055 341 9021" },
    rider: "Abena Mensah",
    address: "Ring Rd Central",
    size: "Small",
    cylinders: 1,
    tip: 5,
    time: "28 min ago",
  }),
  makeOrder("ORD-2289", "filled", {
    customer: { name: "Gifty Appiah", phone: "020 983 1147" },
    rider: "Kofi Boateng",
    address: "Ashaade Quaye St",
    size: "Large",
    cylinders: 1,
    tip: 0,
    time: "41 min ago",
  }),
  makeOrder("ORD-2288", "filled", {
    customer: { name: "Samuel Asante", phone: "027 455 6302" },
    rider: "Yaw Darko",
    address: "Oxford St · Osu",
    size: "Medium",
    cylinders: 1,
    tip: 15,
    time: "1 hr ago",
  }),
];

export const ALL_ORDERS = [
  ...TODAY_ORDERS,
  makeOrder("ORD-2287", "cancelled", { time: "Yesterday, 6:40pm" }),
  makeOrder("ORD-2286", "filled", { time: "Yesterday, 5:12pm" }),
  makeOrder("ORD-2285", "filled", { time: "Yesterday, 3:02pm" }),
  makeOrder("ORD-2284", "filled", { time: "Yesterday, 1:48pm" }),
  makeOrder("ORD-2283", "cancelled", { time: "Yesterday, 11:20am" }),
  makeOrder("ORD-2282", "filled", { time: "Yesterday, 9:05am" }),
  makeOrder("ORD-2281", "filled", { time: "2 days ago" }),
  makeOrder("ORD-2280", "filled", { time: "2 days ago" }),
  makeOrder("ORD-2279", "incoming", { time: "Just now" }),
];

export const REVENUE_7DAY = [
  { day: "Mon", revenue: 2140 },
  { day: "Tue", revenue: 1890 },
  { day: "Wed", revenue: 2460 },
  { day: "Thu", revenue: 2010 },
  { day: "Fri", revenue: 2780 },
  { day: "Sat", revenue: 3320 },
  { day: "Sun", revenue: 2950 },
];

export const TOP_PRODUCTS = [
  { size: "Small", volume: 142 },
  { size: "Medium", volume: 210 },
  { size: "Large", volume: 96 },
];

export const PEAK_HOURS = [
  { hour: "6am", value: 2 },
  { hour: "8am", value: 5 },
  { hour: "10am", value: 8 },
  { hour: "12pm", value: 14 },
  { hour: "2pm", value: 11 },
  { hour: "4pm", value: 16 },
  { hour: "6pm", value: 20 },
  { hour: "8pm", value: 13 },
  { hour: "10pm", value: 6 },
];

export const ACTIVE_DELIVERIES = [
  { rider: "Kwame Osei", customer: "Akosua Darko", eta: "6 min", address: "Harper Rd · Adum" },
  { rider: "Abena Mensah", customer: "Isaac Mensah", eta: "11 min", address: "Spintex Rd" },
  { rider: "Kofi Boateng", customer: "Comfort Addo", eta: "4 min", address: "Bantama High St" },
  { rider: "Yaw Darko", customer: "Daniel Tetteh", eta: "17 min", address: "Tanoso Link Rd" },
];

export function totalRevenue(orders) {
  return orders
    .filter((o) => o.status === "filled")
    .reduce((sum, o) => sum + o.price + o.tip, 0);
}
