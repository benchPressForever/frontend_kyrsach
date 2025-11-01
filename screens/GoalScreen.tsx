import { ScreensProps } from '@/types/screen.props.types';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import styled from 'styled-components/native';
import { TypeActivityApi, TypeActivityUi, TypeGoalApi, TypeGoalUi, TypeGoalUpdateFormState } from '@/types/goal.types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TypeMealFormCreate, TypeMealFormUpdate } from '@/types/meal.types';
import { useMutation } from '@tanstack/react-query';
import { mealService } from '@/services/meal.service';
import { neededUpdate } from '@/store/eatReducer';
import { HOME_ROUTE } from '@/utils/constants';
import { goalService } from '@/services/goal.service';
import { setGoal } from '@/store/goalReducer';
import { MessageCircleWarning } from 'lucide-react-native';

export const GoalScreen = ({ navigation }: ScreensProps) => {

  const {goal} = useSelector((state:RootState) => state.Goal)
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<TypeGoalUpdateFormState>({
    mode: 'onChange',
    defaultValues: {
      calories : goal?.calories,
      protein  : goal?.protein,
      fat      : goal?.fat,
      carbs    : goal?.carbs,
      mealsCount   : goal?.mealsCount,
      typeGoal     : goal?.typeGoal,
      typeActivity : goal?.typeActivity
    }
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['goal_update'],
    mutationFn: (data: TypeGoalUpdateFormState) => {
        return goalService.update(data);
    },
    onSuccess(data) {
      dispatch(setGoal(data));
      reset();
    },
    onError(error) {
      console.error('Goal update error:', error.message);
      console.log(error)
    }
  });

  const onSubmit = (data: TypeGoalUpdateFormState) => {
    mutate(data);
  };

  function clickAddGoal(){

  }

  function handleTextChange(text: string) {

  }
  

  return(
    <Main>
      {goal ?
        <>

          <PlanView style = {{borderColor:"#36a2eb",borderWidth:3,marginTop:5}}>
            <MessageCircleWarning color = "#36a2eb"/>
            <Text style = {{color:"#36a2eb",marginLeft:10}}>Внимание: расчёты БЖУ являются ориентировочными и могут отличаться от фактических значений</Text>
          </PlanView>

          <PlanView>
            <Text className='font-bold  text-xl'>Цель:</Text>
            <Text >{TypeGoalUi[goal.typeGoal]}</Text>
          </PlanView>

        <GoalView>

            <LineView>
              <Text style={{fontSize:26,fontWeight:500}}>Калории и БЖУ</Text>
            </LineView>

            <LineView style={{margin:0}}>
                <Text style = {{width:"20%"}}></Text>
                <InputText
                  value={String(goal?.calories)}
                  keyboardType="numeric"
                  onChangeText={handleTextChange}/>
                <TextGoal style = {{width:"20%",}}>кКал</TextGoal>
            </LineView>

            <Line/>

            <LineView >
              <Text className='font-bold text-lg' style={{width:"33%",textAlign:"center"}}>Белки</Text>
              <Text className='font-bold text-lg' style={{width:"33%",textAlign:"center"}}>Жиры</Text>
              <Text className='font-bold text-lg' style={{width:"33%",textAlign:"center"}}>Углеводы</Text>
            </LineView>

            <LineView>
              <ParamView style = {{marginRight:"5%"}}>
                <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <InputText
                  style = {{fontSize:16,width:"auto"}}
                  value={String(goal?.protein)}
                  keyboardType="numeric"
                  onChangeText={handleTextChange}/>
                  <TextGoal> г</TextGoal>
                </View>
                <Line/>
              </ParamView>
              <ParamView style = {{marginRight:"5%"}}>
                <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                  <InputText
                    style = {{fontSize:16,width:"auto"}}
                    value={String(goal?.fat)}
                    keyboardType="numeric"
                    onChangeText={handleTextChange}/>
                  <TextGoal> г</TextGoal>
                </View>
                <Line/>
              </ParamView>
              <ParamView>
                <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                  <InputText
                    style = {{fontSize:16,width:"auto"}}
                    value={String(goal?.carbs)}
                    keyboardType="numeric"
                    onChangeText={handleTextChange}/>
                  <TextGoal> г</TextGoal>
                </View>
                <Line/>
              </ParamView>
            </LineView>

            <LineView style={{flexWrap: 'wrap'}}>
              <Text className='font-bold text-lg'>Тип активности:</Text>
              <Text >{TypeActivityUi[goal.typeActivity]} </Text>
            </LineView>

      </GoalView>
        </>
        :
        <LineView >
          <Text >У вас пока нет целей</Text>
          <TouchableOpacity onPress={() => clickAddGoal()}>
            <ButtonAddGoal>
              <Text style = {{color : "#36a2eb",fontSize:14}}> + Добавить</Text>
            </ButtonAddGoal>
          </TouchableOpacity>
        </LineView>
      }


    </Main>
  );

}


const Main = styled.View`
    width: 100%;
    height: 100%;
    padding:4%;
    background-color: white;
`


const LineView = styled.View`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 5%;
`

const GoalView = styled.View`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    border-radius:20px;
    border-color:#eee9e9;
    border-width:1px;
    border-style:solid;
    padding: 2%;
    padding-left: 5%;
    padding-right: 5%;
`

const ButtonAddGoal = styled.View`
    width: auto;
    padding: 2%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius:20px;
    border-color:#36a2eb;
    border-width:1px;
    border-style:solid;
`

const InputText = styled.TextInput`
    width: 60%;
    height: auto;
    text-align: center;
    font-size: 40px;
    color: #878787;
    margin: 0;
    padding: 0;
`
const TextGoal = styled.Text`
    color: #878787;
`

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: #878787;
    border: none;
`

const ParamView = styled.View`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PlanView = styled.View`
    border-color:#eee9e9;
    border-width:1px;
    border-style:solid;
    padding: 2%;
    padding-left: 5%;
    padding-right: 5%;
    margin-bottom: 2%;
    width: 100%;
    border-radius:20px;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
