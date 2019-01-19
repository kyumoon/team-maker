import * as React from 'react';
import './App.css';
import {Provider} from "mobx-react";
import TeamBaord from './components/TeamBoard';
import teamStore from './store/TeamStore';

class App extends React.Component<any, any> {
  defaultLimit = 3;
  //@ts-ignore
  constructor(props) {
    //@ts-ignore
    super(props);
    this.state = {
      limit: this.defaultLimit,
      teamCount: '',
      name: '',
      score: '',
    }
  }

  public render() {
    return (
      <div className="App">
        <header>
          Team-Maker
        </header>
        <Provider store={teamStore}>
          <div>
          <div className="vertical-buttons">
            <input type="number"
                  id="teamCount"
                  next-focus="name"
                  max={9}
                  placeholder="팀수"
                  onChange={this.checkAndMoveNextFoucs}
                  onKeyDown={this.enterClick}
                  value={this.state.teamCount} />
            <input type="text" 
                  id="name" 
                  next-focus="score" 
                  maxLength={10} 
                  placeholder="이름" 
                  onChange={this.checkAndMoveNextFoucs2} 
                  onKeyDown={this.enterClick}
                  value={this.state.name} />
            <input type="number" 
                  max={300} 
                  id="score" 
                  placeholder="점수" 
                  next-focus="name" 
                  onChange={this.checkAndMoveNextFoucs}
                  onKeyDown={this.addMember}
                  value={this.state.score} />
            <button onClick={this.addMember}>추가</button>
          </div>
          <TeamBaord teamCount={this.state.teamCount} initAll={this.initAll} />
          </div>
        </Provider>
      </div>
    );
  }

  private initAll = (e:any)=>{
    this.setState({
      limit: this.defaultLimit,
      teamCount: '',
      name: '',
      score: '',
    });
    teamStore.initValue();
  }

  private enterClick = (e: any) => {
    if (e.key === 'Enter') {
      let target = e.target;
      let nextFocus = target.getAttribute('next-focus');
      let ele = document.getElementById(nextFocus);
      if (ele) {
        ele.focus();
      }
    }
  }

  private addMember = (e: any) => {
    if (e.key === 'Enter'|| e.type === 'click') {
      if(!this.state.teamCount){
        alert(`팀수를 입력하세요.`);
        return;
      }
      if(!this.state.name){
        alert(`이름을 입력하세요.`);
        return;
      }
      if(!this.state.score){
        alert(`점수를 입력하세요.`);
        return;
      }
      teamStore.addMember( { name: this.state.name, score: this.state.score} );
      this.setState(Object.assign(this.state,{name:'',score:''}));
      this.enterClick(e);
    }
  }

  private checkAndMoveNextFoucs = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target;
    let id = target.getAttribute("id") || '';
    let max = parseInt(target.getAttribute("max") || '');
    let maxLength: string | number | null = target.getAttribute("maxLength");
    maxLength = maxLength ? maxLength : (max + '').length;

    let value = target.value;
    if (value === '' || (max && +value <= max)) {
      let newState = Object.assign(this.state);
      newState[id] = value;
      this.setState(newState);
    }
  }

  private checkAndMoveNextFoucs2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target;
    let id = target.getAttribute("id") || '';
    let maxLength = parseInt(target.getAttribute("maxLength") || '');
    let value = target.value;
    if (maxLength && value.length <= maxLength) {
      let newState = Object.assign(this.state);
      newState[id] = value;
      this.setState(newState);
    }
  }
}



export default App;
