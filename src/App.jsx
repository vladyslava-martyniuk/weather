import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import PetStories from './components/PetStories/PetStories';
import Slider from './components/Slider/Slider';

function App() {
  return (
    <>
      <Header />

      <main>
     <Hero />
     <PetStories />
     <Slider />
      </main>
     
      <Footer />

      <Modal />
    </>
  );
}

export default App;
