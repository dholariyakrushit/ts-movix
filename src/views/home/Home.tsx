import ScrollBar from "../../components/home/ScrollBar";
import Hero from "../../components/home/Hero";
import  './home.scss'
function Home() {
  return (
    <>
      <Hero />
      <ScrollBar
        movieTitle="Trending"
        radioValue_1="Day"
        radioValue_2="Week"
        radioKey="10"
      />
      <ScrollBar
        movieTitle="Popular"
        radioValue_1="Movie"
        radioValue_2="TV"
        radioKey="100"
      />
      <ScrollBar
        movieTitle="Top Rating"
        radioValue_1="Movie"
        radioValue_2="TV"
        radioKey="200 "
      />
    </>
  );
}

export default Home;
