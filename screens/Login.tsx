import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
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
import {CircleAlert ,Mail} from 'lucide-react-native';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { ILoginForm } from 'types/auth.types';
import { authService } from 'services/auth.service';
import { View ,Image} from 'react-native';
import { HOME_ROUTE, REGISTER_ROUTE } from '@/utils/constants';
import { ScreensProps } from '@/types/screen.props.types';
import { Link, LinkText } from '@/components/ui/link';
import { HStack } from '@/components/ui/hstack';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUser } from '@/store/userReducer';



export const LoginScreen = ({ navigation }: ScreensProps) => {

	const dispatch = useDispatch();

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		reset
	} = useForm<ILoginForm>({
		mode: 'onChange',
		defaultValues: {
		email: '',
		password: ''
		}
	});

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: ILoginForm) => authService.login(data),
		onSuccess(data) {
			dispatch(setIsAuth(true))
      dispatch(setUser(data.user))
			reset();
			setTimeout(() => {
          navigation.navigate(HOME_ROUTE);
      }, 2000);
		},
		onError(error) {
			console.error('Login error:', error.message);
			console.log(error)
		}
	});

	const onSubmit = (data: ILoginForm) => {
		mutate(data);
	};

	return (
    <VStack className='justify-start flex h-screen p-6 pt-40'>

		<View className='w-max  mb-8 flex items-center'>	
			<Image className='w-16 h-16  object-contain' source={require("../assets/eat.png")} alt = 'login'/>	
		</View>


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
          <FormControl isInvalid={!!errors.email} size="md" className='mt-10'>
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
          <FormControl isInvalid={!!errors.password} size="md" className='mt-10'>
            <FormControlLabel>
              <FormControlLabelText>Пароль</FormControlLabelText>
            </FormControlLabel>
            <Input >
              <InputField
                type="password"
                placeholder="Введите свой пароль"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            </Input>
            <FormControlHelper className='mt-4'>
              <FormControlHelperText>Должен быть длиной хотя бы 6 символов.</FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={CircleAlert} />
              <FormControlErrorText>{errors.password?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />



	<HStack space={'md'} className='flex  items-center justify-between mt-10'>

		<Link onPress={() => navigation.navigate(REGISTER_ROUTE)}>
			<LinkText>Вы у нас впервые? Регистрация</LinkText>
		</Link>

		<Button
			onPress={handleSubmit(onSubmit)}
			disabled={!isValid || isPending}
			size="md"
			variant="solid"
		>
			{isPending ? (
			<ButtonSpinner />
			) : (
			<ButtonText>Войти</ButtonText>
			)}
		</Button>

	</HStack>

	


     


	  
    </VStack>
  );
};
