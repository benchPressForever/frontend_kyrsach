import styled from 'styled-components';
import { Text, RefreshControl, TouchableOpacity } from 'react-native';
import { LineProduct } from '../components/LineProduct';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import React from 'react';
import {
  addProducts,
  setProductList
} from '../store/eatReducer';
import { ModalWeightProduct } from '../components/ModalWeightProduct';
import { foodService } from '@/services/food.service';
import { Loading } from '@/components/Loading';
import { useFocusEffect } from '@react-navigation/native';


export const ProductsScreen = () => {
  const dispatch = useDispatch();
  const { ProductList} = useSelector((state) => state.Eat);
  const [SearchValue, onChangeSearchValue] = React.useState('');
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clickFood,setClickFood] = useState()

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log('Экран закрывается - очищаем данные');
        dispatch(setProductList([]));
      };
    }, [])
  );

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const data = await foodService.getAllByName(SearchValue, page, limit);
      if (data && Array.isArray(data)) {
        if (page == 1) {
          dispatch(setProductList(data));
        } else dispatch(addProducts(data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      fetchItems();
  }, [SearchValue,page,limit]);

  const clickEatProduct = (item) => {
    setClickFood(item)
    setIsModalVisible(true);
  };

  const loadMoreItem = () => {
    setIsLoading(true);
    setTimeout(() => {
        setPage((v) => v + 1);
    }, 1000);
    setIsLoading(false);
  };

  const onChangeHandler = (data) => {
    onChangeSearchValue(data);
    setPage(1);
  };

  if(isLoading) return <Loading/>

  return (
    <MainView>
      <HeaderProductView>
        <Box>
          <TextBox style={{ fontSize: 13, color: '#36a2eb' }}>Белки</TextBox>
          <TextBox style={{ fontSize: 13, color: '#ffc01d' }}>Жиры</TextBox>
          <TextBox style={{ fontSize: 13, color: '#fe777b' }}>Углеводы</TextBox>
        </Box>
        <Block>
          <TextBox>Порция</TextBox>
        </Block>
      </HeaderProductView>

      {ProductList.length > 0 ? (
        <ProductFlatList
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchItems} />}
          data={ProductList}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ width: '100%' }} onPress={() => clickEatProduct(item)}>
              <LineProduct
                name={item.name}
                weight={100}
                protein={item.proteinPer100}
                fat={item.fatPer100}
                carbs={item.carbsPer100}
                calories={item.caloriesPer100}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      ) : (
        <InfoView>
            <Text className=' font-bold mb-6'> Нет продуктов!</Text>
            <Text className=' font-bold '> Введите название продукта.</Text>
        </InfoView>
      )}

      <BottomView>
        <InputView>
          <InputText
            onChangeText={onChangeHandler}
            value={SearchValue}
            placeholder="Поиск"
          />
          <SearchImage source={require('../assets/search.png')} />
        </InputView>
        {0 ? (
          <FooterView>
            <ImageFooter source={require('../assets/menu.png')} />
            <ImageFooter source={require('../assets/star.png')} />
          </FooterView>
        ) : undefined}
      </BottomView>

      {isModalVisible && clickFood && 
        <ModalWeightProduct 
          onClose={() => setIsModalVisible(false)} 
          item = {clickFood}/>}
    </MainView>
  );
};

const ImageFooter = styled.Image`
  width: 8%;
  height: 50%;
  margin-right: 10%;
  margin-left: 10%;
`;

const FooterView = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
  align-items: center;
`;

const Block = styled.View`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: row;
`;

const Box = styled.View`
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const HeaderProductView = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 7%;
  background-color: white;
  border-bottom-color: '#ddd';
  border-bottom-width: 0.5px;
  border-bottom-style: solid;
  padding: 2%;
  position: relative;
  padding-left: 4%;
  padding-right: 0;
`;

const MainView = styled.View`
  width: 100%;
  height: 100%;
`;
const ProductFlatList = styled.FlatList`
  width: 100%;
  height: 70%;
  background-color: #f7f7f7;
`;

const InfoView = styled.View`
  width: 100%;
  height: 75%;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.Text`
  font-weight: 300;
  font-size: 15px;
  margin-right: 5%;
`;

const BottomView = styled.View`
  height: 18%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-top-color: #ddd;
  border-top-width: 0.5px;
  border-top-style: solid;
`;

const InputText = styled.TextInput`
  width: 80%;
  margin: 1%;
  border-color: #ddd;
  border-width: 0.5px;
  border-style: solid;
  border-radius: 15px;
  height: 60%;
  background-color: #f7f7f7;
  font-size: 18px;
  padding-left: 10%;
`;

const InputView = styled.View`
  width: 100%;
  height: 50%;
  border-bottom-color: #ddd;
  border-bottom-width: 0.5px;
  border-top-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchImage = styled.Image`
  position: absolute;
  left: 14%;
  bottom: 35%;
  width: 5%;
  height: 30%;
`;
