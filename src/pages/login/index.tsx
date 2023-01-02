import {
  Button,
  Container,
  Input,
  Group,
  PasswordInput,
  FormContext,
} from '@pankod/refine-mantine';

import {
  LoginFormTypes,
  LoginPageProps,
  useLogin,
  useRouterContext,
  useTranslate,
} from '@pankod/refine-core';

const Login: React.FC<LoginPageProps> = (props) => {
  const { useForm, FormProvider } = FormContext;
  const { onSubmit: onSubmitProp, ...useFormProps } = props.formProps || {};
  const translate = useTranslate();
  const { Link } = useRouterContext();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validate: {
      email: (value: any) =>
        /^\S+@\S+$/.test(value)
          ? null
          : translate('pages.login.errors.validEmail', 'Invalid email address'),
      password: (value: any) => value === '',
    },
    ...useFormProps,
  });
  const { onSubmit, getInputProps } = form;

  const { mutate: login, isLoading } = useLogin<LoginFormTypes>();
  return (
    <Container className='flex justify-center items-center w-screen h-screen'>
      <Group
        position='center'
        spacing='sm'
        className='flex-col shadow-md p-8 rounded'
      >
        <p className='text-lg font-medium'>Sign In</p>
        <Input placeholder='Username' className='w-full' />
        <PasswordInput
          placeholder='Password'
          label='Password'
          description='Password must include at least one letter, number and special character'
          withAsterisk
        />
        <Button
          className='px-4 py-2 bg-primary-500 text-white w-full mt-2'
          type='submit'
          onClick={() =>
            login({
              providerName: 'email',
            })
          }
        >
          Login
        </Button>
      </Group>
    </Container>
  );
};

export default Login;
