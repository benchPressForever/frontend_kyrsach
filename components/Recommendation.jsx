import styled from 'styled-components';
import { Lightbulb } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { recommendationService } from '@/services/recommendation.service';
import { Loading } from '@/components/Loading';

export const Recommendation = () => {

  const route = useRoute();
  const { id } = route.params;

  const [recommendation,setRecommendation] = useState();
  const [loading, setLoading] = useState(true);

  console.log(id)

  useEffect(() => {
    const getRecommendation = async () => {
      setLoading(true);
      try{
        const data = await  recommendationService.getById(id);
        setRecommendation(data);
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }
    getRecommendation();
  },[id])


  console.log(recommendation);

  if (loading) {
    return <Loading />;
  }

  return (

    /*
    <Card>
      <Header>
        <IconContainer>
          <Lightbulb size={20} color="#FFA000" />
        </IconContainer>
        <Title>{recommendation.title}</Title>
      </Header>
      <Content>
        <TextContent>{recommendation.text}</TextContent>
      </Content>
    </Card>*/
    <>
    {recommendation.text && (
        <WebView
          source={{ uri: recommendation.text }}
          style={{ flex: 1 }}
        />
      )}
      </>
  );
};

const Card = styled.ScrollView`
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin: 8px 0;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 3;
  border-left-width: 4px;
  border-left-color: #FFA000;
  width: 96%;
  margin-left: 2%;
  
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const IconContainer = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: #FFF8E1;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  flex: 1;
`;

const Content = styled.View`
  background: #FAFAFA;
  border-radius: 12px;
  padding: 16px;
`;

const TextContent = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: #666;
  text-align: left;
`;