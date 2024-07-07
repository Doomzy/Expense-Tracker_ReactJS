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

export const fake_transactions = [
  {
    id: 1,
    date: "05-07-2024",
    type: "income",
    title: "My Monthly Salary",
    category: "Salary",
    amount: 1500,
  },
  {
    id: 2,
    date: "04-07-2024",
    type: "expense",
    title: "Got PizzaHut for dinner",
    category: "Food",
    amount: 50,
  },
  {
    id: 3,
    date: "30-06-2024",
    type: "expense",
    title: "Paid my domain Yearly subscription",
    category: "Subscription",
    amount: 200,
  },
  {
    id: 4,
    date: "01-07-2024",
    type: "expense",
    title: "Went to get my groceries",
    category: "Shopping",
    amount: 432.5,
  },
  {
    id: 5,
    date: "14-06-2024",
    type: "income",
    title: "Made a website for a freelance customer",
    category: "Freelance",
    amount: 1500,
  },
  {
    id: 6,
    date: "14-06-2024",
    type: "income",
    title: "Made a website for a freelance customer",
    category: "Freelance",
    amount: 1500,
  },
  {
    id: 7,
    date: "30-06-2024",
    type: "expense",
    title: "Paid my domain Yearly subscription",
    category: "Subscription",
    amount: 200,
  },
  {
    id: 8,
    date: "01-07-2024",
    type: "expense",
    title: "Went to get my groceries",
    category: "Shopping",
    amount: 432.5,
  },
  {
    id: 9,
    date: "14-06-2024",
    type: "income",
    title: "Made a website for a freelance customer",
    category: "Freelance",
    amount: 1500,
  },
  {
    id: 10,
    date: "01-07-2024",
    type: "expense",
    title: "Went to get my groceries",
    category: "Shopping",
    amount: 432.5,
  },
];
