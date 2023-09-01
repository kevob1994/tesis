import { GenderE, RoleE } from './interfaces';

export const dateFormat = 'DD/MM/YYYY';
export const dateFormatTime = 'DD/MM/YYYY hh:mm a';

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
  { id: TECHNOLOGY, category: 'Tecnología' },
];

export const TypeFiles = {
  TYPE_PDF: 'pdf',
  TYPE_WORD: 'docx',
  TYPE_EXCEL: 'xlsx',
  TYPE_IMG_PNG: 'png',
  TYPE_IMG_JPEG: 'jpeg',
  TYPE_IMG_JPG: 'jpg',
};

export const colors = [
	'#ff7875',
	'#f5222d',
	'#a8071a',
	'#ff9c6e',
	'#fa541c',
	'#ad2102',
	'#ffc069',
	'#fa8c16',
	'#ad4e00',
	'#ffd666',
	'#faad14',
	'#ad6800',
	'#fff566',
	'#fadb14',
	'#ad8b00',
	'#d3f261',
	'#a0d911',
	'#5b8c00',
	'#95de64',
	'#52c41a',
	'#237804',
	'#5cdbd3',
	'#13c2c2',
	'#006d75',
	'#69c0ff',
	'#1890ff',
	'#0050b3',
	'#85a5ff',
	'#2f54eb',
	'#10239e',
	'#b37feb',
	'#722ed1',
	'#391085',
	'#ff85c0',
	'#eb2f96',
	'#9e1068',
	'#ffffff',
	'#fafafa',
	'#f5f5f5',
	'#f0f0f0',
	'#d9d9d9',
	'#bfbfbf',
	'#8c8c8c',
	'#595959',
	'#434343',
	'#262626',
	'#1f1f1f',
	'#141414',
	'#000000'
]

export const configEditor = {
	options: ['inline', 'blockType', 'fontSize', 'list', 'history', 'colorPicker'],
	inline: {
		inDropdown: true,
		options: ['bold', 'italic', 'underline'],
	},
	list: { inDropdown: true },
	textAlign: { inDropdown: true },
	link: { inDropdown: true },
	history: { inDropdown: true },
	colorPicker: {
		colors: colors,
	},
}