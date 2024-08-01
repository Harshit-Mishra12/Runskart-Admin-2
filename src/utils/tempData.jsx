export const generateRandomTeams = (n, status) => {
  const owners = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomDate = () => {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date.toISOString().split("T")[0];
  };

  const teams = [];
  for (let i = 0; i < n; i++) {
    const team = {
      id: i + 1,
      rank: Math.floor(Math.random() * 100) + 1,
      teamName: `Team ${i + 1}`,
      owner: getRandomElement(owners),
      points: Math.floor(Math.random() * 1000),
      prize: `₹${(Math.random() * 10000).toFixed(0)}`,
      date: getRandomDate(),
      eventStatus: status,
      entryTransaction: `Completed`,
      prizeTransaction:
        status === "Completed"
          ? `Completed`
          : status === "Cancelled"
          ? `Refunded`
          : `Pending`,
    };
    teams.push(team);
  }
  return teams;
};

export const tempResults = [
  {
    id: 1,
    rank: 1,
    teamName: "Team A",
    owner: "Owner A",
    points: 100,
    prize: "₹10,000",
  },
  {
    id: 2,
    rank: 2,
    teamName: "Team B",
    owner: "Owner B",
    points: 90,
    prize: "₹5,000",
  },
  {
    id: 3,
    rank: 3,
    teamName: "Team C",
    owner: "Owner C",
    points: 80,
    prize: "₹3,000",
  },
];

export const tempMatches = [
  {
    id: 0,
    team1: "Mumbai Indians",
    team2: "Chennai Super Kings",
    date: "2023-03-29",
    time: "19:30",
    venue: "Wankhede Stadium, Mumbai",
    status: "Upcoming",
  },
  {
    id: 1,
    team1: "Kolkata Knight Riders",
    team2: "Delhi Capitals",
    date: "2023-03-30",
    time: "19:30",
    venue: "Eden Gardens, Kolkata",
    status: "Upcoming",
  },
  {
    id: 2,
    team1: "Rajasthan Royals",
    team2: "Royal Challengers Bangalore",
    date: "2023-03-31",
    time: "19:30",
    venue: "Sawai Mansingh Stadium, Jaipur",
    status: "Upcoming",
  },
  {
    id: 3,
    team1: "Sunrisers Hyderabad",
    team2: "Punjab Kings",
    date: "2023-04-01",
    time: "19:30",
    venue: "Rajiv Gandhi International Stadium, Hyderabad",
    status: "Upcoming",
  },
  {
    id: 4,
    team1: "Chennai Super Kings",
    team2: "Kolkata Knight Riders",
    date: "2023-04-02",
    time: "19:30",
    venue: "M. A. Chidambaram Stadium, Chennai",
    status: "Upcoming",
  },
  {
    id: 5,
    team1: "Delhi Capitals",
    team2: "Rajasthan Royals",
    date: "2023-04-03",
    time: "19:30",
    venue: "Arun Jaitley Stadium, Delhi",
    status: "Upcoming",
  },
  {
    id: 6,
    team1: "Royal Challengers Bangalore",
    team2: "Sunrisers Hyderabad",
    date: "2023-04-04",
    time: "19:30",
    venue: "M. Chinnaswamy Stadium, Bangalore",
    status: "Upcoming",
  },
  {
    id: 7,
    team1: "Punjab Kings",
    team2: "Mumbai Indians",
    date: "2023-04-05",
    time: "19:30",
    venue: "Punjab Cricket Association IS Bindra Stadium, Mohali",
    status: "Upcoming",
  },
];

export const userTeams = [
  {
    id: 1,
    rank: 1,
    teamName: "Team A",
    owner: "John Doe",
    points: 100,
    prize: "₹10,000",
    date: "2023-02-21",
    eventStatus: "Released",
    entryTransaction: "Completed",
    prizeTransaction: "Pending",
  },
  {
    id: 2,
    rank: 4,
    teamName: "Team B",
    owner: "John Doe",
    points: 90,
    prize: "₹1,000",
    date: "2023-03-29",
    eventStatus: "Live",
    entryTransaction: "Completed",
    prizeTransaction: "Pending",
  },
  {
    id: 3,
    rank: 28,
    teamName: "Team C",
    owner: "John Doe",
    points: 80,
    prize: "₹50",
    date: "2023-04-29",
    eventStatus: "Completed",
    entryTransaction: "Completed",
    prizeTransaction: "Completed",
  },
  {
    id: 4,
    rank: 2,
    teamName: "Team D",
    owner: "John Doe",
    points: 95,
    prize: "₹5,000",
    date: "2023-05-29",
    eventStatus: "Cancelled",
    entryTransaction: "Completed",
    prizeTransaction: "Refunded",
  },
];
