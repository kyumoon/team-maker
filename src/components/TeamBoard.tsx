import * as React from 'react';
import Team from './Team';

interface Member{
    name:string,
    score:string,
}
interface Props{
    memberList:Array<Member>,
    teamCount:string,
    initAll:Function
}

class TeamBaord extends React.Component<Props,any>{

    constructor(props:Props){
        super(props);
        this.state={
            isTeamMaken : false,
            randomTeam:[]
        }
    }

    render(){
        let memberList = this.props.memberList.map((item,index)=>{
            return <div key={index}>{item.name}/{item.score}</div>
        });

        let randomTeam = this.state.randomTeam.map((team:any,index:number)=>{
            return <Team key={index} team={team} index={index}/>
        });


        return (
            <div className="vertical-buttons">
                {!this.state.isTeamMaken?memberList:randomTeam}
                <button onClick={this.makeTeam}>
                    {!this.state.isTeamMaken?'팀생성':'변경'}
                </button>
                <button onClick={(e)=>{this.props.initAll();this.makeTeam(e);}}>
                    초기화
                </button>
            </div>
        );
    }

    private makeTeam = (e:any)=>{
        let randomTeam:Array<any> = [];
        let memberList = this.props.memberList;
        let teamCount = +this.props.teamCount;
        let selectedTeam:Array<number> = [];
        let team = 0;
        if(memberList.length <= teamCount){
            alert('팀생성을 위한 인원이 부족합니다.');
            return;
        }
        this.setState( Object.assign(this.state,{isTeamMaken:!this.state.isTeamMaken}) );
        for(let i=0; i<memberList.length; i++){
            let man = memberList[i];
            do{
                team = Math.floor(Math.random()*teamCount);
            }while(selectedTeam.indexOf(team)!==-1);
            randomTeam[team] = randomTeam[team] || [];
            randomTeam[team].push(man);
            selectedTeam.push(team);
            if(selectedTeam.length-teamCount===0){
                selectedTeam = [];
            }
        }
        this.setState(Object.assign(this.state,{randomTeam}));
    }
}

export default TeamBaord;