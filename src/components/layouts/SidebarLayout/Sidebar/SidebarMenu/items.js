import ReceiptTwoToneIcon from "@mui/icons-material/ReceiptTwoTone";
import GroupIcon from '@mui/icons-material/Group';

const menuItems = [
  {
    heading: "Client",
    allow: ['admin', 'customer'],
    items: [
      {
        name: "Invoices",
        link: "/dashboard/invoices",
        icon: ReceiptTwoToneIcon,
        items: [
          {
            name: "Overview",
            link: "/dashboard/invoices",
          },
        ],
      },
    ],
  },
  {
    heading: "Admin",
    allow: ['admin'],
    items: [
      {
        name: "Users",
        link: "/dashboard/users",
        icon: GroupIcon,
        items: [
          {
            name: "View All",
            link: "/dashboard/users",
          },
        ],
      },
    ],
  },
];

export default menuItems;
