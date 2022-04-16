import { GenderE, RoleE } from './interfaces';

export const dateFormat = 'YYYY/MM/DD';

const ARTS = 0,
  BIOLOGY = 1,
  ECONOMY = 2,
  PHYSICAL = 3,
  GEOGRAPHY = 4,
  HISTORY = 5,
  LANGUAGES = 6,
  LAWS = 7,
  MATH = 8,
  MEDICINE = 9,
  OTHER = 10,
  CHEMISTRY = 11,
  TECHNOLOGY = 12;

export const genderList = [
  { id: GenderE.FEMININE, gender: 'femenino' },
  { id: GenderE.MALE, gender: 'masculino' },
];

export const roleList = [
  { id: RoleE.STUDENT, role: 'estudiante' },
  { id: RoleE.TEACHER, role: 'profesor' },
];

export const categoryClass = [
  { id: ARTS, category: 'Artes' },
  { id: BIOLOGY, category: 'Biología' },
  { id: ECONOMY, category: 'Economía' },
  { id: PHYSICAL, category: 'Física' },
  { id: GEOGRAPHY, category: 'Geografía' },
  { id: HISTORY, category: 'Historia' },
  { id: LANGUAGES, category: 'Idiomas' },
  { id: LAWS, category: 'Leyes' },
  { id: MATH, category: 'Matemáticas' },
  { id: MEDICINE, category: 'Medicina' },
  { id: OTHER, category: 'Otro' },
  { id: CHEMISTRY, category: 'Química' },
  { id: TECHNOLOGY, category: 'Química' },
];
