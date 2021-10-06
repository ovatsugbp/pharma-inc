import api from "../../services/api";

export const ROWS = [];

async function fetchUser() {
    const response = await api.get("?page=3&results=50&seed=abc");
    response.data.results.forEach((user) => {
        const dob = user.dob.date.slice(0, 10).split("-");
        ROWS.push({
            picture: user.picture.medium,
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            gender: user.gender === "female" ? "Feminino" : "Masculino",
            birth: `${dob[2]}/${dob[1]}/${dob[0]}`,
            phone: user.phone,
            nat: user.nat,
            location: `${user.location.street.name}, ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`,
            id: user.login.uuid,
        });
    });
}
fetchUser();
