export class Acquisition {
  id: string;
  budget: number;
  unit: string;
  type: string;
  quantity: number;
  unitValue: number;
  totalValue: number;
  acquisitionDate: string; // antes era string
  supplier: string;
  documentation: string;
  active: boolean;
  createdAt: Date; // antes era string

  constructor(init?: Partial<Acquisition>) {
    Object.assign(this, init);

  

    if (init?.createdAt) {
      this.createdAt = new Date(init.createdAt);
    }
  }
}
