'use client';

import * as S from './style';
import Icon from '@mui/material/Icon';

export const Card = ({ children, label, valor }) => {
    return (
        <S.ChartContainer>
            <S.ChartContainer>
                <Icon>{ children }</Icon>
            </S.ChartContainer>
            <div>
                <div>{ label }</div>
                <div>{ valor }</div>
            </div>
        </S.ChartContainer>
    );
};

export default Card;
