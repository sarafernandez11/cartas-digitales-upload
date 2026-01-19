import styled from "styled-components";

export const Main = styled.main`
    min-height: 90vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    max-width: 448px;
    margin-left: auto;
    margin-right: auto;
`;

export const Header = styled.header`
    padding: 1rem 1.25rem;
`;

export const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 2.5rem;
`;

export const TitleSection = styled.div`
    margin-bottom: 1.5rem;
    text-align: center;
`;

export const Title = styled.h1`
    font-family: "Futura", "Century Gothic", "Avant Garde", system-ui,
        sans-serif;
    font-size: 1.2rem;
    font-weight: 800;
    color: #1a1a1a;
    margin-bottom: 0.25rem;
    letter-spacing: 0em;
    text-transform: uppercase;
`;

export const Subtitle = styled.p`
    font-family: var(--font-montserrat), system-ui, sans-serif;
    color: #737373;
    font-size: 0.875rem;
`;

export const Section = styled.div`
    margin-bottom: 1.5rem;
`;

export const HiddenInput = styled.input`
    display: none;
`;

export const Footer = styled.div`
    padding: 1.25rem;
    padding-bottom: 2.5rem;
    display: flex;
    justify-content: flex-end;
`;
