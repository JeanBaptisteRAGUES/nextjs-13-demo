export default async function testFetchServer() {
    const res = await fetch("http://localhost:3000/api/hello");

    const data = await res.json();

    console.log(data);
}

/* export default getOpponentMove; */
