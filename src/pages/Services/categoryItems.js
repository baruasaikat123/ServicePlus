import EducatorPic from '../../images/education.png'
import CleaningPic from '../../images/mop.png'
import PlumberPic from '../../images/plumber.png'
import ElectricianPic from '../../images/electrician.png'
import MakeupArtistPic from '../../images/make-up-artist.png'
import CookingPic from '../../images/chef.png'
import PaintingPic from '../../images/paint-roller.png'
import CarpenterPic from '../../images/carpenter.png'
import RepairingPic from '../../images/air-conditioning.png'

export const categoryItems = [
    {
        name: 'Education',
        pic: EducatorPic,
        id: 'ed',
    },
    {
        name: 'Cleaning',
        pic: CleaningPic,
        id: 'cl',
    },
    {
        name: 'Plumber',
        pic: PlumberPic,
        id: 'pl',
    },
    {
        name: 'Electrician',
        pic: ElectricianPic,
        id: 'el',
    },
    {
        name: 'Makeup Artist',
        pic: MakeupArtistPic,
        id: 'mk'
    },
    {
        name: 'Personal Chef',
        pic: CookingPic,
        id: 'ck'
    },
    {
        name: 'Home Painting',
        pic: PaintingPic,
        id: 'hp'
    },
    {
        name: 'Carpenter',
        pic: CarpenterPic,
        id: 'cp'
    },
    {
        name: 'AC Repair',
        pic: RepairingPic,
        id: 'ac'
    }
]
//     {
//         name: 'Daily Wage',
//         pic: '',
//         id: 'dw'
//     },
//     {
//         name: 'Occasional Services',
//         pic: '',
//         id: 'os'
//     }
// ]

export const categoryMap = {
    'Educator': 'ed',
    'Electrician': 'el',
    'Plumber': 'pl',
    'Cleaning': 'cl',
    'Makeup Artist': 'mk',
    'Personal Chef': 'ck',
    'Home Painting': 'hp',
    'Carpenter': 'cp',
    'AC Repair': 'ac'
}