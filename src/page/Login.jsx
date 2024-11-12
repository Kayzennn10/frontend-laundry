import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import API from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "customer1@index.co",
    password: "customer1",
  });
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    // Menampilkan loading toast
    const loadingToast = toast.loading('Signing in...');

    try {
      // Validasi input dasar
      if (!login.email || !login.password) {
        toast.error('Email dan password harus diisi', {
          id: loadingToast,
        });
        setError("Email dan password harus diisi");
        return;
      }

      const data = await API.login(login);

      // Pastikan data response valid
      if (!data || !data.email || !data.role) {
        throw new Error("Invalid response from server");
      }

      // Simpan ke localStorage
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("id", data.id);

      // Update loading toast menjadi success
      toast.success('Login berhasil!', {
        id: loadingToast,
      });

      // Delay navigasi sedikit untuk memberikan waktu toast muncul
      setTimeout(() => {
        if (data.role === "admin") {
          navigate("/dashboardadmin");
        } else if (data.role === "customer") {
          navigate("/");
        }
      }, 1000);

    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Login gagal. Silakan coba lagi.";
      
      // Update loading toast menjadi error
      toast.error(errorMessage, {
        id: loadingToast,
      });
      
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {/* Tambahkan Toaster component */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Styling untuk semua toast
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          // Kustomisasi untuk toast success
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
          // Kustomisasi untuk toast error
          error: {
            duration: 4000,
            theme: {
              primary: '#ff4b4b',
            },
          },
        }}
      />
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://s3.bukalapak.com/hdr/32658102/normal/Logo-Azka-web.png"
              className="w-32 mx-auto"
              alt="Logo"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign in</h1>

            {error && (
              <div className="w-full max-w-xs mt-4 p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleLogin} className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={login.email}
                  onChange={handleInput}
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={login.password}
                  onChange={handleInput}
                  required
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign In</span>
                </button>

                <Link to="/register">
                  <p className="text-xs underline text-center mt-5">
                    Register here
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://nuss.uxper.co/boutique-hotel/wp-content/uploads/sites/2/2021/04/OD-1.png')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;