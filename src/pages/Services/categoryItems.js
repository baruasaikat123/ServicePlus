import EducatorPic from '../../images/education.png'
import CleaningPic from '../../images/mop.png'
import PlumberPic from '../../images/plumber.png'
import ElectricianPic from '../../images/electrician.png'
import MakeupArtistPic from '../../images/make-up-artist.png'
import CookingPic from '../../images/cooking.png'

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
        name: 'Cooking',
        pic: CookingPic,
        id: 'ck'
    },
]

export const categoryMap = {
    'ed': 'Education',
    'ck': 'Cooking Staff',
    'el': 'Electrician',
    'pl': 'Plumber',
    'cl': 'Cleaning Staff',
    'mk': 'Makeup Artist'
}