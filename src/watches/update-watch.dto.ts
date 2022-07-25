export class UpdateWatchDto {
    title: string;
    description: string;
    price: number;
    shortDescription?: string;
    images?: string[];
    warranty?: number;
    dimension?: number[];
    video?: string;
    docs?: string;
    movement?: string;
    specs?: string[];
}