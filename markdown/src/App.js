import React, {Component} from 'react';
import './App.css';


import Check from './check.png';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import marked from 'marked';

import {sampleText} from './sampleText';

class App extends Component {

  state = {
    text: sampleText,
    copied: false,
  };

  // -------Changing Component----------------------------------------------

componentDidMount () {
  const text = localStorage.getItem('text')
  if(text) {
  this.setState({text})
  } else {
    this.setState({text : sampleText})
  }
}

 componentDidUpdate () {
   const { text } = this.state
   localStorage.setItem('text', text)
 }

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  renderText = text => {
   const __html = marked(text,{sanitize: true})
    return {__html}
  }

// ------------------------------------------------------
  render () {
    
  return (
   <div className="container">
     <div className="row">
       <div className="col-sm-6">
         <textarea
         onChange={this.handleChange}
         value = {this.state.text}
         rows="35" 
         className="input form-control">
         </textarea>
       </div>
       <div className="col-sm-6 d-flex flex-column">
         <div dangerouslySetInnerHTML={this.renderText(this.state.text)}>  
         </div>
         <div>
           <div className="row">   
              <CopyToClipboard text={this.state.text}
                onCopy={() => this.setState({copied: true})}>
                <button className="btn btn-primary"> Copy Now...</button>
              </CopyToClipboard>
              <div className="ml-4">
                {this.state.copied ? <img src={Check} width="40" height="auto"></img> : null}
              </div>
            </div>
        </div>
        
       </div>
      </div> 
      <div class="card mt-4">
        <div class="card-body">
          <h1 class="card-title text-center">
              A small app allowing you to write your text in Markdown and have a visualization rendering.
              Now copy to be able to use it!
          </h1>
        </div>
      </div>
    </div>

  )
 }
}

export default App;
