import { Project } from '../interfaces/project';


export const projectData: Project[] = [
    {
        id: 1,
        title: 'CZIZOU',
        description: 'Site personnel',
        image: 'assets/tn-img/tnCzizou.png',
        background: 'assets/bg-img/cZizou.png',
        technos: ['Angular', 'GSAP', 'Tailwind', 'ThreeJS']
    },
    {
        id: 2,
        title: 'TrIpGather',
        description: 'Site communautaire de compagnons de voyage',
        image: 'assets/tn-img/tnTg.png',
        background: 'assets/bg-img/tripGather.png',
        technos: ['JAVA(Spring)', 'Angular', 'JavaScript', 'MySQL']
    }
    ,
    {
        id: 3,
        title: 'Arekipa',
        description: 'Refonte du site Arekipa',
        image: 'assets/tn-img/tnArekipa.png',
        background: 'assets/bg-img/arekipa.png',
        technos: ['Wordpress', 'Javascript', 'PHP', 'MySQL']
    },
    {
        id: 4,
        title: '{Origins/Digital}',
        description: 'Plateforme video pour apprendre le dev',
        image: 'assets/tn-img/tnOd.png',
        background: 'assets/bg-img/originsDigital.png',
        technos: ['PHP(Symfony)', 'JavaScript', 'MySQL']
    }
];
