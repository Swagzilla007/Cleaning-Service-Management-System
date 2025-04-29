import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookings from './pages/Bookings';
import Services from './pages/Services';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminLogin from './pages/AdminLogin';
import AdminServices from './pages/AdminServices';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2C2E43',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FBD64A',
      contrastText: '#2C2E43',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2E43',
      secondary: '#2C2E43',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#2C2E43',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#FBD64A',
            color: '#2C2E43',
          },
        },
        outlined: {
          borderColor: '#2C2E43',
          color: '#2C2E43',
          '&:hover': {
            borderColor: '#FBD64A',
            color: '#FBD64A',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2C2E43',
          color: '#FFFFFF',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="services" element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              } />
              <Route path="services/book" element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              } />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="admin/login" element={<AdminLogin />} />
              <Route
                path="admin/*"
                element={
                  <AdminRoute>
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="services" element={<AdminServices />} />
                    </Routes>
                  </AdminRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
