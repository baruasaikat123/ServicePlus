import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ButtonOut = styled.button`
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
    color: black;
    background: transparent;
    padding: 8px 25px;
    font-size: 1rem;
    cursor: pointer;
`

export const ButtonN = styled.button`
    padding: 10px 22px;
    ${'' /* background: #E60965; */}
    ${'' /* background: #42C2FF; */}
    font-weight: bold;
    font-size: 15px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`

export const Input = styled.input`
    ${'' /* margin-left: 5px; */}
    padding: 12px;
    border-radius: 5px;
    ${'' /* background: #414b57; */}
    border: 1px solid #ccc;
    font-size: 15px;
    height: 50px;
    ${'' /* width: 30vw; */}
    ${'' /* width: 100%; */}
    outline: none;
    margin-bottom: 15px;

    &::placeholder{
        color: #ccc;
    }
    &:focus{
        border: 1px solid var(--app-blue);
    }
`

export const Select = styled.select`
    border: 1px solid #ccc;
    padding: 10px;
    width: 100px;
    color: #ccc;
    font-size: 15px;
    &:focus {
        border: 1px solid var(--app-color)
    }
`

export const Routediv = styled.div`
    display: flex;
    justify-content: space-between;
    position: inherit;
    padding-top: 30px;
    padding-left: 15px;
    height: 85px;
    position: sticky;
    top: 81px;
    background: var(--app-light);

    @media screen and (max-width: 950px){
        flex-direction: column;
        height: 150px
    }
`

export const RouteHeading = styled.div`
    margin-left: 150px;
    color: var(--app-red);
    user-select: none;

    @media screen and (max-width: 950px){
        margin-left: 50px;
    }
`

export const RouteLinkContainer = styled.div`
    display: flex;
    margin-right: 150px;
    user-select: none;

    @media screen and (max-width: 950px){
        margin-left: 50px;
        margin-bottom: 15px;
    }

`

export const RouteLinks = styled(Link)`
    text-decoration: none;
    color: var(--app-blue);

    &:hover{
        text-decoration: underline;
    }
`


