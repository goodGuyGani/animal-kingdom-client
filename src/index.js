import React from 'react';
import ReactDOM from 'react-dom';
import AnimalRecog from './screens/animalRecog';
import App from './App';
import './index.css';
import CrudApp from './crud';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LessonPage from './screens/lessonPage';
import ChapterPage from './screens/chapterPage';
import { Navbar } from './components';
import About2 from './screens/About2';
import AnimalRecog2 from './screens/animalRecog2';
import Lesson from './container/Work/Lesson';
import Info from './screens/info';
import Register from './screens/register';
import Login from './screens/Login';
import Dogs from './screens/Dogs';
import SingleDog from './screens/SingleDog';
import UserPage from './screens/UserPage';
import Quiz from './screens/Quiz';
import QuizResult from './screens/QuizResult';
import ScoresPage from './screens/ScoresPage';
import Cats from './screens/Cats';
import SingleCat from './screens/SingleCat';
import MyGallery from './screens/MyGallery';


ReactDOM.render(
       <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/about' element={<About2/>}/>
            <Route path='/lessons' element={<Lesson/>}/>
            <Route path='/info' element={<Info/>}/>
            <Route path='/recognition' element={<AnimalRecog2 />}/>
            <Route path='/lesson/:lessonid/:userid' element={<LessonPage />}/>
            <Route path='/chapter/:lessonid/:chapternum/:userid' element={<ChapterPage />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/crud' element={<CrudApp />}/>
            <Route path='/dogs' element={<Dogs />}/>
            <Route path='/cats' element={<Cats />}/>
            <Route path='/cats/:name' element={<SingleCat />}/>
            <Route path='/dogs/:name' element={<SingleDog />}/>
            <Route path='/userpage/:name' element={<UserPage />}/>
            <Route path='/scorepage/:userid/:name' element={<ScoresPage />}/>
            <Route path='/mygallery/:userid' element={<MyGallery />}/>
            <Route path='/quizpage/:lessonid/:quiznum' element={<Quiz />}/>
            <Route path='/quizresult/:userid/:lessonid' element={<QuizResult />}/>
            <Route path='/home' element={<App />}/>
        </Routes>
       </Router> 
        ,
    document.getElementById('root')
);
