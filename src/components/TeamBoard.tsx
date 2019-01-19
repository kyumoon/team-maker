import * as React from 'react';
import Team from './Team';
import {Member} from '../store/TeamStore'
import {inject, observer} from 'mobx-react'
// import TeamStore from '../store/TeamStore'

interface Props{
    teamCount:string,
    initAll:Function,
}

@inject('store')
@observer
class TeamBaord extends React.Component<Props,any>{
    //@ts-ignore
    store = this.props.store;
    constructor(props:Props){
        super(props);
    }

    render(){
        let memberList = this.store.memberList.map((item:Member,index:number)=>{
            return <div className="member" key={index}>{item.name}/{item.score}<button className="delete-btn" onClick={(e)=>{this.store.removeMember(index);}}>X</button></div>
        });

        let randomTeam = this.store.teamList.map((team:any,index:number)=>{
            return <Team key={index} team={team} index={index}/>
        });

        console.log('teamBoard rendered');
        return (
            <div className="vertical-buttons">
                {!this.store.isTeamMaken?memberList:randomTeam}
                <button onClick={ this.makeTeam } >
                    {!this.store.isTeamMaken?'팀생성':'변경'}
                </button>
                <button onClick={(e)=>{this.props.initAll();}}>
                    초기화
                </button>
            </div>
        );
    }

    makeTeam= (e:any)=>{
        this.store.makeTeam(this.props.teamCount);
    }

    // removeMemeber= (key:number)=>{
    //     this.store.removeMember(key);
    // }
}

export default TeamBaord;