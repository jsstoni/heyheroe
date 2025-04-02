export interface Service {
  id: number;
  name: string;
  description: string;
  slug: string;
  icon: string;
  active: boolean;
}

export interface SubService {
  id: number;
  idService: number;
  name: string;
  description: string;
  active: boolean;
}

export type Citys = {
  id: number;
  name: string;
  active: boolean;
  home: boolean;
};
