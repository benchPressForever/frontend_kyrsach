import { View, Text, TouchableOpacity } from 'react-native';
import '../global.css'
import styled from 'styled-components';
import { User, Mail, User as Gender, Award } from 'lucide-react-native';
import { useSelector } from 'react-redux';

export const UserScreen = () => {
  const { user } = useSelector(state => state.User)

  return (
    <Main>
      {/* Header с аватаром */}
      <HeaderView>
        <Avatar>
          <User size={40} color="#fff" />
        </Avatar>
        <Text className='font-bold text-2xl text-white'>Профиль</Text>
        <Text className='text-white opacity-80'>{user.name}</Text>
      </HeaderView>

      {/* Карточка пользователя */}
      <CardView>
        <InfoItem>
          <IconContainer style={{ backgroundColor: '#E3F2FD' }}>
            <User size={22} color="#1976D2" />
          </IconContainer>
          <InfoContent>
            <InfoLabel>Имя пользователя</InfoLabel>
            <InfoValue>{user.name}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem>
          <IconContainer style={{ backgroundColor: '#F3E5F5' }}>
            <Mail size={22} color="#7B1FA2" />
          </IconContainer>
          <InfoContent>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{user.email}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem>
          <IconContainer style={{ backgroundColor: '#E8F5E8' }}>
            <Gender size={22} color="#388E3C" />
          </IconContainer>
          <InfoContent>
            <InfoLabel>Пол</InfoLabel>
            <InfoValue>{user.gender || 'Не указан'}</InfoValue>
          </InfoContent>
        </InfoItem>

        <InfoItem>
          <IconContainer style={{ backgroundColor: '#FFF3E0' }}>
            <Award size={22} color="#F57C00" />
          </IconContainer>
          <InfoContent>
            <InfoLabel>Статус</InfoLabel>
            <InfoValue>Активный пользователь</InfoValue>
          </InfoContent>
        </InfoItem>
      </CardView>

      {/*Дополнительные действия*/}
      <ActionsView>
        <ActionButton>
          <Text className='font-bold text-blue-600 text-center'>Редактировать профиль</Text>
        </ActionButton>
        <ActionButton style={{ backgroundColor: '#F5F5F5' }}>
          <Text className='font-bold text-gray-600 text-center'>Настройки</Text>
        </ActionButton>
      </ActionsView>
    </Main>
  );
}

const Main = styled.View`
    flex: 1;
    background-color: #f8fafc;
    padding: 0;
`

const HeaderView = styled.View`
    background: #667eea ;
    padding: 60px 20px 40px 20px;
    align-items: center;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    shadow-color: #000;
    shadow-offset: 0px 10px;
    shadow-opacity: 0.1;
    shadow-radius: 20px;
    elevation: 10;
`

const Avatar = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background: rgba(255, 255, 255, 0.2);
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    border: 3px solid rgba(255, 255, 255, 0.3);
`

const CardView = styled.View`
    background: white;
    margin: -30px 20px 20px 20px;
    border-radius: 20px;
    padding: 25px;
    shadow-color: #000;
    shadow-offset: 0px 5px;
    shadow-opacity: 0.05;
    shadow-radius: 15px;
    elevation: 5;
`

const InfoItem = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 15px 0;
    border-bottom-width: 1px;
    border-bottom-color: #f0f0f0;
`

const IconContainer = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
`

const InfoContent = styled.View`
    flex: 1;
`

const InfoLabel = styled.Text`
    font-size: 14px;
    color: #666;
    margin-bottom: 4px;
`

const InfoValue = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #333;
`

const ActionsView = styled.View`
    padding: 0 20px;
    gap: 12px;
`

const ActionButton = styled.TouchableOpacity`
    background: white;
    padding: 18px;
    border-radius: 15px;
    border: 1px solid #e0e0e0;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.02;
    shadow-radius: 8px;
    elevation: 2;
`
