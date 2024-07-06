import {
  Home_Icon,
  Dashboard_Icon,
  Reports_Icon,
  Profile_Icon,
} from "../assets";

export const navLinks = [
  { name: "Home", icon: Home_Icon },
  { name: "Dashboard", icon: Dashboard_Icon },
  { name: "Reports", icon: Reports_Icon },
];

export const mobNavLinks = [
  { name: "Home", icon: Home_Icon },
  { name: "Dashboard", icon: Dashboard_Icon },
  { name: "Reports", icon: Reports_Icon },
  { name: "Profile", icon: Profile_Icon },
];

export const transaction_Categories = [
  "Food",
  "Transportation",
  "Shopping",
  "Bills",
  "Entertainment",
  "Education",
  "Subscription",
  "Other",
];

///fake data

export const latest_transaction = [
  {
    id: 1,
    date: "05-07-2024",
    category: "Salary",
    amount: 1500,
  },
  {
    id: 2,
    date: "05-07-2024",
    category: "Freelance",
    amount: 300,
  },
  {
    id: 3,
    date: "06-07-2024",
    category: "Investment",
    amount: 458,
  },
  {
    id: 4,
    date: "07-07-2024",
    category: "Other",
    amount: 500,
  },
];
