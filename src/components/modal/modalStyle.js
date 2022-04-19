import styled from 'styled-components'

export const Modal = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    display: flex;
    background-color: rgba(0,0,0,0.4);
    justify-content: center;
    z-index: 1000;
`

export const ModalContainer = styled.div`
    width: 450px;
    height: 550px;
    margin-top: 60px;
    border-radius: 12px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    @media only screen and (max-width: 760px) {
        margin-top: 0;
        width: 100%;
        height: 100%;
    }
`

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
    border-bottom: 1px solid #ccc;
    font-size: 1.2rem;
    font-weight: bold;
    
    button{
        background: none;
        border: none;
        cursor: pointer;
    }
`

export const ModalBody = styled.div`
    padding: 20px;
    height: 440px;
    overflow-y: auto;
    border-bottom: 1px solid #ccc;
`
export const ModalFooter = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    
    span{
        color: var(--app-blue);
        cursor: pointer;
        user-select: none;
    }

    span:hover{
        text-decoration: underline;
    }
`