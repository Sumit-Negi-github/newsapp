import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  pageSize = 5
  render() {
    return (
      
      <div>
        <Router>
        <Navbar/>
        <Routes>
        <Route exact path="/" element={<News key = "general" pageSize = {this.pageSize} country = "in" newsapikey = "620f6e04356249179e1834b0a208a23e" category = 'general'/>} />
        <Route exact path="/sports" element={<News key = "sports" pageSize = {this.pageSize} country = "in" newsapikey = "620f6e04356249179e1834b0a208a23e" category = 'sports'/>} />
        <Route exact path="/general" element={<News key = "general" pageSize = {this.pageSize} country = "in" newsapikey = "620f6e04356249179e1834b0a208a23e" category = 'general'/>} />
        <Route exact path="/business" element={<News key = "business" pageSize = {this.pageSize} country = "in" newsapikey = "620f6e04356249179e1834b0a208a23e" category = 'business'/>} />
        <Route exact path="/science" element={<News key = "science" pageSize = {this.pageSize} country = "in" newsapikey = "620f6e04356249179e1834b0a208a23e" category = 'science'/>} />
        <Route exact path="/entertainment" element={<News key = "entertainment" pageSize = {this.pageSize} country = "in" newsapikey = "620f6e04356249179e1834b0a208a23e" category = 'entertainment'/>} />
        <Route exact path="/health" element={<News key = "health" pageSize = {this.pageSize} country = "in" newsapikey = "620f6e04356249179e1834b0a208a23e" category = 'health'/>} />
        <Route exact path="/technology" element={<News key = "technology" pageSize = {this.pageSize} country = "in" newsapikey = "620f6e04356249179e1834b0a208a23e" category = 'technology'/>} />
        </Routes>
        </Router>
      </div>
      
    )
  }
}


