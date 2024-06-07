"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if(Cookies.get('token')) {   
      router.push('/dashboard');
    }
    else{
      router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`);
    }
  });

  return null;
};

export default Home;