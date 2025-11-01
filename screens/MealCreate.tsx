import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from '../components/ui/form-control';
import {CircleAlert} from 'lucide-react-native';
import { Input, InputField} from '@/components/ui/input';
import { HOME_ROUTE} from '@/utils/constants';
import { ScreensProps } from '@/types/screen.props.types';
import { useDispatch, useSelector } from 'react-redux';
import { TypeMealFormCreate } from '@/types/meal.types';
import { mealService } from '@/services/meal.service';
import { neededUpdate } from '@/store/eatReducer';
import styled from 'styled-components/native';
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';
import { Text, View } from 'react-native';
import { UserReducer, UserState } from '@/store/userReducer';
import { RootState } from '@/store';
import { Textarea, TextareaInput } from '@/components/ui/textarea';


export const MealCreateScreen = ({ navigation }: ScreensProps) => {
	const dispatch = useDispatch();
  const {selectedDate} = useSelector((state:RootState)  => state.User)

  ////исправить проблему с датой(переводит на день назад из-за UTC)
  const date = new Date(`${selectedDate}T${new Date().toTimeString().split(' ')[0]}`);
  console.log(date)
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		reset
	} = useForm<TypeMealFormCreate>({
		mode: 'onChange',
		defaultValues: {
		timeMeal: date
		}
	});

	const { mutate, isPending } = useMutation({
		mutationKey: ['meal_create'],
		mutationFn: (data: TypeMealFormCreate) => mealService.create(data),
		onSuccess(data) {
      dispatch(neededUpdate())
			reset();
      navigation.navigate(HOME_ROUTE);
		},
		onError(error) {
			console.error('Meal create error:', error.message);
			console.log(error)
		}
	});

	const onSubmit = (data: TypeMealFormCreate) => {
		mutate(data);
	};

	return (
    <Main>
      <View className='w-max justify-center items-center'>
        <Text className = 'font-bold text-xl mb-6' >Создание</Text>
      </View>
      <MealCreateView>
       {/* Поле Name*/}
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'Имя не должно быть пустым '
        }}
        render={({ field: { onChange, value } }) => (
          <FormControl isInvalid={!!errors.name} size="md" className='mt-6'>
            <FormControlLabel>
              <FormControlLabelText>Название</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type= 'text'
                placeholder="Введите название приёма пищи"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={CircleAlert} />
              <FormControlErrorText>{errors.name?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

       {/* Поле Notes*/}
      <Controller
        name="notes"
        control={control}
        rules={{
          required: 'Описание не должно быть пустым '
        }}
        render={({ field: { onChange, value } }) => (
          <FormControl isInvalid={!!errors.notes} size="md" className='mt-6'>
            <FormControlLabel>
              <FormControlLabelText>Описание</FormControlLabelText>
            </FormControlLabel>
            <Textarea size="md">
              <TextareaInput 
              placeholder="Введите описание приёма пищи" 
              type= 'text'
              value={value}
              onChangeText={onChange}
              />
            </Textarea>
            <FormControlError>
              <FormControlErrorIcon as={CircleAlert} />
              <FormControlErrorText>{errors.notes?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />
      
      <Controller
        name="timeMeal"
        control={control}
        rules={{
          required: 'Время не должно быть пустым'
        }}
        render={({ field: { onChange, value } }) => (
          <FormControl isInvalid={!!errors.timeMeal} size="md" className='mt-6 mb-6'>
            <FormControlLabel>
              <FormControlLabelText>Время приёма пищи</FormControlLabelText>
            </FormControlLabel>
            <Input isDisabled>
              <InputField
                type="text"
                value={value.toLocaleTimeString('ru-RU',{hour: '2-digit',minute: '2-digit'})}
                onChangeText={onChange}
                readOnly={true}
              />
            </Input>
            <FormControlHelper className='mt-2'>
              <FormControlHelperText>Время уже установлено </FormControlHelperText>
            </FormControlHelper>
          </FormControl>
        )}
      />

      <></>

      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || isPending}
        className='mb-5'
        size="md"
        variant="solid">
          {isPending ? (
          <ButtonSpinner />
          ) : (
          <ButtonText>Создать</ButtonText>
          )}
      </Button>


    </MealCreateView>
  </Main>
  );
};

const Main = styled.View`
    width: 100%;
    height: 100%;
    padding:10%;
    background-color: white;
    padding-top: 30%;
`

const MealCreateView = styled.View`
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
    margin-bottom: 5%;
`
