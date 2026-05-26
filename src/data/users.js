export const users = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    photo: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@email.com",
    photo: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@email.com",
    photo: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    photo: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@email.com",
    photo: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    photo: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: 7,
    name: "Robert Martinez",
    email: "robert.martinez@email.com",
    photo: "https://i.pravatar.cc/150?img=17",
  },
  {
    id: 8,
    name: "Jennifer Taylor",
    email: "jennifer.taylor@email.com",
    photo: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: 9,
    name: "Chris Lee",
    email: "chris.lee@email.com",
    photo: "https://i.pravatar.cc/150?img=19",
  },
  {
    id: 10,
    name: "Amanda White",
    email: "amanda.white@email.com",
    photo: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: 11,
    name: "Kevin Patel",
    email: "kevin.patel@email.com",
    photo: "https://i.pravatar.cc/150?img=21",
  },
  {
    id: 12,
    name: "Rachel Green",
    email: "rachel.green@email.com",
    photo: "https://i.pravatar.cc/150?img=22",
  },
  {
    id: 13,
    name: "Tom Harris",
    email: "tom.harris@email.com",
    photo: "https://i.pravatar.cc/150?img=23",
  },
  {
    id: 14,
    name: "Nina Martinez",
    email: "nina.martinez@email.com",
    photo: "https://i.pravatar.cc/150?img=24",
  },
  {
    id: 15,
    name: "Oliver Chen",
    email: "oliver.chen@email.com",
    photo: "https://i.pravatar.cc/150?img=25",
  },
];

export function getUsers() {
  return users;
}

export function getUserById(id) {
  return users.find((u) => u.id === Number(id));
}
