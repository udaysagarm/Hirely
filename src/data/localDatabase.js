// This file simulates a local in-memory database for Hirely

// ✅ USERS DATABASE
export const users = [
  {
    name: "Uday Sagar Reddy",
    email: "uday@hirely.com",
    password: "uday@123",
    phone: "1234567890",
    rating: 4.8,
    totalJobsWorked: 12,
    totalHoursWorked: 140,
    location: "Houghton, MI",
    preferredDistance: 25, // miles
    avatar: "https://i.pravatar.cc/150?u=uday@hirely.com"
  },
  {
    name: "Alice Johnson",
    email: "alice@hirely.com",
    password: "alice@123",
    phone: "9876543210",
    rating: 4.3,
    totalJobsWorked: 8,
    totalHoursWorked: 95,
    location: "Chicago, IL",
    preferredDistance: 10,
    avatar: "https://i.pravatar.cc/150?u=alice@hirely.com"
  },
  {
    name: "Bob Smith",
    email: "bob@hirely.com",
    password: "bob@123",
    phone: "5551234567",
    rating: 4.0,
    totalJobsWorked: 5,
    totalHoursWorked: 60,
    location: "Detroit, MI",
    preferredDistance: 15,
    avatar: "https://i.pravatar.cc/150?u=bob@hirely.com"
  }
];

