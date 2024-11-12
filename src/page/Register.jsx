import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import API from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Menampilkan loading toast
    const loadingToast = toast.loading('Creating your account...');

    try {
      // Validasi input dasar
      if (!register.email || !register.password) {
        toast.error('Email dan password harus diisi', {
          id: loadingToast,
        });
        setError("Email dan password harus diisi");
        return;
      }

      // Validasi format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(register.email)) {
        toast.error('Format email tidak valid', {
          id: loadingToast,
        });
        setError("Format email tidak valid");
        return;
      }

      // Validasi password
      if (register.password.length < 6) {
        toast.error('Password minimal 6 karakter', {
          id: loadingToast,
        });
        setError("Password minimal 6 karakter");
        return;
      }

      const data = await API.register(register);
      
      if (!data) {
        throw new Error("Registrasi gagal");
      }

      // Update loading toast menjadi success
      toast.success('Registrasi berhasil! Silakan login.', {
        id: loadingToast,
      });

      // Delay navigasi sedikit untuk memberikan waktu toast muncul
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Registrasi gagal. Silakan coba lagi.";
      
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
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            
            {error && (
              <div className="w-full max-w-xs mt-4 p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleRegister} className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={register.email}
                  onChange={handleInput}
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={register.password}
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
                  <span className="ml-3">Sign Up</span>
                </button>

                <div className="flex justify-center gap-2">
                  <p className="text-xs mt-5">have an account ? </p>
                  <Link to="/login">
                    <p className="text-xs underline mt-5">Login Here</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://static.mywebsites360.com/e4bcbf7963af4e77ba8806186053d4dc/i/e6dbc0bf87fe463a9aea942f7aafc9c5/1/4SoifmQp45JMgBnHndfLg/4-hat.jpg')"
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Register;