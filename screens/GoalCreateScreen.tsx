import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '../components/ui/form-control';
import { CircleAlert } from 'lucide-react-native';
import { Input, InputField } from '@/components/ui/input';
import { HOME_ROUTE } from '@/utils/constants';
import { ScreensProps } from '@/types/screen.props.types';
import { useDispatch, useSelector } from 'react-redux';
import { mealService } from '@/services/meal.service';
import { neededUpdate } from '@/store/eatReducer';
import styled from 'styled-components/native';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Text, View } from 'react-native';
import { RootState } from '@/store';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import {
  TypeActivityApi,
  TypeActivityUi,
  TypeGoalApi,
  TypeGoalCreateFormState,
  TypeGoalUi,
} from '@/types/goal.types';
import { goalService } from '@/services/goal.service';
import { setIsAuth } from '@/store/userReducer';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { setGoal } from '@/store/goalReducer';

export const GoalCreateScreen = ({ navigation }: ScreensProps) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.User);


  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TypeGoalCreateFormState>({
    mode: 'onChange',
    defaultValues: {
      typeGoal: TypeGoalApi.weightSupport,
      typeActivity: TypeActivityApi.light,
      gender: user?.gender,
      mealsCount: 3,
      age : user?.age
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['goal_create'],
    mutationFn: (data: TypeGoalCreateFormState) => goalService.create(data),
    onSuccess(data) {
      dispatch(setIsAuth(true))
      dispatch(setGoal(data))
      reset();
      setTimeout(() => {
        navigation.navigate(HOME_ROUTE);
      }, 2000);
    },
    onError(error) {
      console.error('Goal create error:', error.message);
      console.log(error);
    },
  });

  const onSubmit = (data: TypeGoalCreateFormState) => {
    mutate(data);
  };

  return (
    <Main>
      <View className="w-max items-center justify-center">
        <Text className="mb-6 text-xl font-bold">Создание</Text>
      </View>
      <GoalCreateView>




        <Controller
          name="mealsCount"
          control={control}
          rules={{
            required: 'Поле кол-во приёмов пищи обязателено для заполнения',
            min: {
              value: 1,
              message: 'Кол-во приёмов пищи не может быть меньше 1',
            },
            max: {
              value: 11,
              message: 'Введите корректное кол-во приёмов пищи (1 - 10)'
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Поле кол-во приёмов пищи должно содержать только цифры'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <FormControl isInvalid={!!errors.mealsCount} size="md" className='mt-6'>
              <FormControlLabel>
                <FormControlLabelText>Кол-во приёмов пищи</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  inputMode="numeric"
                  keyboardType="numeric"
                  placeholder="Введите кол-во приёмов пищи"
                  value={value?.toString()} // Конвертируем число в строку для отображения
                  onChangeText={(text) => {
                    // Убираем все нецифровые символы
                    const numericValue = text.replace(/[^0-9]/g, '');
                    onChange(numericValue === '' ? '' : Number(numericValue));
                  }}
                  maxLength={2} // Ограничиваем до 2 символов
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={CircleAlert} />
                <FormControlErrorText>{errors.mealsCount?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
        />


        <Controller
          name="weight"
          control={control}
          rules={{
            required: 'Вес обязателен для заполнения',
            min: {
              value: 30,
              message: 'Вес не может быть меньше 30 кг',
            },
            max: {
              value: 201,
              message: 'Введите корректный вес (30 - 200)'
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Вес должен содержать только цифры'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <FormControl isInvalid={!!errors.weight} size="md" className='mt-6'>
              <FormControlLabel>
                <FormControlLabelText>Вес</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  inputMode="numeric"
                  keyboardType="numeric"
                  placeholder="Введите вес (кг)"
                  value={value?.toString()} // Конвертируем число в строку для отображения
                  onChangeText={(text) => {
                    // Убираем все нецифровые символы
                    const numericValue = text.replace(/[^0-9]/g, '');
                    onChange(numericValue === '' ? '' : Number(numericValue));
                  }}
                  maxLength={3} // Ограничиваем до 3 символов
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={CircleAlert} />
                <FormControlErrorText>{errors.weight?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
        />


        <Controller
          name="height"
          control={control}
          rules={{
            required: 'Рост обязателен для заполнения',
            min: {
              value: 60,
              message: 'Рост не может быть меньше 60 см',
            },
            max: {
              value: 301,
              message: 'Введите корректный рост (60-300)'
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Рост должен содержать только цифры'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <FormControl isInvalid={!!errors.height} size="md" className='mt-6'>
              <FormControlLabel>
                <FormControlLabelText>Рост</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  inputMode="numeric"
                  keyboardType="numeric"
                  placeholder="Введите рост (см)"
                  value={value?.toString()} // Конвертируем число в строку для отображения
                  onChangeText={(text) => {
                    // Убираем все нецифровые символы
                    const numericValue = text.replace(/[^0-9]/g, '');
                    onChange(numericValue === '' ? '' : Number(numericValue));
                  }}
                  maxLength={3} // Ограничиваем до 3 символов
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={CircleAlert} />
                <FormControlErrorText>{errors.height?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
        />


        <Controller
          name="typeGoal"
          control={control}
          rules={{
            required: 'Выберите тип активности',
          }}
          render={({ field: { onChange, value } }) => (
            <FormControl isInvalid={!!errors.typeGoal} className='mt-6'>
              <FormControlLabel>
                <FormControlLabelText>Тип активности</FormControlLabelText>
              </FormControlLabel>

              <SelectView >
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}>
                  <Picker.Item label="Выберите тип активности" value="" />
                  <Picker.Item label={TypeGoalUi.weightGain} value={TypeGoalApi.weightGain} />
                  <Picker.Item label={TypeGoalUi.weightLoss} value={TypeGoalApi.weightLoss} />
                  <Picker.Item label={TypeGoalUi.weightSupport} value={TypeGoalApi.weightSupport} />
                </Picker>
              </SelectView>

              <FormControlError>
                <FormControlErrorIcon as={CircleAlert} />
                <FormControlErrorText>{errors.typeGoal?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
        />

        <Controller
          name="typeActivity"
          control={control}
          rules={{
            required: 'Выберите уровень активности',
          }}
          render={({ field: { onChange, value } }) => (
            <FormControl isInvalid={!!errors.typeActivity} className='mt-6'>
              <FormControlLabel>
                <FormControlLabelText>Уровень активности</FormControlLabelText>
              </FormControlLabel>

              <SelectView>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}>
                  <Picker.Item label="Выберите уровень активности" value="" />
                  <Picker.Item label={TypeActivityUi.sedentary} value={TypeActivityApi.sedentary} />
                  <Picker.Item label={TypeActivityUi.light} value={TypeActivityApi.light} />
                  <Picker.Item label={TypeActivityUi.moderate} value={TypeActivityApi.moderate} />
                  <Picker.Item label={TypeActivityUi.active} value={TypeActivityApi.active} />
                  <Picker.Item label={TypeActivityUi.veryActive} value={TypeActivityApi.veryActive} />
                </Picker>
              </SelectView>

              <FormControlError>
                <FormControlErrorIcon as={CircleAlert} />
                <FormControlErrorText>{errors.typeActivity?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
        />


        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isPending}
          className="mb-5 mt-5"
          size="md"
          variant="solid">
          {isPending ? <ButtonSpinner /> : <ButtonText>Создать</ButtonText>}
        </Button>
      </GoalCreateView>
    </Main>
  );
};

const Main = styled.View`
  width: 100%;
  height: 100%;
  padding: 5%;
  background-color: white;
  padding-top: 20%;
`;

const GoalCreateView = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border-color: #eee9e9;
  border-width: 1px;
  border-style: solid;
  padding: 2%;
  padding-left: 5%;
  padding-right: 5%;
  margin-bottom: 5%;
`;

const SelectView = styled.View`
    border-radius: 6px;
    border: 1px solid #d6d6d6;
`