import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import {CircleAlert ,Mail} from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import {
  FormControl,
  FormControlLabel,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabelText,
} from '../components/ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { EnumUserGender, ILoginForm, IRegisterForm } from 'types/auth.types';
import { authService } from 'services/auth.service';
import { getAccessToken } from '@/services/auth-token.service';
import { GOAL_CREATE_ROUTE, LOGIN_ROUTE } from '@/utils/constants';
import { Link, LinkText } from '@/components/ui/link';
import { ScreensProps } from '@/types/screen.props.types';
import { HStack } from '@/components/ui/hstack';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUser } from '@/store/userReducer';
import styled from 'styled-components/native';



export const RegisterScreen = ({ navigation } : ScreensProps) => {

  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<IRegisterForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      age:18,
      name:'',
      gender:EnumUserGender.male
    }
  });


  const { mutate, isPending } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: IRegisterForm) => authService.register(data),
    onSuccess(data) {
      dispatch(setUser(data.user))
      reset();
      navigation.navigate(GOAL_CREATE_ROUTE);
    },
    onError(error) {
      console.error('Register error:', error.message);
	  console.log(error)
    }
  });

  const onSubmit = (data: IRegisterForm) => {
    mutate(data);
  };

  return (
    <VStack className='justify-start flex h-screen p-6 pt-20'>


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
              <FormControlLabelText>Имя</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type= 'text'
                placeholder="Введите своё имя"
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

      {/* Поле Email */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Почта не должна быть пустой',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Пожалуйста введите правильную почту'
          }
        }}
        render={({ field: { onChange, value } }) => (
          <FormControl isInvalid={!!errors.email} size="md" className='mt-6'>
            <FormControlLabel>
              <FormControlLabelText>Почта</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputSlot className="ml-3">
                <InputIcon as={Mail} />
              </InputSlot>
              <InputField
                placeholder="Введите вашу почту"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={CircleAlert} />
              <FormControlErrorText>{errors.email?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      {/* Поле Password */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Пароль не должен быть пустой ',
          minLength: {
            value: 6,
            message: 'Должен содержать хотя бы 6 символов'
          }
        }}
        render={({ field: { onChange, value } }) => (
          <FormControl isInvalid={!!errors.password} size="md" className='mt-6'>
            <FormControlLabel>
              <FormControlLabelText>Пароль</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                placeholder="Введите свой пароль"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>Должен быть длиной хотя бы 6 символов.</FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={CircleAlert} />
              <FormControlErrorText>{errors.password?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />


      <Controller
        name="age"
        control={control}
        rules={{
          required: 'Возраст обязателен для заполнения',
          min: {
            value: 6,
            message: 'Возраст не может меньше 6',
          },
          max: {
            value: 120,
            message: 'Введите корректный возраст'
          },
          pattern: {
            value: /^[0-9]+$/,
            message: 'Возраст должен содержать только цифры'
          }
        }}
        render={({ field: { onChange, value } }) => (
          <FormControl isInvalid={!!errors.age} size="md" className='mt-6'>
            <FormControlLabel>
              <FormControlLabelText>Возраст</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                inputMode="numeric"
                keyboardType="numeric"
                placeholder="Введите возраст"
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
              <FormControlErrorText>{errors.age?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />




      <Controller
        name="gender"
        control={control}
        rules={{
          required: 'Выберите пол',
        }}
        render={({ field: { onChange, value } }) => (
          <FormControl isInvalid={!!errors.gender} className='mt-6'>
            <FormControlLabel>
              <FormControlLabelText>Пол</FormControlLabelText>
            </FormControlLabel>
            
          <GenderView >
            <Picker
              selectedValue={value}
              onValueChange={onChange}>
              <Picker.Item label="Выберите пол" value="" />
              <Picker.Item label="Мужской" value="male" />
              <Picker.Item label="Женский" value="female" />
            </Picker>
          </GenderView>
            
            <FormControlError>
              <FormControlErrorIcon as={CircleAlert} />
              <FormControlErrorText>{errors.gender?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />


        <HStack space={'md'} className='flex  items-center justify-between mt-6'>
      
          <Link onPress={() => navigation.navigate(LOGIN_ROUTE)} className='' >
            <LinkText>Уже зарегестрированы? Войти</LinkText>
          </Link>
      
          {/* Кнопка Submit */}
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isPending}
            size="md"
            variant="solid"
          >
            {isPending ? (
              <ButtonSpinner />
            ) : (
              <ButtonText>Регистрация</ButtonText>
            )}
          </Button>
      
        </HStack>
    </VStack>
  );
};



const GenderView = styled.View`
    border-radius: 6px;
    border: 1px solid #d6d6d6;
`
