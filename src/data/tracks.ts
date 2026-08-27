export type Track = {
  id: number;
  title: string;
  feat?: string[];
};

export const TRACKS: Track[] = [
  { id: 1, title: 'Number One' },
  { id: 2, title: 'Dozdi Ni', feat: ['Catchy Beatz', 'Young Sudden'] },
  { id: 3, title: 'Dooset Daram' },
  { id: 4, title: 'Prada', feat: ['Hiphopologist'] },
  { id: 5, title: 'Buggy' },
  { id: 6, title: 'Day One', feat: ['Arown'] },
  { id: 7, title: 'Marde Sal' },
  { id: 8, title: 'Tool Keshid' },
  { id: 9, title: 'Rip' },
];

export const ALBUM = {
  title: 'Margo Zendegi',
  artist: 'Sepehr Khalse',
  credits: 'ATAFLAME | EMVDBRZ',
};
