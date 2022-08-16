export const ROLES = [
  { label: "Administrator", value: "admin" },
  { label: "Subscriber", value: "subscriber" },
  { label: "Customer", value: "customer" },
];

export const LOADER_SIZE = {
  sm: 24,
  md: 32,
  lg: 64,
};

export const INVOICE_STATUS = {
  overdue: {
    text: "Overdue",
    color: "warning",
  },
  sent: {
    text: "Pending Payment",
    color: "primary",
  },
  draft: {
    text: "Draft",
    color: "info",
  },
  paid: {
    text: "Paid",
    color: "success",
  },
};

export const STATUS_OPTIONS = [
  {
    id: "all",
    name: "Show all",
  },
  {
    id: "sent",
    name: "Pending Payment",
  },
  {
    id: "paid",
    name: "Paid",
  },
  {
    id: "draft",
    name: "Draft",
  },
  {
    id: "overdue",
    name: "Overdue",
  },
];

export const USER_ROLES = {
  admin: {
    text: "Administrator",
    color: "error",
  },
  customer: {
    text: "Customer",
    color: "info",
  },
  subscriber: {
    text: "Viewer",
    color: "warning",
  },
};
