export type College = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  courses: string[];
  placements: {
    avgPackage: number;
    topRecruiter: string;
  };
  overview: string;
  image: string;
};

export type Question = {
  id: string;
  collegeId: string;
  question: string;
  author: string;
  answers: Answer[];
  createdAt: string;
};

export type Answer = {
  id: string;
  text: string;
  author: string;
  createdAt: string;
};