import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { ChevronRight, Lightbulb, TrendingUp, AlertTriangle, Heart } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import { setRecommendation } from '@/store/userReducer';
import { useNavigation } from '@react-navigation/native';
import { RECOMMENDATION_ONE_ROUTE } from '@/utils/constants';

export const RecommendationCard = ({ id,title,text}) => {

  const navigation = useNavigation()

  const onClick = () => {
      navigation.navigate(RECOMMENDATION_ONE_ROUTE,{id: id} )
  }

  return (
    <Card onPress={onClick}>
      <Content>
        <LeftSection>
          <IconContainer bgColor="#FFF8E1">
            <Lightbulb size={20} color="#FFA000" />
          </IconContainer>
          <Title>{title}</Title>
        </LeftSection>
        <ChevronRight size={20} color="#999" />
      </Content>
    </Card>
  );
};

const Card = styled.TouchableOpacity`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin: 4px 0;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  border-left-width: 4px;
  border-left-color: #FFA000;
  width: 96%;
  margin: 2%;
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${props => props.bgColor};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  flex: 1;
`;
