import './App.css';
import articles from './data/articles.json'
import comments from './data/comments.json'
import Card from './components/Card/Card'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          {articles.map(card => <Card
              title={card.title}
              text={card.text}
              currentLikes={card.currentLikes}
              commentsCountInit={card.commentsCount}
              commentsInit={comments.filter((comment) => comment.articleId === card.articleId)}
          />)}
      </header>
    </div>
  );
}

export default App;
