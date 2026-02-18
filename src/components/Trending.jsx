const Trending=()=> {
    const getTrendingMovies= async ()=> {
        const url="https://apis.ccbp.in/movies-app/trending-movies";
        const jwtToken = Cookies.get("jwt_token");
        const options={
            headers: { Authorization: `Bearer ${jwtToken}` }
    }
    const response= await fetch(url, options)
    const data=await response.json()
    console.log(data)
    
}
    
useEffect(()=>{
    getTrendingMovies()
},[])

return (
    <h1>uref</h1>
)
}

export default Trending