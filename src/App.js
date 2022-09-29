import './App.css';
import MockData from './assets/mock-data.json'
import Card from './components/Card/Card'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          {MockData.map(card => <Card title={card.title}
                                      text={card.text}
                                      currentLikes={card.currentLikes}
                                />)}
      </header>
    </div>
  );
}

export default App;
