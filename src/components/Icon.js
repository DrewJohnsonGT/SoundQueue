import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../lib/constants';

const Icon = ({
    icon,
    size = 30,
    color = COLORS.offWhite,
    disabled,
    ...props
}) => {
    const IconComponent = styled(icon)`
        transition: all 0.3s;
        &:active {
            opacity: 0.8;
            transform: scale(0.97);
        }
    `;
    return (
        <IconComponent
            size={size}
            color={disabled ? COLORS.lightOrange : color}
            {...props}
        />
    );
};

export default Icon;
