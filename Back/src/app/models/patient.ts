export interface Patient {
  id?: number;
  nom: string;
  prenom: string;
  dateNaissance: string; // ISO date string (e.g., 'YYYY-MM-DD')
  cin: string;
  sexe: string;
  adresse: string;
  typedesoin: string;
  inp: string;
}
