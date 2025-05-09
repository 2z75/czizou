export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    background: string;
    modelPath: string;
    scale: number;
    centered: boolean;
    technos: string[];
    fontClass: string;
    textColor: string;
    link: string;
}