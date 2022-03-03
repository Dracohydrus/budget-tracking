import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';

const LinkComponent = ({ ...props }) => {
  return (
    <ReactRouterLink {...props} />
  )
}

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: inherit;
`

export default Link;