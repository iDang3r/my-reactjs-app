import {useState} from 'react';
import style from './App.module.scss';
import articles from './data/articles.json'
import comments from './data/comments.json'
import {Card} from './components/Card/Card'
import {Sort, SortType, getLikesSortHandler, getDateSortHandler,
        getDateSortSymbol, getLikeSortSymbol}
    from './components/Common'

export function App() {
    const [sortType, setSortType] = useState(SortType.default);

    Sort(articles, sortType)

    let divArticles = articles.map(card =>
        <Card
            key={card.title}
            title={card.title}
            text={card.text}
            currentLikes={card.currentLikes}
            comments={comments.filter((comment) => comment.articleId === card.articleId)}
            commentsCount={card.commentsCount}
            createDate={card.createDate}
        />)

    return (
        <div className={style.App}>
            <header className={style.AppHeader}>
                <button
                    onClick={getLikesSortHandler(sortType, setSortType)}
                    className={style.button + " " + style.buttonUp}
                >{"Sort by likes " + getLikeSortSymbol(sortType)}
                </button>
                <button
                    onClick={getDateSortHandler(sortType, setSortType)}
                    className={style.button + " " + style.buttonDown}
                >{"Sort by date " + getDateSortSymbol(sortType)}
                </button>

                {divArticles}

            </header>
        </div>
    );
}
