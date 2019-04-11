const prod = {
    getUserFoods: `https://super-hero-food.herokuapp.com/users/foods`
}

const dev = {
    getUserFoods: `http://localhost:3001/users/foods`
}

const sandbox = {
    getUserFoods: `https://8n58wyo05l.sse.codesanbox.io/users.foods`
}

const Theme = {
    links: [prod]
}

export default Theme