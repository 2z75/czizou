import { Project } from '../interfaces/project';


export const projectData: Project[] = [
    {
        id: 1,
        title: 'CZIZOU',
        description: 'projects.CZIZOU.description',
        image: 'assets/tn-img/tnCz.png',
        background: 'assets/bg-img/cZizou.png',
        modelPath: 'assets/models/playstation.glb',
        scale: 0.007,
        centered: false,
        technos: ['Angular', 'Tailwind', 'ThreeJS'],
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
        modelPath: 'assets/models/bag.glb',
        scale: 3,
        centered: false,
        technos: ['Java', 'Angular', 'SQL', 'Docker'],
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
        background: 'assets/bg-img/arekipaByTheKub.png',
        modelPath: 'assets/models/camera.glb',
        scale: 1.3,
        centered: true,
        technos: ['Wordpress', 'JS', 'PHP', 'SQL'],
        fontClass: '',
        textColor: 'text-white',
        link: 'https://www.arekipabythekub.com/'
    },
    {
        id: 4,
        title: '{Origins/Digital}',
        description: 'projects.{Origins/Digital}.description',
        image: 'assets/tn-img/tnOd.png',
        background: 'assets/bg-img/originsDigital.png',
        modelPath: 'assets/models/notebook.glb',
        scale: 8,
        centered: true,
        technos: ['Symfony', 'JS', 'SQL'],
        fontClass: 'font-quantico',
        textColor: 'text-white',
        link: 'https://github.com/WildCodeSchool-2023-09/php-paris-p3-originsdigital.git'
    }
];
