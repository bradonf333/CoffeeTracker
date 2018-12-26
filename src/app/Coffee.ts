export interface Coffee {
    id?: string;
    description: string;
    date: string;
}

export interface Coffee2 {
    id?: string;
    name: string;
    roaster: string;
    roastDate: string;
    regions: string[];
    rating: number;
    description: string;
    // TODO: This will be for future use. Once I start tracking daily espresso shots, I will use this.
    // date: string;
    notes?: string;
}
