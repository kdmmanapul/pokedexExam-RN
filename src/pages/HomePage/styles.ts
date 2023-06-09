import { Dimensions } from 'react-native';
import styled, { css, DefaultTheme } from 'styled-components/native';

interface ContainerProps {
  theme: DefaultTheme;
}

const windowWidth = Dimensions.get('window').width;

export const LoadingScreen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  ${({ theme }: ContainerProps) => css`
    background: ${theme.colors.background};
    flex: 1;
    position: relative;
  `}
`;

export const Header = styled.ImageBackground`
  ${({ theme }: ContainerProps) => css`
    width: ${windowWidth}px;
    margin-left: -20px;
    height: 110px;
    background: ${theme.colors.background};
  `}
`;

export const Title = styled.Text`
  ${({ theme }: ContainerProps) => css`
    color: ${theme.colors.text};
    font-size: 32px;
    line-height: 38px;
    font-weight: bold;
    margin-top: -70px;
  `}
`;

export const ScrollToTopButton = styled.TouchableOpacity`
  ${({ theme }: ContainerProps) => css`
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    padding: 10px;
  `}
`;

export const ScrollToTopButtonText = styled.Text`
  ${({ theme }: ContainerProps) => css`
    color: white;
    font-size: 16px;
    font-weight: bold;
  `}
`;