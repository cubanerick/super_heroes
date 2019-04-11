import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout  = props => (

    <div className='Layout'>
        <Header displayEdit={props.displayEdit}/>
            <div id='Main'>
                {props.children}
            </div>
        <Footer/>
        <style jsx >{`
        div#Main {
            width: 100%;
            margin: 0;
            margin-top: 100px;
        }
        `}</style>
        <style global jsx>{`
            body {
                margin: 0;
                padding: 0;
                background-color: #EFF1F3;
            }
        `}</style>

    </div>

)

export default Layout;