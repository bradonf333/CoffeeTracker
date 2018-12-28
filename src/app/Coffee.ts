export interface Coffee {
    id?: string;
    name: string;
    roaster: string;
    roastDate: string;
    regions: string[];
    rating: number;
    flavors: string[];
    // TODO: This will be for future use. Once I start tracking daily espresso shots, I will use this.
    // date: string;
    notes?: string;
}