// ✅ JOBS DATABASE
export const jobs = [
  {
    id: 1,
    title: "Dog Walker Needed",
    description: "Looking for someone to walk my dog in the evenings for a week.",
    pay: 15,
    category: "Pet Care",
    startTime: "2025-06-01T17:00",
    endTime: "2025-06-01T18:00",
    totalHours: 1,
    location: "Houghton, MI",
    postedBy: "Uday Sagar Reddy",
    email: "uday@hirely.com",
    phone: "1234567890",
    avatar: "https://i.pravatar.cc/100?u=uday@hirely.com",
    images: [
      "https://place-puppy.com/200x200",
      "https://place-puppy.com/201x201"
    ]
  },
  {
    id: 2,
    title: "Part-time Math Tutor",
    description: "Help high schooler with algebra and geometry homework.",
    pay: 25,
    category: "Tutoring",
    startTime: "2025-06-02T15:00",
    endTime: "2025-06-02T17:00",
    totalHours: 2,
    location: "Chicago, IL",
    postedBy: "Alice Johnson",
    email: "alice@hirely.com",
    phone: "9876543210",
    avatar: "https://i.pravatar.cc/100?u=alice@hirely.com",
    images: [
      "https://via.placeholder.com/200?text=Tutoring"
    ]
  },
  {
    id: 3,
    title: "Senior Care Companion",
    description: "Spend the day with my grandmother, assist with weekly errands.",
    pay: 20,
    category: "Caregiving",
    startTime: "2025-06-03T09:00",
    endTime: "2025-06-03T14:00",
    totalHours: 5,
    location: "Houghton, MI",
    postedBy: "Uday Sagar Reddy",
    email: "uday@hirely.com",
    phone: "1234567890",
    avatar: "https://i.pravatar.cc/100?u=uday@hirely.com",
    images: [
      "https://via.placeholder.com/200?text=Caregiving"
    ]
  },
  {
    id: 4,
    title: "Homemade Meal Prep",
    description: "Cook healthy meals for the week, package and deliver.",
    pay: 80,
    category: "Food Services",
    startTime: "2025-06-04T10:00",
    endTime: "2025-06-04T14:00",
    totalHours: 4,
    location: "Detroit, MI",
    postedBy: "Bob Smith",
    email: "bob@hirely.com",
    phone: "5551234567",
    avatar: "https://i.pravatar.cc/100?u=bob@hirely.com",
    images: [
      "https://via.placeholder.com/200?text=Cooking"
    ]
  },
  {
    id: 5,
    title: "Lawn Mowing",
    description: "Mow and edge the front yard, trim hedges.",
    pay: 30,
    category: "Gardening",
    startTime: "2025-06-05T08:00",
    endTime: "2025-06-05T12:00",
    totalHours: 4,
    location: "Chicago, IL",
    postedBy: "Alice Johnson",
    email: "alice@hirely.com",
    phone: "9876543210",
    avatar: "https://i.pravatar.cc/100?u=alice@hirely.com",
    images: [
      "https://via.placeholder.com/200?text=Gardening"
    ]
  },
  {
    id: 6,
    title: "Data Entry for Small Business",
    description: "Input customer orders into the system, verify details.",
    pay: 18,
    category: "IT Support",
    startTime: "2025-06-06T13:00",
    endTime: "2025-06-06T17:00",
    totalHours: 4,
    location: "Detroit, MI",
    postedBy: "Bob Smith",
    email: "bob@hirely.com",
    phone: "5551234567",
    avatar: "https://i.pravatar.cc/100?u=bob@hirely.com",
    images: [
      "https://via.placeholder.com/200?text=Data+Entry"
    ]
  },
  {
    id: 7, // Keep this one as ID 7
    title: "House Cleaning Service",
    description: "Clean entire 3-bedroom apartment, including vacuum and dust.",
    pay: 50,
    category: "Cleaning",
    startTime: "2025-06-07T09:00",
    endTime: "2025-06-07T12:00",
    totalHours: 3,
    location: "Detroit, MI",
    postedBy: "Alice Johnson",
    email: "alice@hirely.com",
    phone: "9876543210",
    avatar: "https://i.pravatar.cc/100?u=alice@hirely.com",
    images: [
      "https://via.placeholder.com/200?text=Cleaning"
    ]
  },
  {
    id: 8,
    title: "Photography Session",
    description: "Portrait photography at local park for family photos.",
    pay: 100,
    category: "Photography",
    startTime: "2025-06-08T14:00",
    endTime: "2025-06-08T16:00",
    totalHours: 2,
    location: "Houghton, MI",
    postedBy: "Bob Smith",
    email: "bob@hirely.com",
    phone: "5551234567",
    avatar: "https://i.pravatar.cc/100?u=bob@hirely.com",
    images: [
      "https://via.placeholder.com/200?text=Photography"
    ]
  },
  {
    id: 9,
    title: "Logo Design",
    description: "Create a logo for a startup based on provided brief.",
    pay: 150,
    category: "Graphic Design",
    startTime: "2025-06-09T11:00",
    endTime: "2025-06-09T15:00",
    totalHours: 4,
    location: "Chicago, IL",
    postedBy: "Uday Sagar Reddy",
    email: "uday@hirely.com",
    phone: "1234567890",
    avatar: "https://i.pravatar.cc/100?u=uday@hirely.com",
    images: [
      "https://via.placeholder.com/200?text=Design"
    ]
  },
  {
      id: 10, // Changed from 7 to 10
      title: "Grocery Delivery",
      description: "Deliver groceries to elderly woman.",
      pay: 20,
      category: "Delivery",
      startTime: "2025-05-10T14:00",
      endTime: "2025-05-10T15:30",
      totalHours: 1.5,
      location: "Houghton, MI",
      postedBy: "Alice Johnson",
      email: "uday@hirely.com", // So Uday sees it
      phone: "1234567890",
      avatar: "https://i.pravatar.cc/100?u=uday@hirely.com",
      images: ["https://via.placeholder.com/200?text=Grocery"]
    }
];

// ✅ FUNCTIONS TO ADD TO LOCAL DATABASE
export function addJob(job) {
  job.id = jobs.length + 1;
  jobs.push(job);
}

export function getUserByEmail(email) {
  return users.find((u) => u.email === email);
}

export function addUser(user) {
  users.push(user);
}

export function getJobsByUser(email) {
  return jobs.filter((job) => job.email === email);
}