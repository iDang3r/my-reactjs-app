import './App.css';
import mockData from './assets/mock-data.json'
import Card from './components/Card/Card'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          {mockData.map(card => <Card
              title={card.title}
              text={card.text}
              currentLikes={card.currentLikes}
          />)}
      </header>
    </div>
  );
}

export default App;
