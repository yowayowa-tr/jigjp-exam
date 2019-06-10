import React, {Component} from 'react';
import art from './art.png';
import child from './child.png';
import festival from './festival.png'
import food from './food.png';
import history from './history.png';
import music from './music.png';
import nature from './nature.png';
import others from './others.png';
import seminar from './seminar.png';
import sport from './sport.png'

export default class GetImage extends Component{
  categories = [
    '歴史', 'その他', '文化・芸術', '講座・セミナー', 'こども', 'スポーツ', '自然・環境', '食・健康', '音楽', '観光・祭り'
  ];

  constructor(props){
    super(props);
  };

  render(){
    return(
      <div>
        {this.props.category === this.categories[0] &&
          <img className = "new_img" src = {history} />
        }
        {this.props.category === this.categories[1] &&
          <img className = "new_img" src = {others} />
        }
        {this.props.category === this.categories[2] &&
          <img className = "new_img" src = {art} />
        }
        {this.props.category === this.categories[3] &&
          <img className = "new_img" src = {seminar} />
        }
        {this.props.category === this.categories[4] &&
          <img className = "new_img" src = {child} />
        }
        {this.props.category === this.categories[5] &&
          <img className = "new_img" src = {sport} />
        }
        {this.props.category === this.categories[6] &&
          <img className = "new_img" src = {nature} />
        }
        {this.props.category === this.categories[7] &&
          <img className = "new_img" src = {food} />
        }
        {this.props.category === this.categories[8] &&
          <img className = "new_img" src = {music} />
        }
        {this.props.category === this.categories[9] &&
          <img className = "new_img" src = {festival} />
        }
      </div>
    );
  }
}
