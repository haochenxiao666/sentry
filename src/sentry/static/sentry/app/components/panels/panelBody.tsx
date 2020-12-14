import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {Flex} from 'reflexbox'; // eslint-disable-line no-restricted-imports

import space from 'app/styles/space';

type FlexComponentProps = Omit<React.ComponentPropsWithoutRef<typeof Flex>, 'theme'>;

type Props = FlexComponentProps & {
  flexible?: boolean;
  withPadding?: boolean;
  forwardRef?: React.Ref<HTMLDivElement>;
};

const PanelBody: React.FunctionComponent<Props> = ({
  flexible,
  forwardRef,
  ...props
}: Props) => (
  <FlexBox
    {...props}
    ref={forwardRef}
    {...(flexible ? {flexDirection: 'column'} : null)}
  />
);

PanelBody.propTypes = {
  flexible: PropTypes.bool,
  withPadding: PropTypes.bool,
};

PanelBody.defaultProps = {
  flexible: false,
  withPadding: false,
};

const FlexBox = styled(Flex)<Props>`
  ${p => !p.flexible && 'display: block'};
  ${p => p.withPadding && `padding: ${space(2)}`};
  *:last-child {
    margin-bottom: 0;
  }
`;

export default PanelBody;
