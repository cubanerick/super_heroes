const Header = props => (
    <header>
        <h1>Super Hero's Favorite Foods</h1>
        <button title='Edit' className='editBtn' onClick={props.displayEdit}><img className='icon' src='/static/icons8-compose-50.png'/></button>
        <style jsx>{`
            header {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100px;
                background-color: #4E8098;
                color: #FCF7F8;
            }
            h1 {
                display: inline-block;
                float: left;
                font-size: 24px;
                line-height: 100px;
                margin: 0;
            }
            .editBtn {
                background-color: transparent;
                outline: none;
                border: none;
                float: right;
                height: 100px;
                cursor: pointer;
            }
            .icon {
                padding: 20px;
                margin: auto;
                pointer-events: none;
            }
            @media only screen and (max-width: 767px) {
                h1 {
                    font-size: 16px;
                }
            }
        `}</style>
    </header>
)

export default Header