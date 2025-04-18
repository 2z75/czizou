import { Project } from '../interfaces/project';


export const projectData: Project[] = [
    {
        id: 1,
        title: 'CZIZOU',
        description: 'projects.CZIZOU.description',
        image: 'assets/tn-img/tnCz.png',
        background: 'assets/bg-img/cZizou.png',
        technos: ['Angular', 'GSAP', 'Tailwind', 'ThreeJS'],
        fontClass: 'font-playstation',
        textColor: 'text-black',
        link: 'https://github.com/2z75/czizou.git'
    },
    {
        id: 2,
        title: 'TrIpGather',
        description: 'projects.TrIpGather.description',
        image: 'assets/tn-img/tnTg.png',
        background: 'assets/bg-img/tripGather.png',
        technos: ['Java', 'Angular', 'MySQL', 'Docker'],
        fontClass: 'font-montserrat',
        textColor: 'text-white',
        link: 'https://github.com/Onderito/tripgather-back.git'
    }
    ,
    {
        id: 3,
        title: 'Arekipa',
        description: 'projects.Arekipa.description',
        image: 'assets/tn-img/tnArekipa.png',
        background: 'assets/bg-img/arekipa.png',
        technos: ['Wordpress', 'Javascript', 'PHP', 'MySQL'],
        fontClass: 'font-playstation',
        textColor: 'text-white',
        link: 'https://www.arekipabythekub.com/'
    },
    {
        id: 4,
        title: '{Origins/Digital}',
        description: 'projects.{Origins/Digital}.description',
        image: 'assets/tn-img/tnOd.png',
        background: 'assets/bg-img/originsDigital.png',
        technos: ['Symfony', 'JavaScript', 'MySQL'],
        fontClass: 'font-montserrat',
        textColor: 'text-white',
        link: 'https://github.com/WildCodeSchool-2023-09/php-paris-p3-originsdigital.git'
    }
];
