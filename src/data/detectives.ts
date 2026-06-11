import mayaImg from '../assets/Maya.png';
import dominicImg from '../assets/Dominic.png';
import lenaImg from '../assets/Lena.png';
import tariqImg from '../assets/Elio.png';
import lucasImg from '../assets/Lucas.png';

export interface Detective {
  id: string;
  name: string;
  age: number;
  quote: string;
  avatar: string | null;
  accentColor: string;
}

export const DETECTIVES: Detective[] = [
  {
    id: 'maya',
    name: 'Maya',
    age: 17,
    quote: 'Goes with her gut and it\'s usually right.',
    avatar: mayaImg,
    accentColor: '#D4875A',
  },
  {
    id: 'dominic',
    name: 'Dominic',
    age: 19,
    quote: 'Youngest in the precinct. Has something to prove.',
    avatar: dominicImg,
    accentColor: '#6A9E7F',
  },
  {
    id: 'lena',
    name: 'Lena',
    age: 45,
    quote: 'Cross-references everything before she moves. Grew up debugging dial-up.',
    avatar: lenaImg,
    accentColor: '#7EB3C8',
  },
  {
    id: 'tariq',
    name: 'Tariq',
    age: 34,
    quote: 'Calm under pressure. Has talked his way out of every firewall.',
    avatar: tariqImg,
    accentColor: '#4A7FC0',
  },
  {
    id: 'yuki',
    name: 'Yuki',
    age: 52,
    quote: 'Thirty years in cybersecurity. Retired. Or so she thought.',
    avatar: null,
    accentColor: '#C87DB8',
  },
  {
    id: 'sofia',
    name: 'Sofía',
    age: 22,
    quote: 'Studied computer science in HHN. Now she\'s here and she\'s faster than all of you.',
    avatar: null,
    accentColor: '#C4A84A',
  },
  {
    id: 'lucas',
    name: 'Lucas',
    age: 29,
    quote: 'Quietly observes everything. By the time she speaks, she\'s already solved it.',
    avatar: lucasImg,
    accentColor: '#8B9DC8',
  },
];

export const GUEST_DETECTIVE: Detective = {
  id: 'guest',
  name: 'Guest Detective',
  age: 0,
  quote: '',
  avatar: null,
  accentColor: '#F5A623',
};
