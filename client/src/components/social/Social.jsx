import Icon from '../basic/Icon';
import styled from 'styled-components';

const Social = () => {
  return (
    <SocialDiv>
      <Icon className="socialIcon fab fa-facebook-square" />
      <Icon className="socialIcon fab fa-twitter-square" />
      <Icon className="socialIcon fab fa-pinterest-square" />
      <Icon className="socialIcon fab fa-instagram-square" />
    </SocialDiv>
  )
};

const SocialDiv = styled.div`
  font-size: 20px;
  margin-right: 10px;
  color: #444;
  cursor: pointer;
`

export default Social;
