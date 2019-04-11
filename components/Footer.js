const Footer = props => (
    <footer>
        <nav>
            <a href='https://github.com/cubanerick/super_heroes'>github</a>
        </nav>
        <style jsx>{`
            footer {
                margin: 0;
                height: 100px;
                background-color: #4E8098;
                color: #FCF7F8;
                padding: 20px;
            }
            nav {
                display: inline-block;
                height: 100px;
                line-height: 100px;
                float: right;
            }
            a {
                color: #FCF7F8; 
            }
        `}</style>
    </footer>
)

export default Footer