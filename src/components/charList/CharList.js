import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        charList: []
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
    }


    updateCharList = () => {
        this.marvelService
        .getAllCharacters()
        .then(this.onCharListLoaded)
        .catch(this.onError);
    }
    
    onCharListLoaded = (charList) => {
        const shuffled = [...charList].sort(() => Math.random() - 0.5);
        const randomNine = shuffled.slice(0, 9);

        this.setState({
            charList: randomNine
        })
    }
    render() {
        const {charList} = this.state;
        const items = charList.map((item, i) => {
            return (
                <li className="char__item" key={i}>
                    <img src={item.thumbnail} alt={item.name}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <div className="char__list">
                <ul className="char__grid">
              
                    {items}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
        )
    }
}

export default CharList;