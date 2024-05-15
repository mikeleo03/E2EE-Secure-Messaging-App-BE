// Temporary profiles for development
// TODO: Remove after authentication is reimplemented

export interface DUser {
  username: string; // Unique
  name: string; // Full name
  faculty: string; // Faculty
  campus: string; // Campus Location
  sex: string; // Male or Female (case-sensitive)
}

export interface DUserAccount extends DUser {
  role: string; // Committee, Mentor, Participant (case-sensitive)
}

export interface DUserProfile extends DUser {
  provider: string; // Mungkin maksudnya Google atau gmn buat acc, me no know
  confirmed: boolean;
  blocked: boolean;
  email: string; // Email
}

// Combined user data
export interface DUserFullData extends DUserProfile {
  password: string;
  role: string;
}

export interface DLoginResponse {
  jwt: string;
  user: DUser;
}

export interface DGetSessionResponse {
  canConnect: boolean;
}

// List of fake DUserFullData for development
export const DUsers: DUserFullData[] = [
  {
    username: 'com1',
    password: 'com1',
    name: 'Commitee 1',
    faculty: 'STEI',
    campus: 'Ganesha',
    sex: 'Male',
    provider: 'Google',
    confirmed: true,
    blocked: false,
    email: 'commitee1@example.com',
    role: 'Committee'
  },
  {
    username: 'com2',
    password: 'com2',
    name: 'Commitee 2',
    faculty: 'STEI',
    campus: 'Jatinangor',
    sex: 'Female',
    provider: 'Google',
    confirmed: true,
    blocked: false,
    email: 'commitee2@example.com',
    role: 'Committee'
  },
  {
    username: 'ment1',
    password: 'ment1',
    name: 'Mentor 1',
    faculty: 'FTSL',
    campus: 'Ganesha',
    sex: 'Female',
    provider: 'Google',
    confirmed: true,
    blocked: false,
    email: 'mentor1@example.com',
    role: 'Mentor'
  },
  {
    username: 'ment2',
    password: 'ment2',
    name: 'Mentor 2',
    faculty: 'SBM',
    campus: 'Cirebon',
    sex: 'Male',
    provider: 'Google',
    confirmed: true,
    blocked: false,
    email: 'mentor2@example.com',
    role: 'Mentor'
  },
  {
    username: 'part1',
    password: 'part1',
    name: 'Participant 1',
    faculty: 'FTI',
    campus: 'Ganesha',
    sex: 'Female',
    provider: 'Google',
    confirmed: true,
    blocked: false,
    email: 'participant1@example.com',
    role: 'Participant'
  },
  {
    username: 'part2',
    password: 'part2',
    name: 'Participant 2',
    faculty: 'SITH',
    campus: 'Jatinangor',
    sex: 'Male',
    provider: 'Google',
    confirmed: true,
    blocked: false,
    email: 'participant2@example.com',
    role: 'Participant'
  },
  // Unconfirmed user
  {
    username: 'part3',
    password: 'part3',
    name: 'Unconfirmed User',
    faculty: 'FMIPA',
    campus: 'Ganesha',
    sex: 'Female',
    provider: 'Google',
    confirmed: false,
    blocked: false,
    email: 'participant3@example.com',
    role: 'Participant'
  },
  // Blocked user
  {
    username: 'part4',
    password: 'part4',
    name: 'Blocked User',
    faculty: 'FTTM',
    campus: 'Ganesha',
    sex: 'Male',
    provider: 'Google',
    confirmed: true,
    blocked: true,
    email: 'participant4@example.com',
    role: 'Participant'
  },
];