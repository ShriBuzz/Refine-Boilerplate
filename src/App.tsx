import { AuthProvider, Refine } from '@pankod/refine-core';
import routerProvider from '@pankod/refine-react-router-v6';
import dataProvider from '@pankod/refine-simple-rest';
import {
  MantineProvider,
  Global,
  NotificationsProvider,
  notificationProvider,
  LightTheme,
  Layout,
  ReadyPage,
  ErrorComponent,
  AuthPage,
  AuthProps,
} from '@pankod/refine-mantine';

// components
import SideNav from '@/components/SideNav';

// pages
import Login from '@/pages/login';
import Dashboard from '@/pages/dashboard';
import { PostList, PostShow, PostEdit, PostCreate } from '@/pages';

const App = () => {
  const authProvider: AuthProvider = {
    login: async ({ email }) => {
      localStorage.setItem('email', email);
      return Promise.resolve();
    },
    register: (params) => {
      if (params.email && params.password) {
        localStorage.setItem('email', params.email);
        return Promise.resolve();
      }
      return Promise.reject();
    },
    updatePassword: (params) => {
      if (params.newPassword) {
        //we can update password here
        return Promise.resolve();
      }
      return Promise.reject();
    },
    forgotPassword: (params) => {
      if (params.email) {
        //we can send email with forgot password link here
        return Promise.resolve();
      }
      return Promise.reject();
    },
    logout: () => {
      localStorage.removeItem('email');
      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
      localStorage.getItem('email') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(['admin']),
    getUserIdentity: () =>
      Promise.resolve({
        id: 1,
        name: 'Jane Doe',
        avatar:
          'https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640',
      }),
  };

  const AuthComponent: React.FC<AuthProps> = (props) => {
    return (
      <AuthPage
        {...props}
        wrapperProps={{
          style: {
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
          },
        }}
      />
    );
  };

  return (
    <MantineProvider
      theme={{
        ...LightTheme,
        components: {
          Input: {
            styles(theme, params) {
              return {
                input: {
                  '&:focus-within': {
                    borderColor: `var(--primary-500)`,
                  },
                  padding: '1.2rem 1rem',
                  borderRadius: '4px',
                },
              };
            },
          },
          Button: {
            styles(theme, params) {
              return {
                button: {
                  '&:hover': {
                    backgroundColor: `var(--primary-600)`,
                  },
                },
              };
            },
          },
        },
      }}
      withNormalizeCSS
      withGlobalStyles
    >
      <Global styles={{ body: { WebkitFontSmoothing: 'auto' } }} />
      <NotificationsProvider position='top-right'>
        <Refine
          authProvider={authProvider}
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                path: '/register',
                element: (
                  <AuthPage
                    type='register'
                    formProps={{
                      onSubmit: (formValues) => {
                        console.log(JSON.stringify(formValues, null, 2));
                      },
                    }}
                  />
                ),
              },
              {
                path: '/forgot-password',
                element: <AuthPage type='forgotPassword' />,
              },
              {
                path: '/update-password',
                element: <AuthPage type='updatePassword' />,
              },
            ],
          }}
          LoginPage={() => <Login />}
          dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          Layout={Layout}
          Sider={SideNav}
          resources={[
            {
              name: 'dashboard',
              list: Dashboard,
            },
            {
              name: 'posts',
              list: PostList,
              show: PostShow,
              edit: PostEdit,
              create: PostCreate,
              canDelete: true,
            },
            {
              name: 'menus',
              list: PostList,
            },
          ]}
        />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
