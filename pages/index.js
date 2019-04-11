import React from 'react'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import Theme from '../components/Theme'
import Layout from '../components/Layout'
import axios from 'axios'

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      foods: this.props.foods,
      firstName: ``,
      lastName: ``,
      heroName: ``,
      favoriteFood: ``,
      visible: 4
    };
  }

  // Next.js function for isomorphic data fetching
  static async getInitialProps() {
    const res = await fetch(`${Theme.links[0].getUserFoods}`)
    const foods = await res.json()
    return {foods}
  }

  // Sets input specific state with the current value in the input
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  
  // Creates a new Hero
  handleSubmit = (e) => {
    axios.post('/users/food', {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      hero_name: this.state.heroName,
      favorite_food: this.state.favoriteFood
    })
    .then(function (response) {
      console.log(response);
      location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // Loads 4 more Heroes to the list on display
  loadMore = () => {
    // Resets all the Delete button to not display
    for(let i = 0; i < document.querySelectorAll('.deleteBtn').length; i++) {
      document.querySelectorAll('.deleteBtn')[i].classList.add('displayNone')
    }

    this.setState((prev) => {
      return {visible: prev.visible + 4};
    });
  }

  // Deletes Item from the usersCopy 
  delete = (e) => {
    axios({
      method: 'DELETE',
      url:'/users/food', 
      params: {
        id: e.target.id
      }
    })
    .then(function (response) {
      console.log(response.data)
      location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // Toggle displaying the delete button for each Hero. Would use forEach() but still not supported in IE
  displayEdit = () => {
    for(let i = 0; i < document.querySelectorAll('.deleteBtn').length; i++) {
      document.querySelectorAll('.deleteBtn')[i].classList.toggle('displayNone')
    }
  }

  render(){
    return (
        <Layout displayEdit={this.displayEdit}>
          <Head>
              <html lang='en-US'/>
              <link rel='canonical' href={``} />
              <link rel='icon' href='' sizes='32x32'></link>
              <link rel='icon' href='' sizes='192x192'></link>
              <meta charSet='UTF-8'/>
              <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
              <meta httpEquiv='X-UA-Compatible' content='ie=edge'/>
              <title>Super Heroes</title>
              <meta name='description' content={`Their Favorite Foods`}/>
          </Head>

          <div className='container'>
            <div className='scrollBox'>
                <ul className='Herolist'>
                  {this.state.foods.slice(0, this.state.visible).map((item, index) => {
                    return(
                        <li className='Hero' key={index + `,`+ item.hero_name + `,`+ item.id}>
                            <h2>{index + 1 + `. ` + item.hero_name}</h2>
                            <h3>{item.first_name + ` ` + item.last_name}</h3>
                            {item.favorite_food.map((item, index) => {
                              return(
                                <p key={index}>{index + 1 + `. `+ item.food}</p>
                              )
                            })}
                            <button title='Delete Hero' className='deleteBtn displayNone' id={item.id} onClick={this.delete}><img className='icon' src='/static/icons8-cancel-48.png'/></button>
                        </li>
                    )
                  })}
                </ul>
            </div>

            <div className='btnContainer'>
              {this.state.visible < this.state.foods.length &&
                <button className='loadMoreBtn' onClick={this.loadMore}>Load More Heroes</button>
              }
            </div>

            <div className='formContainer'>
            <h2 className='formTitle'>Add a Hero</h2>
              <form action='#' onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} id='heroName' type="text" name="heroName" placeholder={`Hero Name`}/>
                <input onChange={this.handleChange} id='firstName' type="text" name="firstName" placeholder={`First Name`}/>
                <input onChange={this.handleChange} id='lastName' type="text" name="lastName" placeholder={`Last Name`}/>
                <input onChange={this.handleChange} id='favoriteFood' type="text" name="favoriteFood" placeholder={`Favorite Food`}/>
                <input id='submitForm' type="submit" value="Submit"/>
              </form>
            </div>

            <style jsx>{`
              .displayNone {
                display: none;
              }
              .container {
                padding: 20px;
              }
              .scrollBox {
                max-width: 600px;
                margin: 0 auto;
                margin-bottom: 20px;
                border: solid 1px #D7D7D7;
                background-color: #FCF7F8;
              }
              .Herolist {
                width: 100%;
                padding: 0;
                margin: 0;
              }
              .Hero {
                list-style-type: none;
                border: solid 1px #D7D7D7;
                text-align: center;
                padding-bottom: 20px;
              }
              #submitForm {
                cursor: pointer;
              }
              form {
                padding: 20px;
              }
              .formTitle {
                margin: 0;
              }
              .formContainer {
                padding: 10px;
                background-color: #4E8098;
                max-width: 300px;
                margin: 0 auto;
                color: #FCF7F8;
              }
              .btnContainer {
                max-width: 600px;
                margin: 0 auto;
              }
              input {
                display: block;
                margin: 10px auto;
              }
              .loadMoreBtn {
                display: block;
                margin: 20px auto;
                padding: 10px 20px;
              }
              button {
                cursor: pointer;
              }
              .deleteBtn {
                background-color: transparent;
                outline: none;
                border: none;
              }
              .icon {
                z-index: -2;
                pointer-events: none;
              }
            `}</style>
          </div>
        </Layout>
    )
  }
}