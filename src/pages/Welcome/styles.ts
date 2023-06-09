import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background: ${theme.colors.backgroundCard.water};
  `}
`;

// export const Bottom = styled.View`
//   ${({ theme }) => css`
//     width: 100%;
//     height: 30%;
//     background: ${theme.colors.background};
//     opacity: 0.9;
//     padding: 20px;
//     border-top-right-radius: 20px;
//     border-top-left-radius: 20px;

//     justify-content: center;
//     align-items: center;
//   `}
// `;

export const Bottom = styled.View`
  ${({ theme }) => css`
    flex: 1;
    width: 100%;
    padding: 20px;
    background: ${theme.colors.background};
    opacity: 0.9;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    justify-content: center;
    align-items: center;
  `}
`;

export const Content = styled.View`
  ${({ theme }) => css`
    background: ${theme.colors.backgroundCard.water};
    height: 70%;
    align-items:center
    justify-content: center;
  `}
`;

export const WrapperIcon = styled.View`
  ${({ theme }) => css`
    width: 200px;
    height: 300px;
    background: ${theme.colors.boxType.water};
    border-radius: 100px;
    transform: rotate(30deg);
    align-items: center;
    justify-content: center;
  `}
`;

export const IconContent = styled.View`
  width: 200px;
  height: 300px;
  transform: rotate(-30deg);
`;

export const Button = styled.TouchableOpacity`
  ${({ theme }) => css`
    width: 80%;
    height: 50px;
    border-radius: 70px;
    background: ${theme.colors.boxType.water};
    justify-content: center;
    align-items: center;
  `}
`;

export const ButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.background};
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.background};
    font-size: 40px;
    margin-top: 20px; ;
  `}
`;

export const SubTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.background};
    font-size: 14px;
  `}
`;

export const TextInput = styled.TextInput`
  ${({ theme }) => css`
    width: 75%;
    height: 40px;
    background-color: ${theme.colors.background};
    border-width: 0.5px;
    border-radius: 70px;
    padding: 8px;
    margin-bottom: 10px;
    color: ${theme.colors.text};
  `}
`;