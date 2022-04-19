import styled from 'styled-components'
import { Input } from '../../style'
import { ButtonN  } from '../../style'
import { BsArrowRight } from 'react-icons/bs'

export const DropdownContainer = styled.div`
   width: ${({ w }) => w};
   
   @media screen and (max-width: 1000px){
        padding: 55px 0px;
    }
`

export const DropdownBtn = styled.div`
    padding: 12px 20px;
    user-select: none;
    border: 1px solid #ccc;
    color: #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`

export const DropdownContent = styled.div`
    top: 45px;
    left: 0;
    background: var(--app-black);
    box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.1);
    font-weight: 500;
    width: 100%;
    border-radius: 5px;
    white-space: nowrap;
    overflow-y: auto;
    overflow-x: hidden;
    height: ${({ h }) => h};
`

export const DropdownItem = styled.div`
    display: block;
    cursor: pointer;
    color: white;
    width: 100%;
    padding: 15px;

    &:hover{
        border-radius: 5px;
        background: var(--app-black-light);
    }
`

export const Heading = styled.p`
    font-weight: bold;
    color: var(--app-blue);
`

export const FormInput = styled(Input)`
    width: 30vw;

    @media screen and (max-width: 1000px){
        width: 400px;
    }
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const FormContent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0px;

    @media screen and (max-width: 1000px){
        flex-direction: column;
    }
`

export const FormButtonN = styled(ButtonN)`
    background: var(--app-red);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;

    &:hover{
        background: var(--app-hover-red);
    }
`

export const RightArrowIcon = styled(BsArrowRight)`
    margin-left: 5px;
`

export const ErrorText = styled.p`
    color: var(--app-red);
`
