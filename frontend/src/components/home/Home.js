import Header from './Header'
import Main from './Main'
import './Home.css'

export default function Home() {

  function handleSubmit(event) {
    event.preventDefault();
  }
  
  return (
    <div className="home">
      <Header></Header>
      <Main></Main>
      <footer></footer>
    </div>
  );
}

