import React from 'react';
import style from './App.module.scss';
import articles from './data/articles.json'
import comments from './data/comments.json'
import {Card} from './components/Card/Card'
import {SortType} from './components/Common'

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sortType: SortType.default,
        }
    }

    render() {
        let div_articles = articles.map(card =>
            <Card
                title={card.title}
                text={card.text}
                currentLikes={card.currentLikes}
                commentsCount={card.commentsCount}
                comments={comments.filter((comment) => comment.articleId === card.articleId)}
                createDate={card.createDate}
            />)

        // Very elegant solution !!!
        switch (this.state.sortType) {
            case SortType.likesAsc:
                div_articles = React.Children.toArray(div_articles).sort((a, b) => a.props['currentLikes'] < b.props['currentLikes'])
                break
            case SortType.likesDesc:
                div_articles = React.Children.toArray(div_articles).sort((a, b) => a.props['currentLikes'] > b.props['currentLikes'])
                break
            case SortType.dateAsc:
                div_articles = React.Children.toArray(div_articles).sort((a, b) => a.props['createDate'] < b.props['createDate'])
                break
            case SortType.dateDesc:
                div_articles = React.Children.toArray(div_articles).sort((a, b) => a.props['createDate'] > b.props['createDate'])
                break
            default:
        }

        return (
            <div className={style.App}>
                <header className={style.AppHeader}>
                    <button
                        onClick={() => {
                            let newSortType
                            switch (this.state.sortType) {
                                case SortType.dateAsc:
                                case SortType.dateDesc:
                                case SortType.likesAsc:
                                    newSortType = SortType.likesDesc
                                    break
                                case SortType.likesDesc:
                                default:
                                    newSortType = SortType.likesAsc
                                    break
                            }
                            this.setState({
                                sortType: newSortType,
                            })
                        }}
                        className={style.button + " " + style.buttonUp}
                    >{"Sort by likes " + (this.state.sortType === SortType.likesAsc ? "⤴" :
                                          this.state.sortType === SortType.likesDesc ? "⤵" : "")}
                    </button>
                    <button
                        onClick={() => {
                            let newSortType
                            switch (this.state.sortType) {
                                case SortType.likesAsc:
                                case SortType.likesDesc:
                                case SortType.dateAsc:
                                    newSortType = SortType.dateDesc
                                    break
                                case SortType.dateDesc:
                                default:
                                    newSortType = SortType.dateAsc
                                    break
                            }
                            this.setState({
                                sortType: newSortType,
                            })
                        }}
                        className={style.button + " " + style.buttonDown}
                    >{"Sort by date " + (this.state.sortType === SortType.dateAsc ? "⤴" :
                                         this.state.sortType === SortType.dateDesc ? "⤵" : "")}
                    </button>

                    {div_articles}

                </header>
            </div>
        );
    }
}
