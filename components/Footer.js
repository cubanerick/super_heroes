const Footer = props => (
    <footer>
        <nav>
            <p>&copy; 2019 Super Hero Foods</p>
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
        `}</style>
    </footer>
)

export default Footer