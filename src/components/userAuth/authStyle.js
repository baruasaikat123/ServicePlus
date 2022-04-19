import styled from 'styled-components'
import { ButtonN, Input, ButtonOut } from '../../style'

export const AuthContainer = styled.div`
    display: flex; 
    flex-direction: column; 
   
`

export const AuthInput = styled(Input)`
    width: 100%;
    margin: 0;
`

export const AuthDivider = styled.div`
    display: flex;
    justify-content: center;
    
    p{
        margin-top: 10px;
        margin-bottom: 10px;
    }
`

export const AuthButtonN = styled(ButtonN)`
    width: 100%;
    margin-top: 10px;
    background: var(--app-red);
    padding: 11px;
    font-size: 16px;
    color: #fff;
    
    &:hover{
        background: #F94892;
    }

`

export const AuthButtonOut= styled(ButtonOut)`
    width: 100%;
    margin-top: 10px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 11px;

    img{
        width: 20px;
        margin-right: 25px;
    }

    &:hover{
        background: var(--app-light);
    }
`

export const AuthText = styled.div`
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;

    p:hover{
        cursor: pointer;
        text-decoration: underline;
    }
`

export const AuthTextError = styled.p`
    font-size: 13px;
    margin-left: 5px;
    color: red
`