export const MOBILE_STATS = {
  ordersToday: "1.5K",
  revenueToday: "₵2,840",
};

export const MOBILE_ORDERS = [
  {
    id: "m-1",
    customer: "Adjoa Amponsah",
    size: "Small",
    address: "Ashaade Quaye St",
    price: 120,
    time: "2 min ago",
    status: "incoming",
  },
  {
    id: "m-2",
    customer: "Ama Owusu",
    size: "Small",
    address: "Ashaade Quaye St",
    price: 120,
    time: "2 min ago",
    status: "incoming",
  },
  {
    id: "m-3",
    customer: "Ama Owusu",
    size: "Small",
    address: "Ashaade Quaye St",
    price: 120,
    time: "2 min ago",
    status: "incoming",
  },
  {
    id: "m-4",
    customer: "Kwabena Asare",
    size: "Medium",
    address: "Ring Rd Central",
    price: 180,
    time: "1 hr ago",
    status: "filled",
  },
  {
    id: "m-5",
    customer: "Efua Mensah",
    size: "Large",
    address: "Oxford St · Osu",
    price: 250,
    time: "Yesterday",
    status: "filled",
  },
  {
    id: "m-6",
    customer: "Yaw Darko",
    size: "Small",
    address: "Bantama High St",
    price: 120,
    time: "Yesterday",
    status: "cancelled",
  },
];

export const INCOMING_ORDERS = MOBILE_ORDERS.filter((o) => o.status === "incoming");

export const NEW_ORDER_REQUEST = {
  customer: "Essandoh Prince Takyi",
  phone: "055 414 4611",
  tip: 15,
  cylinders: 1,
  rider: "Kwame Osei Asiedu",
  address: "Harper Rd · Adum",
  size: "Small",
  price: 120,
};
