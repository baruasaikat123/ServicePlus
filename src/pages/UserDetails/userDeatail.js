import styled from 'styled-components'
import { MdOutlineDone } from 'react-icons/md'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import { ButtonN } from '../../style'

export const FormTitle = styled.div`
    display: flex;
    justify-content: space-evenly;
    background: var(--app-light);
    position: sticky;
    top: 70px;
    box-shadow: rgba(0,0,0,0.35) 0px 0px 2px;
    @media screen and (max-width: 750px){
        flex-direction: column;
    }
`

export const FormTitleContainer = styled.div`
    display: flex;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 5px;
    align-items: center;
    color: var(--app-color)
`

export const FormStep = styled.div`
    border: 1px solid var(--app-color);
    padding: 4px 10px;
    border-radius: 50%;
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    background: var(--app-color);
    color: white;
`

export const FormTitleText = styled.p`
    padding: 0px 8px;
    margin-top: 18px;
`

export const DoneIcon = styled(MdOutlineDone)`
    fill: white;
`

export const FormButtonContainer = styled.div`
    display: flex;
    margin-top: 10px;
    justify-content: end;
`

export const RightArrowIcon = styled(BsArrowRight)`
    margin-left: 5px;
`
export const LeftArrowIcon = styled(BsArrowLeft)`
    fill: var(--app-color);
    margin-right: 5px;
`

export const FormButtonN = styled(ButtonN)`
    background: var(--app-red);
    display: flex;
    align-items: center;

    &:hover{
        background: var(--app-hover-red);
    }
`

export const BackButton = styled.p`

    color: var(--app-color);
    visibility: ${({ step }) => (step === 1 ? 'hidden' : 'visible')};
    cursor: pointer;
    font-size: 1.1rem;
    color: var(--app-blue);
    padding: 10px;
    user-select: none;

    &:hover{
        text-decoration: underline;
    }
`
