const prod = {
    getUserFoods: `https://super-hero-food.herokuapp.com/users/foods`
}

const dev = {
    getUserFoods: `http://localhost:3001/users/foods`
}

const Theme = {
    links: [prod]
}

export default Theme