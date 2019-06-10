import React, {Component} from "react";
import "./App.css";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/react-fontawesome";

class App extends Component {
  state = {
    quoteText: undefined,
    quoteAuthor: undefined,
    arrayOfQuotes: [],
    lastQuote: undefined
  };

  getQuote = async () => {
    const endpoint =
      "https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
    var that = this;
    fetch(endpoint)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        that.setState({
          lastQuote: that.state.quoteText,
          quoteAuthor: data.quoteAuthor,
          quoteText: data.quoteText
        });
      })
      .catch(function(error) {
        console.log("An error occurred");
        console.log(error);
        that.getQuote();
      });
    //  const api_call = await fetch ('https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
    //  const data = await api_call.json();
  };

  componentDidUpdate() {
    if (this.state.lastQuote && this.state.arrayOfQuotes.length === 0) {
      // check for beginning of array
      this.setState({
        arrayOfQuotes: [...this.state.arrayOfQuotes, this.state.lastQuote]
      });
      console.log("if statement in first check worked");
    } else if (
      this.state.lastQuote &&
      this.state.arrayOfQuotes[this.state.arrayOfQuotes.length - 1] !==
        this.state.lastQuote
    ) {
      this.setState({
        arrayOfQuotes: [...this.state.arrayOfQuotes, this.state.lastQuote]
      });
      console.log("if statement worked");
    } //else console.log("if statement failed");
    //console.log(this.state.arrayOfQuotes)
  }

  render() {
    if (!this.state.quoteAuthor && !this.state.quoteText) {
      this.getQuote();
    }
    return (
      <div className="App">
        <TitleQuote
          getQuote={this.getQuote}
          quoteAuthor={this.state.quoteAuthor}
          quoteText={this.state.quoteText}
        />
        <ArrayOfQuotes arrayOfQuotes={this.state.arrayOfQuotes} />
      </div>
    );
  }
}

const TitleQuote = props => {
  return (
    <div>
      {!props.quoteText && <div>Waiting on text..</div>}
      {props.quoteText && (
        <div id="quote-box">
          <p>Random Quote Machine</p>
          <div>
            <div id="text">{props.quoteText}</div>
            <div id="author">{props.quoteAuthor}</div>
          </div>
          <button type="button" className="fa" onClick={props.getQuote}>
            Get Quote
          </button>
          <a
            className="fa fa-twitter"
            href={`https://twitter.com/intent/tweet?text=${props.quoteText}`}
          >
            Tweet
          </a>
        </div>
      )}
    </div>
  );
};

const ArrayOfQuotes = props => {
  if (props.arrayOfQuotes.length < 1) {
    return null;
  }
  var slicedArray = props.arrayOfQuotes
    .slice(0, props.arrayOfQuotes.length)
    .reverse();
  const renderArray = slicedArray.map(x => (
    <div key={x} className="col-md-4">
      <div className="quoteHistory">
        {x.length < 90 ? x : x.substring(0, 90) + "..."}
      </div>
    </div>
  ));
  //console.log(slicedArray);
  return (
    <div className="container-fluid">
      <div className="row">{renderArray}</div>
    </div>
  );
};
//   slicedArray.map((x) => {
//     return (
//       <div className="col-md-4" key = {x}>
//         <div className="quoteHistory">
//           {x}
//         </div>
//       </div>
//     )
//     })

export default App;
