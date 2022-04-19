import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonOut } from '../../style'
export const Nav = styled.nav`
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    box-shadow: rgba(0,0,0,0.35) 0px 0px 5px;
    background: var(--app-light);
    position: sticky;
    ${'' /* z-index: ${({openModal}) => (openModal && -1)}; */}
    top: 0;
`
export const NavbarContainer = styled.div`
    width: 100%;
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 50px;
    padding-right: 50px;
    display: flex;
    justify-content: space-between;
    height: 80px;

    @media screen and (max-width: 960px){
        padding: 30px 30px;
    }
`

export const NavLogo = styled(Link)`
    color: var(--app-blue);
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
`

export const NavIcon = styled.img`
    width: 1.5rem;
    margin-left: 0.5rem;
`

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;

    @media screen and (max-width: 960px){
        flex-direction: column;
        height: 90vh;
        position: absolute;
        top: 80px;
        right: 0;
        ${'' /* right: ${({ click }) => (click ? 0 : '-100%')}; */}
        transition: all 0.2s ease;
        background: #fff;
        border: 1px solid #ccc;
    }
`

export const MobileIcon = styled.div`

    display: none;

    @media screen and (max-width: 960px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        color: #fff;
    }
`

export const NavItem = styled.li`
    height: 60px;
    padding: 10px;

    @media screen and (max-width: 960px){
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export const NavLinks = styled(Link)`
    color: #000;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;
    margin-top: 10px;
    font-size: 16px;

    &:hover{
        color: #ccc;
    }
`

export const NavBtnLink = styled(Link)`
    cursor: default;
    padding: 8px 16px;
    margin-top: 18px;
    text-decoration: none;
` 
export const NavButton = styled.div`
    cursor: pointer;
    font-size: 16px;
    color: black;
`
